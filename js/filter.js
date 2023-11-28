import { flatMap } from "./util";

const OP_REGEX = /(?:(?:<=)|(?:<)|(?:\[\])|(?:>=)|(?:>)|(?:=))/;

const OP_ALIAS = {
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte",
    "[]": "in"
};

export const FILTER_KEYWORDS = {
    "@today": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return _buildKeywordQuery(field, operator, today, tomorrow);
    },
    "@yesterday": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return _buildKeywordQuery(field, operator, yesterday, today);
    },
    "@tomorrow": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const tomorrow = new Date(today.setDate(today.getDate() + 1));
        const afterTomorrow = new Date(today.setDate(today.getDate() + 1));
        return _buildKeywordQuery(field, operator, tomorrow, afterTomorrow);
    },
    "@this-week": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const week = new Date(today.setDate(today.getDate() - today.getDay()));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        return _buildKeywordQuery(field, operator, week, nextWeek);
    },
    "@next-week": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
        return _buildKeywordQuery(field, operator, nextWeek, nextNextWeek);
    },
    "@this-month": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const startOfMonth = new Date(today.setDate(1));
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        return _buildKeywordQuery(field, operator, startOfMonth, nextMonth);
    },
    "@next-month": (field, operator) => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        const month = today.getMonth();
        const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
        const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));
        return _buildKeywordQuery(field, operator, nextMonth, nextNextMonth);
    }
};

export const filterToParams = (
    options = {},
    nameAlias = {},
    nameFunc = {},
    filterFields = {},
    keywordFields = {},
    { imperfectFilterFields = null, keywords = FILTER_KEYWORDS } = {},
    removeFunc = {}
) => {
    let operator = "$or";
    const { sort, reverse, filter, start, limit } = options;
    const filterS = filter || "";

    const params = { number_records: limit, start_record: start };
    const direction = reverse ? "descending" : "ascending";
    const sortS = `${sort}:${direction}`;
    const filters = [];
    const isPerfect = filterS.match(OP_REGEX);
    if (isPerfect) {
        for (const part of filterS.split(" ")) {
            const result = part.match(OP_REGEX);
            if (!result) continue;
            let arithOp = result[0];
            let [key, value] = part.split(OP_REGEX, 2);
            key = key.replace(/-/g, "_");
            const field = nameAlias[key] || key;
            const fieldFunc = nameFunc[field];
            value = keywords[value] || !fieldFunc ? value : fieldFunc(value);
            arithOp = arithOp === "=" ? filterFields[field] : OP_ALIAS[arithOp];

            const remove = removeFunc[field] ? removeFunc[field](value) : false;
            if (remove || !field || !arithOp) continue;

            filters.push(
                ..._buildFilter(field, arithOp, value, keywordFields, { keywords: keywords })
            );
        }
        operator = "$and";
    } else {
        // defaults the imperfect filters fields as the complete set
        // of filter fields in case they are not provided
        imperfectFilterFields = imperfectFilterFields || filterFields;

        // changes the operator to '$and' if a keyword was provided,
        // since a keyword can be composed of two or more filters
        if (keywords[filterS]) operator = "$and";

        // adds the multiple filters that will apply the filter string
        // to the multiple default targeting fields, effectively trying
        // to mach any of them (fuzzy string searching)
        filters.push(
            ...flatMap(
                ([field, operator]) =>
                    _buildFilter(field, operator, filterS, keywordFields, { keywords: keywords }),
                Object.entries(imperfectFilterFields).filter(
                    ([field, _]) => !removeFunc[field] || !removeFunc[field](filterS)
                )
            )
        );
    }

    if (sort) {
        params.sort = sortS;
    }

    if (filterS && filters.length > 0) {
        params["filters[]"] = filters;
        params.filter_operator = operator;
    }

    return params;
};

/**
 * Builds the individual filter value (or set of filters) for the
 * provided values taking into account the provided arithmetic/logic
 * operator, the value and possible keyword values.
 *
 * This function supports the "expansion" of a keyword value into
 * multiple filter statements.
 *
 * @param {String} field The name of the field from which the filter
 * or set of filters is going to be built.
 * @param {String} arithOp The arithmetic operator (as a string) to be used
 * for a base comparison.
 * @param {String} value The target value of the comparison operation.
 * @param {Object} keywordFields An object that associated a certain field name
 * with the set of keywords that are "allowed".
 * @param {Object} options An object that contains a set of objects to
 * fine-tune this function's behavior.
 * @returns {Array} The sequence of filters (in canonical format) to be used
 * in the construction of a "normalized" query.
 */
const _buildFilter = (
    field,
    arithOp,
    value,
    keywordFields,
    { keywords = FILTER_KEYWORDS } = {}
) => {
    // verifies if the value is a keyword, if not
    // returns the filter query with the given value
    const keywordF = keywords[value];
    if (!keywordF) return [`${field}:${arithOp}:${value}`];

    // verifies if the field given allows the usage of the
    // current keyword, forbidding invalid usage of keyword
    // with fields that do not support it
    const keywordField = keywordFields[field];
    if (!keywordField || !keywordField.includes(value)) return [];

    // replaces the keyword in the value with its
    // respective translation
    return keywords[value](field, arithOp);
};

const _buildKeywordQuery = (field, operator, left, right) => {
    switch (operator) {
        case "gt":
        case "gte":
            return [`${field}:${operator}:${Math.floor(right.getTime() / 1000)}`];
        case "lt":
        case "lte":
            return [`${field}:${operator}:${Math.floor(left.getTime() / 1000)}`];
        default:
            return [
                `${field}:gte:${Math.floor(left.getTime() / 1000)}`,
                `${field}:lt:${Math.floor(right.getTime() / 1000)}`
            ];
    }
};

export default filterToParams;

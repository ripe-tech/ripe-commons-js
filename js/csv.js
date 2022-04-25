/**
 * Creates the contents of the CSV file with the data given
 * as an array of rows and the headers.
 *
 * @param {Array} data Array of rows with cell data.
 * @param {Array} headers List of headers for the CSV file.
 * @param {Object} options The options that are going to be
 * used to build the CSV text stricture.
 * @returns {String} The generated CSV string from the provided
 * structure of arrays.
 */
export const buildCsv = (
    data,
    headers = [],
    { delimiter = ",", eol = "\n", useHeaders = true } = {}
) => {
    data = useHeaders ? [headers, ...data] : data;
    return data.map(row => row.map(r => _toString(r, delimiter)).join(delimiter)).join(eol);
};

export const dumpsCsv = buildCsv;

export const arraysToCsv = (data, headers = [], options = {}) => {
    return buildCsv(data, headers, options);
};

export const arrayToCsv = (data, headers = [], options = {}) => {
    return arraysToCsv([data], headers, options);
};

export const objectsToCsv = (data, headers = [], options = {}) => {
    headers =
        Object.keys(headers).length === 0 && data.length > 0
            ? Object.keys(data[0]).sort()
            : headers;
    const dataArray = data.map(d => headers.map(h => d[h]));
    return buildCsv(dataArray, headers, options);
};

export const objectToCsv = (data, headers = [], options = {}) => {
    return objectsToCsv([data], headers, options);
};

/**
 * Parses a CSV file and returns a sequence of arrays
 * containing the multiple lines of data (table).
 *
 * @param {Blob|File} file The file object that is going
 * to be read and have its contents parsed as CSV.
 * @param {Object} options The options that are going to be
 * used in the parsing operation.
 * @returns {Array} An array containing the multiple parsed
 * CSV lines.
 */
export const parseCsvFile = (file, options = undefined) => {
    const parser = options.parser || _parseCsvComplex;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(parser(e.target.result, options));
        reader.onerror = e => reject(e);
        reader.readAsText(file);
    });
};

export const parseCsv = (dataS, options = {}) => {
    const parser = options.parser || _parseCsvComplex;
    return parser(dataS, options);
};

export const loadsCsv = parseCsv;

export const _parseCsvSimple = (
    dataS,
    { object = false, sanitize = true, delimiter = ",", eol = "\n" } = {}
) => {
    // in case the sanitize operation has been requested runs a pre-operation
    // to make sure no extra information exist at the end of the lines and
    // that only the valid lines are taken into account
    if (sanitize) {
        dataS = dataS
            .split(eol)
            .filter(row => Boolean(row))
            .map(row => row.trim())
            .join(eol);
    }

    const data = dataS.split(eol).map(row => row.split(delimiter));

    if (!object) return data;
    return _toObject(data);
};

export const _parseCsvComplex = (
    dataS,
    { object = false, sanitize = true, delimiter = ",", eol = "\n" } = {}
) => {
    // in case the sanitize operation has been required runs a pre-operation
    // to make sure no extra information exist at the end of the lines and
    // that only the valid lines are taken into account
    if (sanitize) {
        dataS = dataS
            .split(eol)
            .filter(row => Boolean(row))
            .map(row => row.trim())
            .join(eol);
    }

    // builds the custom pattern that is going to try to
    // match the delimiter and the escaped and non escaped
    // values to properly pars the CSV values
    const pattern = new RegExp(
        "(\\" +
            delimiter +
            "|\\r?\\n|\\r|^)" +
            '(?:"([^"]*(?:""[^"]*)*)"|' +
            '([^"\\' +
            delimiter +
            "\\r\\n]*))",
        "gi"
    );

    // creates the initial data structure already populated
    // with an initial value as we need to "look-back"
    const data = [[]];

    // creates an array to hold our individual pattern
    // matching groups
    let matches = null;

    // keeps looping over the regular expression matches
    // until we can no longer find a match
    while ((matches = pattern.exec(dataS))) {
        // retrieves the delimiter that was found, this will
        // affect the newline operation
        const matchedDelimiter = matches[1];

        // checks to see if the given delimiter has a length
        // (if it0s not the start of string) and if it matches
        // field delimiter, if id does not, then we know
        // that this delimiter is a row delimiter
        if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
            // since we have reached a new row of data,
            // adds an empty row to our data array
            data.push([]);
        }

        // allocates space for the value that has been matched
        let value;

        // now that we have our delimiter out of the way,
        // checks to see which kind of value we captured
        // (can be quoted or unquoted)
        if (matches[2]) {
            // as a quoted value has been found we need to
            // unescape the double quotes
            value = matches[2].replace(/""/g, '"');
        } else {
            // a simple (non quoted) value is found and as
            // such it should be considered the matched value
            // without any kind of manipulation
            value = matches[3];
        }

        // adds the newly (matched) value to the last item in
        // the data array sequence
        data[data.length - 1].push(value);
    }

    if (!object) return data;
    return _toObject(data);
};

/**
 * Converts a sequence of parsed data items into a sequence of
 * object like items structured according to the CSV.
 *
 * @param {Array} data The array of data items defined as sequences
 * of data items, the first element should be the header.
 * @returns {Array} An array of object items equivalent to the provided
 * data array structure provided as input.
 */
const _toObject = data => {
    const objects = [];
    const header = data[0];
    const items = data.slice(1);
    for (const item of items) {
        const object = {};
        objects.push(object);
        for (let index = 0; index < header.length; index++) {
            const key = header[index];
            const value = item[index];
            object[key] = value;
        }
    }
    return objects;
};

/**
 * Converts a cell value to a string using the appropriate
 * serialization method according to data type.
 *
 * @param {Array|Number|Object|String} value The cell value to
 * convert to string.
 * @param {String} delimiter The delimiter value that is in
 * use under the current CSV operation.
 * @param {Object} options The options that are going to be used
 * to control the way the string is going to be quoted.
 * @returns {String} The stringified cell value that makes use
 * of the standard serialization strategy for CSV.
 */
const _toString = (
    value,
    delimiter = ",",
    { serialize = true, escape = true, quoteDelimiter = false } = {}
) => {
    let valueS = serialize ? _serialize(value) : String(value);
    valueS = escape ? _escape(valueS, delimiter, quoteDelimiter) : valueS;
    return valueS;
};

const _serialize = value => {
    if (Array.isArray(value)) {
        return value.map(v => _serialize(v)).join(",");
    }
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    return String(value);
};

const _escape = (value, delimiter = ",", quoteDelimiter = false) => {
    const isSpecial = value.includes('"') || value.includes(delimiter);
    value = value.replace(/"/g, '""');
    if (quoteDelimiter) {
        value = value.replace(new RegExp(delimiter, "g"), `${delimiter}${delimiter}`);
    }
    return isSpecial ? `"${value}"` : value;
};

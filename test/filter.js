global.window = global;

const assert = require("assert");
const ripeCommons = require("..");

describe("Filter", function() {
    describe("#filterToParams()", function() {
        it("should be able to build a filter string to filter only for id equal to 2", () => {
            const options = {
                filter: "id=2",
                limit: 5,
                start: 0
            };
            const filterFields = {
                id: "eq"
            };
            const result = ripeCommons.filterToParams(options, {}, {}, filterFields);
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": ["id:eq:2"],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter only for name equal to 'John' and surname 'Doe' and sort by id in reverse", () => {
            const options = {
                filter: "name=John and surname=Doe",
                limit: 10,
                start: 0,
                sort: "id",
                reverse: true
            };
            const filterFields = {
                id: "eq",
                name: "eq",
                surname: "eq"
            };
            const result = ripeCommons.filterToParams(options, {}, {}, filterFields);
            assert.deepStrictEqual(result, {
                number_records: 10,
                start_record: 0,
                sort: "id:descending",
                "filters[]": ["name:eq:John", "surname:eq:Doe"],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by keyword @today", () => {
            const options = {
                filter: "@today",
                limit: 5,
                start: 0
            };
            const nameAlias = {
                date: "created"
            };
            const nameFunc = {
                created: value => new Date(value) / 1000
            };
            const filterFields = {
                created: "eq"
            };
            const keywordFields = {
                created: ["@today", "@yesterday"]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${today.getTime() / 1000}`,
                    `created:lt:${tomorrow.getTime() / 1000}`
                ],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by custom keyword @something", () => {
            const options = {
                filter: "@something",
                limit: 5,
                start: 0
            };
            const nameAlias = {
                date: "created"
            };
            const nameFunc = {
                created: value => new Date(value) / 1000
            };
            const filterFields = {
                created: "eq"
            };
            const keywordFields = {
                created: ["@something", "@yesterday"]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields,
                {
                    keywords: {
                        "@something": (field, operator) => "someField:someOperator:someValue"
                    }
                }
            );
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": ["someField:someOperator:someValue"],
                filter_operator: "$and"
            });
        });
    });
});

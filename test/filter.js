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

        it("should be able to build a filter string to filter by keyword @yesterday", () => {
            const options = {
                filter: "@yesterday",
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
                created: [
                    "@today",
                    "@yesterday",
                    "@tomorrow",
                    "@this-week",
                    "@next-week",
                    "@this-month",
                    "@next-month"
                ]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${yesterday.getTime() / 1000}`,
                    `created:lt:${today.getTime() / 1000}`
                ],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by keyword @tomorrow", () => {
            const options = {
                filter: "@tomorrow",
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
                created: [
                    "@today",
                    "@yesterday",
                    "@tomorrow",
                    "@this-week",
                    "@next-week",
                    "@this-month",
                    "@next-month"
                ]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const tomorrow = new Date(today.setDate(today.getDate() + 1));
            const afterTomorrow = new Date(today.setDate(today.getDate() + 1));
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${tomorrow.getTime() / 1000}`,
                    `created:lt:${afterTomorrow.getTime() / 1000}`
                ],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by keyword @this-week", () => {
            const options = {
                filter: "@this-week",
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
                created: [
                    "@today",
                    "@yesterday",
                    "@tomorrow",
                    "@this-week",
                    "@next-week",
                    "@this-month",
                    "@next-month"
                ]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const week = new Date(today.setDate(today.getDate() - today.getDay()));
            const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${week.getTime() / 1000}`,
                    `created:lt:${nextWeek.getTime() / 1000}`
                ],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by keyword @next-week", () => {
            const options = {
                filter: "@next-week",
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
                created: [
                    "@today",
                    "@yesterday",
                    "@tomorrow",
                    "@this-week",
                    "@next-week",
                    "@this-month",
                    "@next-month"
                ]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const nextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
            const nextNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${nextWeek.getTime() / 1000}`,
                    `created:lt:${nextNextWeek.getTime() / 1000}`
                ],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by keyword @this-month", () => {
            const options = {
                filter: "@this-month",
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
                created: [
                    "@today",
                    "@yesterday",
                    "@tomorrow",
                    "@this-week",
                    "@next-week",
                    "@this-month",
                    "@next-month"
                ]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const month = today.getMonth();
            const startOfMonth = new Date(today.setDate(1));
            const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${startOfMonth.getTime() / 1000}`,
                    `created:lt:${nextMonth.getTime() / 1000}`
                ],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by keyword @next-month", () => {
            const options = {
                filter: "@next-month",
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
                created: [
                    "@today",
                    "@yesterday",
                    "@tomorrow",
                    "@this-week",
                    "@next-week",
                    "@this-month",
                    "@next-month"
                ]
            };
            const result = ripeCommons.filterToParams(
                options,
                nameAlias,
                nameFunc,
                filterFields,
                keywordFields
            );

            const today = new Date(new Date().setHours(0, 0, 0, 0));
            const month = today.getMonth();
            const nextMonth = new Date(new Date(today.setMonth(month + 1)).setDate(1));
            const nextNextMonth = new Date(new Date(today.setMonth(month + 2)).setDate(1));
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": [
                    `created:gte:${nextMonth.getTime() / 1000}`,
                    `created:lt:${nextNextMonth.getTime() / 1000}`
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

        it("should be able to build a filter string to filter by greater than keyword @today", () => {
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
                created: "gt"
            };
            const keywordFields = {
                created: ["@today"]
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
                "filters[]": [`created:gt:${tomorrow.getTime() / 1000}`],
                filter_operator: "$and"
            });
        });

        it("should be able to build a filter string to filter by lesser than keyword @today", () => {
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
                created: "lt"
            };
            const keywordFields = {
                created: ["@today"]
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
                "filters[]": [`created:lt:${today.getTime() / 1000}`],
                filter_operator: "$and"
            });
        });

        it("should not be able to build a filter array if the no valid operator was given", () => {
            const options = {
                filter: "id=2",
                limit: 5,
                start: 0
            };
            const result = ripeCommons.filterToParams(options, {}, {}, {});
            console.log(result);
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0
            });
        });

        it("should build a valid filter using the operator alias and the name function given", () => {
            const options = {
                filter: "id>=2",
                limit: 5,
                start: 0
            };
            const nameFunc = {
                id: value => value
            };
            const result = ripeCommons.filterToParams(options, {}, nameFunc, {});
            console.log(result);
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0,
                "filters[]": ["id:gte:2"],
                filter_operator: "$and"
            });
        });

        it("should build an empty filter when no parameters are givven", () => {
            const result = ripeCommons.filterToParams();
            assert.deepStrictEqual(result, {
                number_records: undefined,
                start_record: undefined
            });
        });

        it("should not be able to build a filter array for a keyword that the field does not support", () => {
            const options = {
                filter: "created=@today",
                limit: 5,
                start: 0
            };
            const nameFunc = {
                created: value => new Date(value) / 1000
            };
            const filterFields = {
                created: "eq"
            };
            const keywordFields = {
                created: []
            };
            const result = ripeCommons.filterToParams(
                options,
                {},
                nameFunc,
                filterFields,
                keywordFields
            );
            assert.deepStrictEqual(result, {
                number_records: 5,
                start_record: 0
            });
        });
    });
});

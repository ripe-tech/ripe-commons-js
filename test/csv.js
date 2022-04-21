const assert = require("assert");
const ripeCommons = require("..");

describe("CSV", () => {
    describe("#objectListToCsv", () => {
        it("should handle objects list with headers", () => {
            const headers = ["name", "title"];
            const input = [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ];
            const result = ripeCommons.objectListToCsv(input, headers);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
        });

        it("should handle objects list without headers", () => {
            const input = [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ];
            const result = ripeCommons.objectListToCsv(input);
            assert.deepStrictEqual(result, "João Magalhães,mr\nGabriel Candal,mr");
        });

        it("should handle list objects with commas", () => {
            const input = [
                { name: "Magalhães, João", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ];
            const result = ripeCommons.objectListToCsv(input);
            assert.deepStrictEqual(result, '"Magalhães, João",mr\nGabriel Candal,mr');
        });
    });

    describe("#objectToCsv", () => {
        it("should handle objects with commas", () => {
            const input = { name: "João, Magalhães", title: "mr" };
            const result = ripeCommons.objectToCsv(input);
            assert.deepStrictEqual(result, '"João, Magalhães",mr');
        });

        it("should handle objects with headers", () => {
            const headers = ["name", "title"];
            const input = { name: "João Magalhães", title: "mr" };
            const result = ripeCommons.objectToCsv(input, headers);
            assert.deepStrictEqual(result, "João Magalhães,mr");
        });

        it("should handle objects with headers to filter", () => {
            const headers = ["name", "title"];
            const input = { name: "João Magalhães", title: "mr", role: "CTO" };
            const result = ripeCommons.objectToCsv(input, headers);
            assert.deepStrictEqual(result, "João Magalhães,mr");
        });

        it("should handle objects with null / undefined values", () => {
            const headers = ["age", "name", "title", "field"];
            const input = { age: undefined, name: "João Magalhães", title: undefined, field: "Software Dev" };
            const result = ripeCommons.objectToCsv(input, headers);
            assert.deepStrictEqual(result, ",João Magalhães,,Software Dev");
        });

        it("should handle objects with numbers", () => {
            const headers = ["name", "number"];
            const input = { name: "João Magalhães", number: 1 };
            const result = ripeCommons.objectToCsv(input, headers);
            assert.deepStrictEqual(result, "João Magalhães,1");
        });

        it("should handle custom delimiters", () => {
            const headers = ["name", "title"];
            const input = { name: "João Magalhães", title: "mr" };
            const result = ripeCommons.objectToCsv(input, headers, ";");
            assert.deepStrictEqual(result, "João Magalhães;mr");
        });
    });

    describe("#arrayListToCsv", () => {
        it("should handle string arrays", () => {
            const headers = ["name", "title"];
            const input = [
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.arrayListToCsv(input, headers);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
        });

        it("should handle nested array of strings", () => {
            const input = [["a", ["b", ["c", "d"]]]];
            const result = ripeCommons.arrayListToCsv(input);
            assert.deepStrictEqual(result, 'a,"b,c,d"');
        });

        it("should handle array of strings without headers", () => {
            const input = [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.arrayListToCsv(input);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr");
        });
    });

    describe("#arrayToCsv", () => {
        it("should handle string array with commas", () => {
            const input = ["Magalhães, João", "mr"];
            const result = ripeCommons.arrayToCsv(input);
            assert.deepStrictEqual(result, '"Magalhães, João",mr');
        });

        it("should handle string array with quotes", () => {
            const input = ["João", 'Candal, "Gabriel"'];
            const result = ripeCommons.arrayToCsv(input);
            assert.deepStrictEqual(result, 'João,"Candal, "Gabriel""');
        });

        it("should handle string arrays with numbers", () => {
            const input = [1, "Gabriel Candal"];
            const result = ripeCommons.arrayToCsv(input);
            assert.deepStrictEqual(result, "1,Gabriel Candal");
        });
    });

    describe("#parseCsv", () => {
        it("should allow simple CSV parsing", () => {
            const result = ripeCommons.parseCsv(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n"
            );
            assert.deepStrictEqual(result, [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ]);
        });

        it("should allow simple CSV object parsing", () => {
            const result = ripeCommons.parseCsv(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n",
                true
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should handle extra elements in line", () => {
            let result;

            result = ripeCommons.parseCsv(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                true
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);

            result = ripeCommons.parseCsv(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                true,
                false
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr " },
                { name: "Gabriel Candal", title: "mr   " },
                { name: "", title: undefined }
            ]);
        });
    });

    describe("#_parseCsvComplex", () => {
        it("should allow simple CSV parsing", () => {
            const result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n"
            );
            assert.deepStrictEqual(result, [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ]);
        });

        it("should allow simple CSV object parsing", () => {
            const result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n",
                true
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should allow complex CSV object parsing", () => {
            const result = ripeCommons._parseCsvComplex(
                'name,title\n"João,{Maga""lhães}",mr\nGabriel Candal,mr\n',
                true
            );
            assert.deepStrictEqual(result, [
                { name: 'João,{Maga"lhães}', title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should handle extra elements in line", () => {
            let result;

            result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                true
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);

            result = ripeCommons._parseCsvComplex(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                true,
                false
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr " },
                { name: "Gabriel Candal", title: "mr   " },
                { name: "", title: undefined }
            ]);
        });
    });
});

const assert = require("assert");
const ripeCommons = require("..");

describe("CSV", () => {
    describe("#buildCsv", () => {
        it("should handle basic string arrays", () => {
            const input = ["João Magalhães", "Gabriel Candal"];
            const result = ripeCommons.buildCsv(input);
            assert.deepStrictEqual(result, "João Magalhães,Gabriel Candal\n");
        });

        it("should handle basic objects", () => {
            const headers = ["name", "title"];
            const input = {
                name: "João Magalhães",
                title: "mr"
            };
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\n");
        });

        it("should handle basic string arrays with numbers", () => {
            const input = [1, "Gabriel Candal"];
            const result = ripeCommons.buildCsv(input, []);
            assert.deepStrictEqual(result, "1,Gabriel Candal\n");
        });

        it("should handle string arrays with numbers", () => {
            const headers = [1, 2];
            const input = [[1, 2]];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, "1,2\n1,2\n");
        });

        it("should handle objects with numbers", () => {
            const headers = ["name", "number"];
            const input = {
                name: "João Magalhães",
                number: 1
            };
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, "name,number\nJoão Magalhães,1\n");
        });

        it("should handle custom delimiters", () => {
            const headers = ["name", "title"];
            const input = {
                name: "João Magalhães",
                title: "mr"
            };
            const result = ripeCommons.buildCsv(input, headers, ";");
            assert.deepStrictEqual(result, "name;title\nJoão Magalhães;mr\n");
        });

        it("should handle normal objects with headers", () => {
            const headers = ["name", "title"];
            const input = [
                {
                    name: "João Magalhães",
                    title: "mr"
                },
                {
                    name: "Gabriel Candal",
                    title: "mr"
                }
            ];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n");
        });

        it("should handle objects with commas", () => {
            const headers = ["name", "title"];
            const input = [
                {
                    name: "Magalhães, João",
                    title: "mr"
                },
                {
                    name: "Gabriel Candal",
                    title: "mr"
                }
            ];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, 'name,title\n"Magalhães, João",mr\nGabriel Candal,mr\n');
        });

        it("should handle objects with null values", () => {
            const headers = ["name", "team", "title"];
            const input = [
                {
                    name: "João Magalhães",
                    team: "software",
                    title: "mr"
                },
                {
                    name: "Gabriel Candal",
                    team: null,
                    title: "mr"
                }
            ];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(
                result,
                "name,team,title\nJoão Magalhães,software,mr\nGabriel Candal,,mr\n"
            );
        });

        it("should handle normal array of strings with headers", () => {
            const headers = ["name", "title"];
            const input = [
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n");
        });

        it("should handle nested array of strings", () => {
            const input = [["a", ["b", ["c", "d"]]]];
            const result = ripeCommons.buildCsv(input);
            assert.deepStrictEqual(result, 'a,"b,c,d"\n');
        });

        it("should handle array of strings with commas", () => {
            const headers = ["name", "title"];
            const input = [
                ["Magalhães, João", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, 'name,title\n"Magalhães, João",mr\nGabriel Candal,mr\n');
        });

        it("should handle objects without headers", () => {
            const input = [
                {
                    name: "João Magalhães",
                    title: "mr"
                },
                {
                    name: "Gabriel Candal",
                    title: "mr"
                }
            ];
            const result = ripeCommons.buildCsv(input);
            assert.deepStrictEqual(result, "João Magalhães,mr\nGabriel Candal,mr\n");
        });

        it("should handle objects with lists", () => {
            const input = [
                {
                    name: "João Magalhães",
                    title: ["mr", "cto"]
                }
            ];
            const result = ripeCommons.buildCsv(input);
            assert.deepStrictEqual(result, 'João Magalhães,"mr,cto"\n');
        });

        it("should handle array of strings without headers", () => {
            const input = [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.buildCsv(input);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n");
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

    describe("#parseCsvComplex", () => {
        it("should allow simple CSV parsing", () => {
            const result = ripeCommons.parseCsvComplex(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n"
            );
            assert.deepStrictEqual(result, [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ]);
        });

        it("should allow simple CSV object parsing", () => {
            const result = ripeCommons.parseCsvComplex(
                "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n",
                true
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);
        });

        it("should allow complex CSV object parsing", () => {
            const result = ripeCommons.parseCsvComplex(
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

            result = ripeCommons.parseCsvComplex(
                "name,title\nJoão Magalhães,mr \nGabriel Candal,mr   \n",
                true
            );
            assert.deepStrictEqual(result, [
                { name: "João Magalhães", title: "mr" },
                { name: "Gabriel Candal", title: "mr" }
            ]);

            result = ripeCommons.parseCsvComplex(
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

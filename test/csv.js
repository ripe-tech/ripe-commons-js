global.window = global;

const assert = require("assert");
const ripeCommons = require("..");

describe("csvMixin", () => {
    describe("#buildCsv", () => {
        it("should handle string arrays", () => {
            const input = ["João Magalhães", "Gabriel Candal"];
            const result = ripeCommons.buildCsv(input, null, "\n");
            assert.deepStrictEqual(result, "João Magalhães\nGabriel Candal\n");
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

        it("should handle objects when building", () => {
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

        it("should handle array of strings when building", () => {
            const headers = ["name", "title"];
            const input = [
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.buildCsv(input, headers);
            assert.deepStrictEqual(result, "name,title\nJoão Magalhães,mr\nGabriel Candal,mr\n");
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

        it("should handle objects with empty headers", () => {
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
            const result = ripeCommons.buildCsv(input, []);
            assert.deepStrictEqual(result, "João Magalhães,mr\nGabriel Candal,mr\n");
        });

        it("should handle objects with null headers", () => {
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
            const result = ripeCommons.buildCsv(input, null);
            assert.deepStrictEqual(result, "João Magalhães,mr\nGabriel Candal,mr\n");
        });

        it("should handle array of strings without headers", () => {
            const input = [
                ["name", "title"],
                ["João Magalhães", "mr"],
                ["Gabriel Candal", "mr"]
            ];
            const result = ripeCommons.buildCsv(input, null);
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

        it("controls extra elements in line", () => {
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

        it("controls extra elements in line", () => {
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

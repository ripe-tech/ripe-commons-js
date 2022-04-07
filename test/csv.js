global.window = global;

const assert = require("assert");
const ripeCommons = require("..");

describe("csvMixin", () => {
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

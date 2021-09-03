global.window = global;

const assert = require("assert");
const ripeCommons = require("..");

describe("flatMap()", function() {
    it("should be able to create a 1 dimension array", () => {
        const result = ripeCommons.flatMap(i => i + 1, [1, 2, 3]);
        assert.deepStrictEqual(result, [2, 3, 4]);
    });

    it("should be able to create a 1 dimension array from a 2 dimension array", () => {
        const result = ripeCommons.flatMap(i => [i + 1], [1, 2, 3]);
        assert.deepStrictEqual(result, [2, 3, 4]);
    });

    it("should be able to create a 2 dimension array from a 3 dimension array", () => {
        const result = ripeCommons.flatMap(i => [[i + 1, i]], [1, 2, 3]);
        assert.deepStrictEqual(result, [
            [2, 1],
            [3, 2],
            [4, 3]
        ]);
    });
});

describe("parseSearchParams()", function() {
    it("should be able to parse simple search params", () => {
        let result;

        result = ripeCommons.parseSearchParams("hello=world&hello2=world2");
        assert.deepStrictEqual(result, { hello: "world", hello2: "world2" });

        result = ripeCommons.parseSearchParams("hello=world&hello2=world2&hello=world_repeat");
        assert.deepStrictEqual(result, { hello: ["world", "world_repeat"], hello2: "world2" });
    });

    it("should be able to parse unicode based characters", () => {
        const result = ripeCommons.parseSearchParams(
            "hello=%e4%bd%a0%e5%a5%bd%e4%b8%96%e7%95%8c&hello2=%e4%bd%a0%e5%a5%bd%e4%b8%96%e7%95%8c2"
        );
        assert.deepStrictEqual(result, { hello: "你好世界", hello2: "你好世界2" });
    });

    it("should be able to handle + based spaces", () => {
        const result = ripeCommons.parseSearchParams("hello=hello+world&hello2=hello%20world2");
        assert.deepStrictEqual(result, { hello: "hello world", hello2: "hello world2" });
    });
});

describe("nDigitsText()", function() {
    it("should be able to add filler characters to small numbers", () => {
        let result = ripeCommons.nDigitsText(9);
        assert.deepStrictEqual(result, "09");

        result = ripeCommons.nDigitsText(5, 3);
        assert.deepStrictEqual(result, "005");
    });

    it("should do nothing to big enough numbers", () => {
        let result = ripeCommons.nDigitsText(50);
        assert.deepStrictEqual(result, "50");

        result = ripeCommons.nDigitsText(5000, 4);
        assert.deepStrictEqual(result, "5000");
    });

    it("should cut huge numbers to the desired size", () => {
        let result = ripeCommons.nDigitsText(10000000);
        assert.deepStrictEqual(result, "10");

        result = ripeCommons.nDigitsText(10000000, 4);
        assert.deepStrictEqual(result, "1000");
    });

    it("should be able to use different filling characters", () => {
        let result = ripeCommons.nDigitsText(5, 4);
        assert.deepStrictEqual(result, "0005");

        result = ripeCommons.nDigitsText(5, 4, "X");
        assert.deepStrictEqual(result, "XXX5");
    });
});

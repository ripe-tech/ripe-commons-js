const assert = require("assert");
const ripeCommons = require("..");

describe("Util", function() {
    this.timeout(30000);

    describe("normalize()", function() {
        it("should normalize the string ' this_is_a_long_string ' into 'this is a long string'", () => {
            const result = ripeCommons.normalize(" this_is_a_long_string ");
            assert.deepStrictEqual(result, "this is a long string");
        });

        it("should normalize the string ' this_is_a_long_string ' into ' this is a long string ' without trimming", () => {
            const result = ripeCommons.normalize(" this_is_a_long_string ", { trim: false });
            assert.deepStrictEqual(result, " this is a long string ");
        });

        it("should normalize and capitalize the string 'platforme_mto' into 'Platforme Mto'", () => {
            const result = ripeCommons.normalize("platforme_mto", { capitalize: true });
            assert.deepStrictEqual(result, "Platforme Mto");
        });

        it("should normalize the last part of the string 'style.blue_leather' into 'blue leather'", () => {
            const result = ripeCommons.normalize("style.blue_leather", { lastPart: true });
            assert.deepStrictEqual(result, "blue leather");
        });
    });

    describe("buildSlug()", function() {
        it("should convert 'Hello World'  into 'hello-world'", () => {
            const result = ripeCommons.buildSlug("Hello World");
            assert.deepStrictEqual(result, "hello-world");
        });

        it("should convert ' PlatformE_MTO '  into 'hello-world'", () => {
            const result = ripeCommons.buildSlug(" PlatformE--MTO ");
            assert.deepStrictEqual(result, "platforme-mto");
        });
    });

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

        it("should be able to handle a boolean parameter", () => {
            const result = ripeCommons.parseSearchParams("hello");
            assert.deepStrictEqual(result, { hello: true });
        });

        it("should be able to handle a search parameter that is an array", () => {
            const result = ripeCommons.parseSearchParams("hello=world&hello=world2&hello=world3");
            assert.deepStrictEqual(result, { hello: ["world", "world2", "world3"] });
        });
    });

    describe("mimeType()", function() {
        it("should return the default mime type", async () => {
            const mime = await ripeCommons.mimeType("gif");
            assert.strictEqual(mime, "gif");
        });

        it("should return the HTML mime type", async () => {
            const mime = await ripeCommons.mimeType("html");
            assert.strictEqual(mime, "text/html");
        });

        it("should return the PDF mime type", async () => {
            const mime = await ripeCommons.mimeType("pdf");
            assert.strictEqual(mime, "application/pdf");
        });

        it("should return the PNG mime type", async () => {
            const mime = await ripeCommons.mimeType("png");
            assert.strictEqual(mime, "image/png");
        });
    });
});

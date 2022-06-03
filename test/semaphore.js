const assert = require("assert");
const ripeCommons = require("..");

describe("Semaphore", function() {
    describe("#execute()", function() {
        it("should be able to execute two tasks one at a time", async () => {
            const semaphore = ripeCommons.semaphore();

            const execution = [];
            const callback = async () => {
                await new Promise(resolve => setTimeout(resolve, 10));
                execution.push(Date.now());
            };

            await Promise.all([semaphore.execute(callback), semaphore.execute(callback)]);

            assert.strictEqual(execution.length, 2);
            assert.strictEqual(execution[0] < execution[1], true);
        });

        it("should be able to execute two tasks one at a time, even if they fail", async () => {
            const semaphore = ripeCommons.semaphore();

            const execution = [];
            const callback = async () => {
                await new Promise(resolve => setTimeout(resolve, 10));
                execution.push(Date.now());
                throw new Error();
            };

            try {
                await Promise.allSettled([
                    semaphore.execute(callback),
                    semaphore.execute(callback)
                ]);
            } finally {
                assert.strictEqual(execution.length, 2);
                assert.strictEqual(execution[0] < execution[1], true);
            }
        });
    });
});

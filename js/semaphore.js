/**
 * A Semaphore that allows only the execution of one process at a time.
 *
 * @see https://gist.github.com/weimingw/a32d070a760dbc92ebb716b51bd44ac2#file-semaphore-js
 */
export const semaphore = (maxRunningRequests = 1) => {
    let runningRequests = 0;
    const queuedRequests = [];

    return {
        /**
         * Executes the function given once the semaphore allows it, only
         * one function is allowed to be executed at once.
         *
         * @param {Function} fn The function to be executed when the semaphore
         * is released.
         * @returns {Promise} A promise that will resolve with the function result
         * or the error if the function fails.
         */
        execute: function(fn) {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve, reject) => {
                queuedRequests.push({
                    resolve,
                    reject,
                    fn
                });
                await this.next();
            });
        },

        /**
         * Executes the next request if the previous one as already finished.
         */
        next: async function() {
            if (queuedRequests.length === 0) return;
            if (runningRequests >= maxRunningRequests) return;

            const { resolve, reject, fn } = queuedRequests.shift();
            runningRequests++;

            try {
                const result = await fn();
                resolve(result);
            } catch (err) {
                reject(err);
            } finally {
                runningRequests--;
                await this.next();
            }
        }
    };
};

/**
 * Splits the provided array (or iterable that uses `slice`) into
 * array chunks of the provided size.
 *
 * @param {Array} array The array that is going to be split into
 * chunks of the provided size.
 * @param {Number} size The size of each chunk as an integer.
 * @returns {Array} An array containing arrays of the provided size
 * with the contents of each chunk.
 */
export const splitArray = (array, size = 1) => {
    const result = [];
    for (let index = 0; index < array.length; index += size) {
        const chunk = array.slice(index, index + size);
        result.push(chunk);
    }
    return result;
};

export default splitArray;

/**
 * Normalizes the provided string value replacing irregular
 * values with simple ones.
 *
 * @param {String} value The value to be normalized.
 * @param {Object} options Set of options to control the
 * normalization process.
 * @returns {String} The final normalized values.
 */
export const normalize = (value, { lastPart = false, capitalize = false } = {}) => {
    // if the normalization is set to only use the last component
    // of a dot-separated value, retrieves that part
    value = lastPart ? value.split(".").pop() : value;

    // splits the underscore-separated value in its components
    let values = value.split("_");

    // if the normalization is set to capitalize, converts
    // the first letter of each component to uppercase
    values = capitalize ? values.map(_value => _value[0].toUpperCase() + _value.slice(1)) : values;

    // joins the several components
    return values.join(" ");
};

/**
 * Creates a slug like representation of the provided value
 * converting for instance "hello World" to "hello-world".
 *
 * @param {String} value The value that is going to be "slugified".
 * @returns {String} The "slugified" version of the provided value.
 */
export const buildSlug = value => {
    return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
};

/**
 * The flatMap function implementation that returns a new array
 * formed by applying a given callback function to each element
 * of the array, and then flattening the result by one level.
 *
 * @param {Function} f The function that produces an element of
 * the new array.
 * @param {Array} xs The initial array.
 * @returns {Array} A new array with each element being the result
 * of the callback function and flattened to a depth of 1.
 */
export const flatMap = (f, xs) => xs.reduce((acc, x) => acc.concat(f(x)), []);

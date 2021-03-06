/**
 * The characters that are going to be used as the shift
 * ones in the encoding operation.
 */
const SHIFT_CHARS = ["Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê"];

/**
 * Encodes the given value following the Code 128 Set B
 * guidelines, so that the value can be shown using the
 * barcode 128 font.
 *
 * This function contains limitations when more than 3
 * consecutive numbers are present in the value.
 *
 * @param {String} value The string value to be encoded.
 * @returns {String} The Code 128 Set B value to be used with the
 * barcode 128 font family.
 * @see https://www.precisionid.com/code-128-faq/
 */
export const encodeBarcode128B = value => {
    // builds the checksum for the encoded barcode value
    // 128 Set B by summing the START code (104) and the
    // product of each data character with its position
    // within the data
    const length = value.length;
    let checksumValue = 104;

    for (let i = 0; i < length; i++) {
        const encodedChar = value.charCodeAt(i) - 32;
        checksumValue += (i + 1) * encodedChar;
    }

    // the checksum value is finally calculated by
    // doing the remainder of the total by 103
    // (Modulus 103 Checksum) and replacing shift
    // characters code with the respective characters
    const checksumInt = parseInt(checksumValue % 103, 10);
    const checksum =
        checksumInt > 94 ? SHIFT_CHARS[checksumInt - 95] : String.fromCharCode(checksumInt + 32);

    // builds the encoded barcode value by adding the
    // START and STOP code, the value and the checksum
    const startCodeB = "Ì";
    const stopCodeB = "Î";
    return `${startCodeB}${value}${checksum}${stopCodeB}`;
};

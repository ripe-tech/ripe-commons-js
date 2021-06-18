/**
 * Encodes the given value following the Code 128 Set B
 * guidelines, so that the value can be shown using the
 * barcode 128 font.
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
    // (Modulus 103 Checksum)
    const checksum = checksumValue % 103;

    // builds the encoded barcode value by adding the
    // START and STOP code, the value and the checksum
    const startCodeB = "Ì";
    const stopCodeB = "Î";
    return `${startCodeB}${value}${String.fromCharCode(checksum + 32)}${stopCodeB}`;
};

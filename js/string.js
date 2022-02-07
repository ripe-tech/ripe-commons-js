import { verify } from "yonius";

/**
 * Breaks the provided string value according to the provided
 * line length and maximum number of lines restrictions.
 *
 * The function will use multiple strategies to achieve the split
 * goal and we'll use best one that complies with the restrictions.
 *
 * @param {String} value The string value that is going to be split
 * into multiple lines to match the provided restrictions.
 * @param {Number} maxLength The maximum length (as number of characters)
 * allowed per line split.
 * @param {Number} maxLines The maximum allowed number of lines for
 * the split operation.
 * @returns {Array} The sequence of lines according to the
 * best possible splitting string strategy.
 */
export const breakString = (value, maxLength = 80, maxLines = 100) => {
    let lines = _breakStringByParagraph(value, maxLength, maxLines);
    const validLines = lines.length <= maxLines && lines.every(line => line.length <= maxLength);
    if (value.includes("\n") && validLines) return lines;

    lines = _breakStringByWord(value, maxLength, maxLines);
    if (lines.length <= maxLines) return lines;

    lines = _breakStringByChunk(value, maxLength, maxLines);
    return lines;
};

/**
 * Breaks the provided string value according to its own paragraphs
 * (`\n`) characters. This is considered the most simple split strategy.
 *
 * @param {String} value The string value to be split by paragraph.
 * @returns {Array} The sequence of component strings resulting from
 * the split of the string around the `\n` character.
 */
const _breakStringByParagraph = value => {
    return value.split("\n");
};

/**
 * Breaks the provided string of words according to the maximum number
 * of allowed characters, while trying to keep the words intact and
 * not broken down.
 *
 * @param {String} value The string value that is going to be splitted
 * using a work keeping strategy.
 * @param {Number} maxLength The maximum length (as number of characters)
 * allowed per line split.
 * @param {Boolean} trim If the lines should be right and left trimmed to
 * avoid extra unwanted space characters.
 * @returns {Array} The complete set of lines splitted using a per word
 * strategy.
 */
const _breakStringByWord = (value, maxLength = 80, trim = true) => {
    const lines = [];
    let line = "";

    // splits the provided value around the space character
    // allowing proper iteration over the sequence of words
    // to be able to allocate them over the multiple lines
    value.split(" ").forEach(word => {
        if ((line + word).length > maxLength) {
            if (trim) line = line.trimEnd();
            lines.push(line);
            line = "";
        }

        // adds the new work in iteration to the line,
        // may be either a new or existing line
        line += word;

        // makes sure that no extra spaces exist at the
        // start of the line and adds the word separator
        line = line.trimStart();
        line += " ";
    });

    // trims the last line an in case the line is valid
    // adds it to the complete set of lines
    if (trim) line = line.trimEnd();
    if (line.length > 0) lines.push(line);

    // returns the final sequence of lines with the complete
    // set of words properly splitted
    return lines;
};

/**
 * Breaks the provided string value by max size chunks
 * (may break words in half).
 *
 * @param {String} address The string value that is going
 * to be broken by chunks.
 * @param {Number} maxLength The maximum length (as number of characters)
 * allowed per line split.
 * @param {Number} maxLines The maximum allowed number of lines for
 * the split operation.
 * @returns {Array} The sequence of lines according to the
 * chunks splitting string strategy.
 */
const _breakStringByChunk = (address, maxLength = 80, maxLines = 100) => {
    const splits = Math.ceil(address.length / maxLength);
    verify(splits <= maxLines, "Value is too long");
    const lines = [];
    for (let index = 0; index < splits; index++) {
        const line = address.substr(index * maxLength, maxLength);
        lines.push(line);
    }
    return lines;
};

export default breakString;

import { verify } from "yonius";

export const breakString = (value, maxLength = 80, maxLines = 100) => {
    let lines = _breakStringByParagraph(value, maxLength, maxLines);
    const validLines = lines.length <= maxLines && lines.every(line => line.length <= maxLength);
    if (value.includes("\n") && validLines) return lines;

    lines = _breakStringByWord(value, maxLength, maxLines);
    if (lines.length <= maxLines) return lines;

    lines = _breakStringByChunk(value, maxLength, maxLines);
    return lines;
};

const _breakStringByParagraph = address => {
    return address.split("\n");
};

const _breakStringByWord = (value, maxLength = 80) => {
    const lines = [];
    let line = "";
    value.split(" ").forEach(word => {
        if ((line + word).length > maxLength) {
            line = line[line.length - 1] === " " ? line.slice(0, -1) : line;
            lines.push(line);
            line = word;
        } else {
            line += word;
        }

        line += " ";

        if (line.length > maxLength) {
            line = line.slice(0, -1);
            lines.push(line);
            line = "";
        }
    });
    line = line[line.length - 1] === " " ? line.slice(0, -1) : line;
    lines.push(line);
    return lines;
};

/**
 * Breaks the provided string value by max size chunks
 * (may break words in half).
 *
 * @param {String} address The string value that is going
 * to be broken by chunks.
 * @returns {Array} The sequence of lines according to the
 * chunks splitting string strategy.
 */
const _breakStringByChunk = (address, maxLength = 80, maxLines = 100) => {
    const splits = Math.ceil(address.length / maxLength);
    verify(splits <= maxLines, "Value is too long");
    const lines = [];
    for (let i = 0; i < splits; i++) {
        const line = address.substr(i * maxLength, maxLength);
        lines.push(line);
    }
    return lines;
};

export default breakString;

/**
 * Reads a CSV file and returns a table with the data.
 *
 * @param {Blob|File} file The file object to be read.
 * @param {Function} parser The function to be used in the
 * CSV parsing operation.
 */
export const readCsv = (file, parser = null) => {
    parser = parser || parseCsvComplex;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(parser(e.target.result));
        reader.onerror = e => reject(e);
        reader.readAsText(file);
    });
};

/**
 * Creates the contents of the CSV file with the data given
 * as an array of rows and the headers.
 *
 * @param {Array} data Array of rows with cell data.
 * @param {Array} headers List of headers for the CSV file.
 * @returns A string containing the information for the CSV.
 */
export const buildCsv = (data, headers = []) => {
    if (Object.keys(data).length === 0) return "";

    let csv = "";
    if (headers !== null && headers.length !== 0) csv += headers.toString() + "\n";
    const numFields = Object.keys(data[0]).length;
    for (let i = 0; i < Object.keys(data).length; i++) {
        let entry = "";

        // check if array, if it is add value as is
        if (Array.isArray(data[i])) {
            for (let j = 0; j < data[i].length; j++) {
                entry += _parseStringComma(data[i][j]) + ",";
            }
            // remove unnecessary final comma
            csv += entry.slice(0, -1) + "\n";
            continue;
        }

        for (let j = 0; j < numFields; j++) {
            if (data[i][headers[j]] !== null) {
                const value =
                    data[i][headers[j]] !== null ? data[i][headers[j]] : _toString(data[i]);
                entry += _parseStringComma(value) + ",";
            }
        }
        csv += entry.slice(0, -1) + "\n";
    }

    return csv;
};

export const parseCsv = (dataS, object = false, sanitize = true, delimiter = ",") => {
    // in case the sanitize operation has been required runs a pre-operation
    // to make sure no extra information exist at the end of the lines and
    // that only the valid lines are taken into account
    if (sanitize) {
        dataS = dataS
            .split("\n")
            .filter(row => Boolean(row))
            .map(row => row.trim())
            .join("\n");
    }

    const data = dataS.split("\n").map(row => row.split(delimiter));

    if (!object) return data;
    return _toObject(data);
};

export const parseCsvComplex = (dataS, object = false, sanitize = true, delimiter = ",") => {
    // in case the sanitize operation has been required runs a pre-operation
    // to make sure no extra information exist at the end of the lines and
    // that only the valid lines are taken into account
    if (sanitize) {
        dataS = dataS
            .split("\n")
            .filter(row => Boolean(row))
            .map(row => row.trim())
            .join("\n");
    }

    // builds the custom pattern that is going to try to
    // match the delimiter and the escaped and non escaped
    // values to properly pars the CSV values
    const pattern = new RegExp(
        "(\\" +
            delimiter +
            "|\\r?\\n|\\r|^)" +
            '(?:"([^"]*(?:""[^"]*)*)"|' +
            '([^"\\' +
            delimiter +
            "\\r\\n]*))",
        "gi"
    );

    // creates the initial data structure already populated
    // with an initial value as we need to "look-back"
    const data = [[]];

    // creates an array to hold our individual pattern
    // matching groups
    let matches = null;

    // keeps looping over the regular expression matches
    // until we can no longer find a match
    while ((matches = pattern.exec(dataS))) {
        // retrieves the delimiter that was found, this will
        // affect the newline operation
        const matchedDelimiter = matches[1];

        // checks to see if the given delimiter has a length
        // (if it0s not the start of string) and if it matches
        // field delimiter, if id does not, then we know
        // that this delimiter is a row delimiter
        if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
            // since we have reached a new row of data,
            // adds an empty row to our data array
            data.push([]);
        }

        // allocates space for the value that has been matched
        let value;

        // now that we have our delimiter out of the way,
        // checks to see which kind of value we captured
        // (can be quoted or unquoted)
        if (matches[2]) {
            // as a quoted value has been found we need to
            // unescape the double quotes
            value = matches[2].replace(/""/g, '"');
        } else {
            // a simple (non quoted) value is found and as
            // such it should be considered the matched value
            // without any kind of manipulation
            value = matches[3];
        }

        // adds the newly (matched) value to the last item in
        // the data array sequence
        data[data.length - 1].push(value);
    }

    return object ? _toObject(data) : data;
};

/**
 * Converts a sequence of parsed data items into a sequence of
 * object like items structured according to the CSV.
 *
 * @param {Array} data The array of data items defined as sequences
 * of data items, the first element should be the header.
 * @returns {Array} An array of object items equivalent to the provided
 * data array structure provided as input.
 */
export const _toObject = data => {
    const objects = [];
    const header = data[0];
    const items = data.slice(1);
    for (const item of items) {
        const object = {};
        for (let index = 0; index < header.length; index++) {
            const key = header[index];
            const value = item[index];
            object[key] = value;
        }
        objects.push(object);
    }
    return objects;
};

export const _parseStringComma = value => {
    if (String(value).includes(",")) {
        return '"' + String(value).replace(/["']/g, "") + '"';
    }
    return value;
};

/**
 * Converts a cell value to a string using the appropriate
 * conversion method.
 *
 * @param {Array|Number|Object|String} value The cell value to convert to string.
 * @returns {String} The stringified cell value
 */
export const _toString = value => {
    if (Array.isArray(value)) return `"${value.map(v => _toString(v)).join(",,")}"`;
    if (typeof value === "object") {
        return `"${JSON.stringify(value).replaceAll('"', '""')}"`;
    }
    return value ? value.toString() : "";
};

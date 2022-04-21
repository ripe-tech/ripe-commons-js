/**
 * Reads a CSV file and returns a table with the data.
 *
 * @param {Blob|File} file The file object to be read.
 * @param {Function} parser The function to be used in the
 * CSV parsing operation.
 */
export const parseCsvFile = (file, parser = null) => {
    parser = parser || _parseCsvComplex;
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(parser(e.target.result));
        reader.onerror = e => reject(e);
        reader.readAsText(file);
    });
};

/**
 * Converts an list of arrays into a CSV.
 *
 * @param {Object} data The array list to be converted.
 * @param {Array} headers THe headers for the list.
 * @param {String} delimiter The delimiter for the cell separation.
 * @returns A string of the converted array list.
 */
export const arrayListToCsv = (data, headers = [], delimiter = ",") => {
    const d = headers.length !== 0 ? [headers, ...data] : data;
    return d.map(row => arrayToCsv(row, delimiter)).join("\n");
};

/**
 * Converts an array into a CSV.
 *
 * @param {Object} data The array to be converted.
 * @param {String} delimiter The delimiter for cell separation.
 * @returns A string of the converted array.
 */
export const arrayToCsv = (data, delimiter = ",") => {
    return data.map(entry => _parseStringDelimiter(entry, delimiter)).join(delimiter);
};

/**
 * Converts an object list into a CSV line.
 *
 * @param {Object} data The source list of objects.
 * @param {Array} headers The fields of the objects to include. If
 * none are passed, the keys of the first object will be used.
 * @param {String} delimiter The delimiter for cell separation.
 * @returns {String} a string representing the Object List in CSV format.
 */
export const objectListToCsv = (data, headers = [], delimiter = ",") => {
    const fields = Object.keys(headers).length === 0 ? Object.keys(data[0]) : headers;
    if (fields.length === 0) return "";

    const headersString = Object.keys(headers).length === 0 ? "" : arrayToCsv(headers) + "\n";
    return headersString + data.map(object => objectToCsv(object, fields, delimiter)).join("\n");
};

/**
 * Converts an object into a CSV line.
 *
 * @param {Object} data The source object.
 * @param {Array} headers The fields of the objects to include. If
 * none are passed, the keys of the first object will be used.
 * @param {String} delimiter The delimiter for cell separation.
 * @returns {String} a string representing the Object as a CSV.
 */
export const objectToCsv = (data, headers = [], delimiter = ",") => {
    const fields = Object.keys(headers).length === 0 ? Object.keys(data) : headers;
    if (fields.length === 0) return "";

    return fields.map(x => _parseStringDelimiter(data[x], delimiter)).join(delimiter);
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

    return object ? _toObject(data) : data;
};

export const _parseCsvComplex = (dataS, object = false, sanitize = true, delimiter = ",") => {
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

/**
 * Parses a string to ensure it doesn't contain the delimiter.
 * @param {*} value The value to be parsed.
 * @param {*} delimiter The delimiter to be checked.
 * @returns the escaped value.
 */
export const _parseStringDelimiter = (value, delimiter = ",") => {
    if (value === undefined || value === null) return "";
    if (!String(value).includes(delimiter)) return value;
    return '"' + String(value).replace(/["']/g, '"') + '"';
};

export const csvMixin = {
    methods: {
        /**
         * Reads a CSV file and returns a table with the data.
         *
         * @param {Blob|File} file The file object to be read.
         * @param {Function} parser The function to be used in the
         * CSV parsing operation.
         */
        readCsv(file, parser = null) {
            parser = parser || this._parseCsvComplex;
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = e => resolve(parser(e.target.result));
                reader.onerror = e => reject(e);
                reader.readAsText(file);
            });
        },
        /**
         * Creates the contents of the CSV file with the data given
         * as an array of rows and the headers.
         *
         * @param {Array} data Array of rows with cell data.
         * @param {Array} headers List of headers for the CSV file.
         */
        buildCsv(data, headers = []) {
            return [headers, ...data]
                .map(row => row.map(r => this._toString(r)).join(","))
                .join("\n");
        },
        _parseCsv(dataS, object = false, sanitize = true, delimiter = ",") {
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
            return this._toObject(data);
        },
        _parseCsvComplex(dataS, object = false, sanitize = true, delimiter = ",") {
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

            if (!object) return data;
            return this._toObject(data);
        },
        /**
         * Converts a sequence of parsed data items into a sequence of
         * object like items structured according to the CVS.
         *
         * @param {Array} data The array of data items defined as sequences
         * of data items, the first element should be the header.
         * @returns {Array} An array of object items equivalent to the provided
         * data array structure provided as input.
         */
        _toObject(data) {
            const objects = [];
            const header = data[0];
            const items = data.slice(1);
            for (const item of items) {
                const object = {};
                objects.push(object);
                for (let index = 0; index < header.length; index++) {
                    const key = header[index];
                    const value = item[index];
                    object[key] = value;
                }
            }
            return objects;
        },
        /**
         * Converts a cell value to a string using the appropriate
         * conversion method.
         *
         * @param {Array|Number|Object|String} value The cell value to convert to string.
         * @returns {String} The stringified cell value
         */
        _toString(value) {
            if (Array.isArray(value)) return `"${value.map(v => this._toString(v)).join(",,")}"`;
            if (typeof value === "object") {
                return `"${JSON.stringify(value).replaceAll('"', '""')}"`;
            }
            return value ? value.toString() : "";
        }
    }
};

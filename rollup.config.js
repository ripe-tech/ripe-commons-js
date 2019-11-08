import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import globals from "rollup-plugin-node-globals";
import builtins from "rollup-plugin-node-builtins";
import pkg from "./package.json";

const fsbuiltin = function() {
    return {
        name: "fs",
        resolveId(importee) {
            if (importee === "fs") {
                return importee;
            }
            return null;
        },
        load(id) {
            if (id === "fs") {
                return "export const promises = {};";
            }
            return null;
        }
    };
};

const nodePath = process.env.NODE_PATH
    ? process.platform === "win32"
        ? process.env.NODE_PATH.split(/;/)
        : process.env.NODE_PATH.split(/:/)
    : null;
const banner =
    "/**\n" +
    ` * RIPE Commons (for Javascript) ${pkg.version}.\n` +
    " *\n" +
    ` * Copyright (c) 2014-${new Date().getFullYear()} Platforme International.\n` +
    " *\n" +
    " * This source code is licensed under the Apache 2.0 license found in the\n" +
    " * LICENSE file in the root directory of this source tree.\n" +
    " */";

export default [
    {
        input: "js/index.js",
        external: ["node-fetch"],
        output: {
            name: "ripeCommons",
            file: pkg.browser,
            banner: banner,
            format: "umd",
            exports: "named",
            sourcemap: true,
            globals: {
                "node-fetch": "fetch"
            }
        },
        plugins: [
            globals(),
            fsbuiltin(),
            builtins(),
            resolve({
                customResolveOptions: {
                    paths: nodePath
                }
            }),
            commonjs(),
            babel({
                babelrc: false,
                presets: ["@babel/preset-env"]
            })
        ]
    },
    {
        input: "js/index.js",
        external: ["node-fetch", "fs", "process", "path"],
        output: [
            {
                file: pkg.main,
                banner: banner,
                format: "cjs",
                exports: "named",
                sourcemap: true
            },
            {
                file: pkg.module,
                banner: banner,
                format: "es",
                sourcemap: true
            }
        ],
        plugins: [
            resolve({
                customResolveOptions: {
                    paths: nodePath
                }
            })
        ]
    }
];

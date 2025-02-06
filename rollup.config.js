import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import html from "rollup-plugin-html";
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/iran-license-plate.js", // Your main JS file
    output: {
        file: "dist/iran-license-plate.js", // Output bundled file
        format: "iife", // Immediately Invoked Function Expression (browser-compatible)
        name: "IranLicensePlate", // Global variable name
        sourcemap: true, // Enable source map
    },
    plugins: [
        postcss({
            inject: true, // Inject CSS into the JS bundle
            minimize: true, // Minify CSS
            modules: false, // Disable CSS modules
        }),
        resolve(),
        commonjs(),
        html({
            include: "**/*.html", // Process HTML files
        }),
        terser(), // Minify the output
        copy({
            targets: [
                { src: "src/css/iran-license-plate.css", dest: "dist" }, // Optional: Copy CSS
            ],
        }),
    ],
};

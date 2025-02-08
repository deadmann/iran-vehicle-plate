import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import html from "rollup-plugin-html";
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/iran-vehicle-plate.js", // Your main JS file
    output: {
        file: "dist/iran-vehicle-plate.js", // Output bundled file
        format: "iife", // Immediately Invoked Function Expression (browser-compatible)
        name: "IranVehiclePlate", // Global variable name
        sourcemap: true, // Enable source map
    },
    plugins: [
        postcss({
            inject: true, // Inject CSS into the JS bundle
            minimize: true, // Minify CSS
            modules: false, // Disable CSS modules,
        }),
        resolve(),
        commonjs(),
        html({
            include: "**/*.html", // Process HTML files
        }),
        terser(), // Minify the output
        copy({
            targets: [
                { src: "src/css/iran-vehicle-plate.css", dest: "dist" }, // Optional: Copy CSS
            ],
        }),
    ],
};

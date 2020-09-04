import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';

import packageJson from "./package.json";

export default [
  {
    input: packageJson.mainSource,
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.main.replace(".js", ".min.js"),
        format: "cjs",
        sourcemap: true, 
        plugins: [terser()],
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: packageJson.module.replace(".js", ".min.js"),
        format: "esm",
        sourcemap: true, 
        plugins: [terser()],
      },
      {
        file: packageJson.browser,
        name: packageJson.name,
        format: "umd",
        sourcemap: true,
      },
      {
        file: packageJson.browser.replace(".js", ".min.js"),
        name: packageJson.name,
        format: "umd",
        sourcemap: true, 
        plugins: [terser()],
      }
    ],
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      resolve(),
      commonjs()
    ]
  },
  // CommonJS
  {
    input: packageJson.pluginSource,
    output: [
      {
        file: packageJson.pluginMain,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.pluginModule,
        name: packageJson.name,
        format: "esm",
        sourcemap: true,
      }
    ],
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      replace({
        __package_name__: packageJson.name,
      }),
      external(),
      resolve(),
      commonjs()
    ]
  },
];
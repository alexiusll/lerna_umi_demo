/*
 * @Author: linkenzone
 * @Date: 2021-07-05 17:44:17
 * @Descripttion: Do not edit
 */

import typescript from "rollup-plugin-typescript2";
// import commonjs from "rollup-plugin-commonjs";
// import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

// const override = { compilerOptions: { declaration: false } };

export default [
  {
    input: "./src/index.tsx",
    output: {
      file: "dist/index.js",
      format: "esm",
      exports: "named",
      sourcemap: true,
      // 添加globals
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    // 添加externs
    // 告诉rollup不要将react打包，而作为外部依赖
    external: ["react", "react-dom"],
    plugins: [
      // postcss处理less文件，并用 autoprefixer 处理兼容,cssnano 压缩
      postcss({
        minimize: true,
        modules: true,
        use: {
          sass: null,
          stylus: null,
          less: { javascriptEnabled: true },
        },
        extract: true,
      }),
      ,
      typescript({
        tsconfig: "tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
    ],
  },
];

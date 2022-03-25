import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';
import pkg from "./package.json"

export default {
  input: 'src/index.ts', // 打包入口
  output: [
    { file: pkg.browser, format: 'cjs', name: "netsCjs" },
    { file: pkg.module, format: 'es', name: "netsEs" },
    { file: pkg.module, format: 'umd', name: "netsUmd" }
  ],
  plugins: [ // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true,       // 使plugin-transform-runtime生效
    }),
    terser(),
  ]
};
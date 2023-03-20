#!/usr/bin/env node

import path from "path";
import chalk from "chalk";
import { createExtractorFromFile } from "node-unrar-js";
import ora from "ora";

const spiner = ora("解压中");

async function extractRarArchive(file, destination) {
  try {
    // Create the extractor with the file information (returns a promise)
    const extractor = await createExtractorFromFile({
      filepath: file,
      targetPath: destination
    });
    // Extract the files
    [...extractor.extract().files];
    spiner.stop();
    console.log(chalk.green("解压成功"));
  } catch (err) {
    // May throw UnrarError, see docs
    console.error(err);
    console.log(chalk.red("解压失败"));
  }
}

const file = process.argv[2];

console.log(process.argv);
if (!file) {
  console.log(chalk.red('请输入文件地址'));
  process.exit();
}

spiner.start();
extractRarArchive(path.join(process.cwd(), file + '.rar'), path.join(process.cwd(), file));

// 每个 node 版本都是独立的，全局安装的 npm 包也互相独立。
// 你可以在安装别的版本的时候使用这个参数 `--reinstall-packages-from=current`，它会把当前 node 版本安装的全局 npm 包一并安装到新版本 node 环境里
// Eg.
// ```
// nvm install --lts --reinstall-packages-from=current
// ```
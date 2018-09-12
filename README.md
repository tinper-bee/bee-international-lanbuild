# bee-international-lanbuild

>tinper-bee 项目多语 构建多种语言 示例

## 项目国际化步骤

> 第一次使用，没有翻译过的excel文件

1. npm i lanbuild -save-dev
2. 新建 lanbuild.js 并根据说明配置 参考 本实例中的 lanbuild.js 
3. 执行 `node lanbuild.js 1`
4. 新建 `en.xlsx` 和 `tw.xlsx` 并将 `mangage_new_en.xlsx` 和 `mangage_new_tw.xlsx` 内容拷贝进去。
5. 执行 `node lanbuild.js 2` 即可生成多种语言源码


> 已有翻译过的excel文件，即已有 `en.xlsx` 和 `tw.xlsx` 文件。
1. 执行 `node lanbuild.js 1`
2. 执行 `node lanbuild.js 2` 并将 `mangage_new_en.xlsx` 和 `mangage_new_tw.xlsx` 文件中新增的字段添加到 `en.xlsx` 和 `tw.xlsx` 中并翻译
3. 执行 `node lanbuild.js 1` 
4. 执行 `node lanbuild.js 2` 即可生成多种语言源码


## 说明：

1. 第一次使用，需要先执行 `npm run dic` 生成 `mangage_new_en.xlsx` 和 `mangage_new_tw.xlsx`。这两个 excel 中保存了所有的中文。 将两个文件内容分别拷贝到 `en.xlsx` 和 `tw.xlsx` 中，并在 excel 中翻译。
2. 每次有新增的节点时，需要手动将 `mangage_new_en.xlsx` 和 `mangage_new_tw.xlsx` 合并到 `en.xlsx` 和 `tw.xlsx` 
3. 运行 `node lanbuild.js 1` 提取所有中文。 运行 `node lanbuild.js 2` 产出多种语言源码。 本示例已经将此命令配置到 `package.json` 文件中

## 注意

目前只支持，英文，中文繁体。后续支持多种语言以及简化配置，开发正在努力中。。。

## 开发调试

```sh
$ npm install
$ npm run dic //提取所有中文
$ npm run dic2 //打包生成多种语言文件
$ npm run dev  //简体中文
$ npm run dev_en  //英文
$ npm run dev_tw  //繁体中文
```
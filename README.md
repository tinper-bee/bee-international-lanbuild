# bee-international-lanbuild

>tinper-bee 项目多语 构建多种语言 示例


## 多语步骤说明：

1. 安装 `lanbuild` 包  [lanbuild](https://www.npmjs.com/package/lanbuild)
2. 配置 `lanbuild.js` 
3. 第一次使用，需要先执行 `npm run dic` 生成 `mangage_new_en.xlsx` 和 `mangage_new_tw.xlsx`。这两个 excel 中保存了所有的中文。 将两个文件内容分别拷贝到 `en.xlsx` 和 `tw.xlsx` 中，并在 excel 中翻译。
4. 每次有新增的节点时，需要手动将 `mangage_new_en.xlsx` 和 `mangage_new_tw.xlsx` 合并到 `en.xlsx` 和 `tw.xlsx` 
5. 运行 `node lanbuild.js 1` 提取所有中文。 运行 `node lanbuild.js 2` 产出多种语言源码。 本示例已经将此命令配置到 `package.json` 文件中

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
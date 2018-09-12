var lanbuild  = require("lanbuild");
var path = require('path')
//以下的文件不可以缺少
var type = process.argv[2]*1;

var basepath = path.join(__dirname,'./src');//根目录
var enDir = path.join(__dirname,'./en.xlsx'); //翻译人员翻译完成
var twDir = path.join(__dirname,'./tw.xlsx'); //翻译人员翻译完成

var i18n_addTags = path.join(__dirname,'./i18n_addTags');//生成的1
var i18n_ = path.join(__dirname,'./i18n');//生成2
var codePath = path.join(i18n_,'/');
var defaultDir = path.join(__dirname,'./default.xlsx'); //生成3
var enDirNew = path.join(__dirname,'./manager_new_en.xlsx'); //生成4
var twDirNew = path.join(__dirname,'./manager_new_tw.xlsx'); //生成5

var outPutObj = {
    en:{
        dir:enDir,
        dirNew:enDirNew,
    },
    tw:{
        dir:twDir,
        dirNew:twDirNew,
    }
}
//下面是三个工程特别的地方就在于addTags的区别

var managerAddTagsReg = /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[0-9]|[\?\,\。\.\、\/])*/g;
var appStoreAddTagsReg = /[\u4E00-\u9FA5]+([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[0-9]|[\?\,\。\.\、])*/g;
var osfeAddTagsReg =  /([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[0-9]|[\?\,\。\.\、\|\/])*/g; 

lanbuild({type,
    basepath,
    i18n_addTags,
    i18n_,
    defaultDir,
    outPutObj,
    codePath,
    addTagsReg:osfeAddTagsReg
});
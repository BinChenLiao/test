let path = require('path');
let golb = require('glob');
console.log(process.env.NODE_ENV)
// 配置多页面获取pages文件夹下面得html和js
function getEntry(globPath) {
  let entries = {};
  let count = 0;
  let basename, tmp, pathname, appname;
  golb.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    console.log(tmp);
    pathname = basename; // 正确输出js和html得路径
    entries[tmp[1]] = {
      entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.html',
      filename: tmp[1] + '.html',
      favicon: `src/pages/${tmp[1]}/1.ico`
    }
  })
  return entries;
}
let multiPages = getEntry('./src/pages/**?/*.html');
module.exports = multiPages
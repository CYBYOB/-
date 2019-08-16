// 一些排序需要要到的 “比较函数”

// 按 对象的某一属性（数字属性） 进行升降序排序
// ascDescFlag 为 1 是升序；-1为降序
function compareByNumber(prop, ascDescFlag) {
  console.log('用于比较的对象属性(升序):', prop)

  return function (obj1, obj2) {
    // 转成 float ， 兼容性好
    var val1 = parseFloat(obj1[prop]);
    var val2 = parseFloat(obj2[prop]);
    if (val1 < val2) {
      return -1 * ascDescFlag;
    } else if (val1 > val2) {
      return 1 * ascDescFlag;
    } else {
      return 0;
    }
  }
}

module.exports = {
  compareByNumber: compareByNumber,
}
const utils = require('./utils');

var extractVarAndLib = function (importStr) {
  var importStr = importStr.trim();

  // `import` splitting
  var arr = importStr.split("import");
  arr = utils.eliminateEmptyElement(arr);

  // `from` splitting
  arr = arr[0].split('from');
  var tempArr = [];
  arr.forEach(function (el) {
    tempArr.push(el.trim())
  });

  return {
    varSet: tempArr[0],
    lib: tempArr[1]
  }
}

var varSetStringToVarSetArr = function (varSetString) {
  var arr = varSetString.split("{").join().split("}").join();
  arr = arr.split(',');
  arr = utils.eliminateEmptyElement(arr);
  return {
    arr: arr,
    existsCurlyBrace: varSetString.includes('{')
  }
}

var purifyLibString = function (libString) {
  let arr = libString.split(`'`);
  return utils.eliminateEmptyElement(arr);
}

var generateRequireStatement = function (varNameArr, libName, curlyBraceStatus) {
  if (curlyBraceStatus === false) {
    return `const ${varNameArr[0]} = require('${libName}')`;
  }
  else {
    tempArr = [];
    for (el of varNameArr) {
      var currentReqStatement = `const ${el} = require('${libName}').${el}`
      tempArr.push(currentReqStatement);
    }
    return tempArr;
  }
}

var importToRequire = function (importStr) {
  var varAndLib = extractVarAndLib(importStr);
  var varSet = varSetStringToVarSetArr(varAndLib.varSet);
  var lib = purifyLibString(varAndLib.lib);

  return generateRequireStatement(varSet.arr, lib, varSet.existsCurlyBrace);
}

module.exports = {
  importToRequire: importToRequire
}

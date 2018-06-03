const espree = require('espree');

var eliminateEmptyElement = function (arr) {
  var tempArr = [];
  for (var el of arr) {
    if (el.trim() !== "") {
      tempArr.push(el.trim());
    }
  }
  return tempArr;
}

var removeComma = function (arr) {
  if (typeof (arr) === 'string') {
    arr = arr.split("");
  }
  var tempArr = [];
  arr.forEach(element => {
    if (element !== ',') {
      tempArr.push(element);
    }
  });
  return tempArr;
}


var isValidRequireStatement = function (statement) {
  resultarr = espree.tokenize(statement);
  if (resultarr[0].value !== 'const' && resultarr[0].value !== 'var') {
    console.log(resultarr[0].value);
    console.log(`ERROR: Require-statement must start with var or const keyword.`);
    return false;
  } else if (resultarr[1].type !== 'Identifier') {
    console.log(`ERROR: variable-name should be an Identifier.`);
    return false;
  } else if (resultarr[2].value !== '=') {
    console.log(`ERROR: The "=" sign seems to be misplaced.`);
    return false;
  } else if (resultarr[3].value !== 'require') {
    console.log(`ERROR: The "require" keyword was not correctly written.`);
    return false;
  } else if (resultarr[4].value !== '(') {
    console.log(`ERROR: The "require" keyword should be followed by "(" .`);
    return false;
  } else if (resultarr[5].type !== 'String') {
    console.log(`ERROR: The required Library-path is not correctly written. `);
    return false;
  } else if (resultarr[6].value !== ')') {
    console.log(`ERROR: Library-path ending should be followed by ")"`);
    return false;
  } else {
    return true;
  }
}

var removeInvCommaSingle = function (str) {
  return str.split(`'`).join("").trim();
}

var removeRoundBracket = function (str) {
  var openingRemoved = str.split(`(`).join("").trim();
  var endingRemoved = openingRemoved.split(`)`).join("").trim();
  return endingRemoved;
}


module.exports = {
  eliminateEmptyElement: eliminateEmptyElement,
  removeComma: removeComma,
  isValidRequireStatement: isValidRequireStatement,
  removeInvCommaSingle: removeInvCommaSingle,
  removeRoundBracket: removeRoundBracket

}

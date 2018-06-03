const utils = require('./utils');
const espree = require('espree');

var findVarNameAndLibPath_fromRequire = function (str) {
  if (!utils.isValidRequireStatement(str)) {
    console.log("invalid require statement");
    return undefined;
  }
  else {
    var tokens = espree.tokenize(str);
    var libpath = [];
    libpath[0] = utils.removeInvCommaSingle(tokens[5].value);

    if (tokens.length > 7 && tokens[7].value === '.') {
      var roundBracketInTail = false;
      for (let i = 8; i < tokens.length; i += 2) {
        if (tokens[i].value === ')' || tokens[i].value === '(') {
          var roundBracketInTail = true;
          break;
        }
        libpath.push(tokens[i].value);
      }
    }
  }
  return {
    varname: tokens[1].value,
    libpath: libpath,
    roundBracketInTail: roundBracketInTail
  }
}

var requireToImport = function (str) {
  var varAndLib = findVarNameAndLibPath_fromRequire(str);
  //var importStatement_withoutTail = `import ${varAndLib.varname} from '${varAndLib.libpath[0]}'`;

  if (varAndLib.roundBracketInTail) {
    return `import ${varAndLib.varname} from '${varAndLib.libpath.join(".")}()'`;
  }
  else {
    return `import ${varAndLib.varname} from '${varAndLib.libpath.join(".")}'`;
  }

}

module.exports = {
  requireToImport: requireToImport
}

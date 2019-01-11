var JavaScriptObfuscator = require('javascript-obfuscator');

var obfuscateCode=function(code) {
	var obfuscationResult = JavaScriptObfuscator.obfuscate(code,{compact: true,controlFlowFlattening: true});
    return obfuscationResult.getObfuscatedCode();	
}
module.exports.obfuscateCode=obfuscateCode;
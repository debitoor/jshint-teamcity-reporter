"use strict";

module.exports = {
	reporter: function (results) {
		var str = '';

		results.forEach(function (result) {
			var file = result.file;
			var error = result.error;
			str += '##teamcity[testStarted name=\'JSHint: ' + file + '\']\n';
			str += '##teamcity[testFailed name=\'JSHint: ' + file + '\' message=\'';
			str +=  escapeTeamcityString(
				file + ': line ' + error.line + ', col ' + error.character + ', ' + error.reason);
			str +=  '\']\n';
			str += '##teamcity[testFinished name=\'JSHint: ' + file + '\']\n';
		});
		process.stdout.write(str);
		if (!str.length) {
			process.stdout.write('##teamcity[testStarted name=\'JSHint\']\n');
			process.stdout.write('##teamcity[testFinished name=\'JSHint\']\n');
		}
	}
};

function escapeTeamcityString(message) {
	if (!message) {
		return '';
	}
	return message.replace(/\|/g, '||')
		.replace(/\'/g, '|\'')
		.replace(/\n/g, '|n')
		.replace(/\r/g, '|r')
		.replace(/\u0085/g, '|x')
		.replace(/\u2028/g, '|l')
		.replace(/\u2029/g, '|p')
		.replace(/\[/g, '|[')
		.replace(/\]/g, '|]');
}
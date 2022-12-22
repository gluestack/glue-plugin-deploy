"use strict";
exports.__esModule = true;
exports.formatBytes = void 0;
var formatBytes = function (bytes, decimals) {
    if (decimals === void 0) { decimals = 2; }
    if (!+bytes) {
        return '0 Bytes';
    }
    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), " ").concat(sizes[i]);
};
exports.formatBytes = formatBytes;
//# sourceMappingURL=format-bytes.js.map
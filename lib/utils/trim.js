'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = trim;
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
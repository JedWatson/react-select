'use strict';
const puncuation = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gi
const empty = '';
module.exports = function stripPunctuation(str) {
    return str.replace(puncuation, empty);
};
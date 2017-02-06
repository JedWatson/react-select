'use strict';
const puncuation = /[.,\/'#!%\^&\*;:{}=\-_`~()]/g;
const empty = '';
module.exports = function stripPunctuation(str) {
    return str.replace(puncuation, empty);
};
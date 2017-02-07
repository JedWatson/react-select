'use strict';
var punctuationList = /[.,\/'#!%\^?&\*;:{}=\-_`~()]/g;
var empty = '';
module.exports = function stripPunctuation(str, optionalBlackList) {
    var theBlackList = optionalBlackList === true ? punctuationList : optionalBlackList;
    return str.replace(theBlackList, empty);
};
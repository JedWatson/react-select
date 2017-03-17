'use strict';
const punctuationList = /[.,\/'#!%\^?&\*;:{}=\-_`~()]/g;
const empty = '';
module.exports = function stripPunctuation(str,optionalBlackList) {
    var theBlackList = optionalBlackList === true ? punctuationList : optionalBlackList;
    return str.replace(theBlackList, empty);
};
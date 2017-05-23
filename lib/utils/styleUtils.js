"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createStyle = function createStyle(propertyName) {
    return function () {
        for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
            objects[_key] = arguments[_key];
        }

        return objects.reduce(function (previous, current) {
            return _extends(previous, current[propertyName]);
        }, {});
    };
};
exports.createStyle = createStyle;
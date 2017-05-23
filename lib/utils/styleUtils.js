"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var createStyle = function createStyle(propertyName) {
    return function (state, props) {
        var stateStyle = state[propertyName];
        var propStyle = props[propertyName];

        return _extends({}, stateStyle, propStyle);
    };
};
exports.createStyle = createStyle;
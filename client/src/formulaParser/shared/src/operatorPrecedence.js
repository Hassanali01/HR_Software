"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixOperatorsAtTheBegining = exports.applyOperatorPrecedence = void 0;
var types_1 = require("./types");
// https://en.wikipedia.org/wiki/Operator-precedence_parser fortran approach
function applyOperatorPrecedence(tokens) {
    var newTokens = [];
    var operatorGroups = ['^', '*/', '+-', '<=>='].filter(function (entry) { return tokens.some(function (token) { return token.type === types_1.TokenType.Operator && entry.includes(token.value); }); });
    var commaExists = tokens.some(function (token) { return token.type === types_1.TokenType.Comma; });
    var maxBracketsCount = operatorGroups.length + (commaExists ? 1 : 0);
    var _loop_1 = function (i) {
        var token = tokens[i];
        if (token.type === types_1.TokenType.Operator) {
            var bracketCount = operatorGroups.findIndex(function (entry) { return entry.includes(token.value); });
            aroundWithBrackets(newTokens, token, bracketCount);
        }
        else if (token.type === types_1.TokenType.Comma) {
            aroundWithBrackets(newTokens, token, operatorGroups.length);
        }
        else if (token.type === types_1.TokenType.BracketStart || token.type === types_1.TokenType.BracketEnd) {
            addBrackets(newTokens, maxBracketsCount, token.type);
        }
        else {
            newTokens.push(token);
        }
    };
    for (var i = 0; i < tokens.length; i++) {
        _loop_1(i);
    }
    addBrackets(newTokens, maxBracketsCount, types_1.TokenType.BracketStart, true);
    addBrackets(newTokens, maxBracketsCount, types_1.TokenType.BracketEnd);
    return newTokens;
}
exports.applyOperatorPrecedence = applyOperatorPrecedence;
// Fix the formula like "-sin(1)" - add 0 at the begining
function fixOperatorsAtTheBegining(tokens) {
    var newTokens = [];
    var prevToken = null;
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (token.type === types_1.TokenType.Operator && '+-'.includes(token.value)) {
            if (!prevToken || [types_1.TokenType.BracketStart, types_1.TokenType.Comma, types_1.TokenType.Operator].includes(prevToken.type)) {
                newTokens.push({
                    type: types_1.TokenType.Number,
                    value: '0'
                });
            }
        }
        newTokens.push(token);
        if (token.type !== types_1.TokenType.Whitespace) {
            prevToken = token;
        }
    }
    return newTokens;
}
exports.fixOperatorsAtTheBegining = fixOperatorsAtTheBegining;
function addBrackets(tokens, count, type, toStart) {
    if (toStart === void 0) { toStart = false; }
    for (var i = 0; i < count; i++) {
        tokens[toStart ? 'unshift' : 'push']({ value: type === types_1.TokenType.BracketEnd ? ')' : '(', type: type });
    }
}
function aroundWithBrackets(tokens, token, count) {
    addBrackets(tokens, count, types_1.TokenType.BracketEnd);
    tokens.push(token);
    addBrackets(tokens, count, types_1.TokenType.BracketStart);
}

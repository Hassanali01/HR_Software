"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextToken = void 0;
var types_1 = require("./types");
function getNextToken(_a) {
    var match = _a.match, skip = _a.skip, prev = _a.prev;
    if (prev !== types_1.TokenType.QuoteStart && match(/^"/, true)) {
        if (prev === types_1.TokenType.String) {
            return types_1.TokenType.DoubleQuoteEnd;
        }
        else if (prev === types_1.TokenType.DoubleQuoteStart) {
            return types_1.TokenType.EmptyStringAndDoubleQuoteEnd;
        }
        else {
            return types_1.TokenType.DoubleQuoteStart;
        }
    }
    if (match(/^'/, true)) {
        if (prev === types_1.TokenType.String) {
            return types_1.TokenType.QuoteEnd;
        }
        else if (prev === types_1.TokenType.QuoteStart) {
            return types_1.TokenType.EmptyStringAndQuoteEnd;
        }
        else {
            return types_1.TokenType.QuoteStart;
        }
    }
    if (prev === types_1.TokenType.DoubleQuoteStart) {
        if (match(/^([^"\\]|\\.)+(?=")/, false)) {
            match(/^([^"\\]|\\.)+(?=")/, true);
            return types_1.TokenType.String;
        }
        else {
            match(/^([^"\\]|\\.)+/, true);
            return types_1.TokenType.String;
        }
    }
    if (prev === types_1.TokenType.QuoteStart) {
        if (match(/^([^'\\]|\\.)+(?=')/, false)) {
            match(/^([^'\\]|\\.)+(?=')/, true);
            return types_1.TokenType.String;
        }
        else {
            match(/^([^'\\]|\\.)+/, true);
            return types_1.TokenType.String;
        }
    }
    var numberRegex = /^\d*\.?\d+/;
    if (match(numberRegex, true)) {
        return types_1.TokenType.Number;
    }
    if (prev === types_1.TokenType.ReferenceBracketStart) {
        if (match(/^[^{}]+(?=\})/, false)) {
            match(/^[^{}]+(?=\})/, true);
            return types_1.TokenType.ReferenceName;
        }
        else if (match(/^[^{}]+/, false)) {
            match(/^[^{}]+/, true);
            return types_1.TokenType.ReferenceName;
        }
    }
    var rest = [
        [/^(<=|==|>=)/, types_1.TokenType.Operator],
        [/^[+\-*/^<=>&]/, types_1.TokenType.Operator],
        [/^[a-zA-Z][a-zA-Z0-9]*(?=\s*\()/, types_1.TokenType.FunctionName],
        [/^\(/, types_1.TokenType.BracketStart],
        [/^\)/, types_1.TokenType.BracketEnd],
        [/^{/, types_1.TokenType.ReferenceBracketStart],
        [/^}/, types_1.TokenType.ReferenceBracketEnd],
        [/^,/, types_1.TokenType.Comma],
        [/^\s+/, types_1.TokenType.Whitespace]
    ];
    for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
        var _b = rest_1[_i], pattern = _b[0], type = _b[1];
        if (match(pattern, true)) {
            return type;
        }
    }
    skip();
    return types_1.TokenType.Error;
}
exports.getNextToken = getNextToken;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokens = void 0;
var tokenizer_1 = require("./tokenizer");
var types_1 = require("./types");
function getTokens(formula) {
    return processTokenStream(formula);
}
exports.getTokens = getTokens;
function processTokenStream(formula) {
    var tokens = [];
    var position = 0;
    var skip = function (amount) {
        if (amount === void 0) { amount = 1; }
        position += amount;
    };
    var match = function (pattern, move, take) {
        if (take === void 0) { take = 0; }
        var match = formula.substring(position).match(pattern);
        if (match) {
            if (move) {
                position += (match[take] || '').length;
            }
            return match[take];
        }
    };
    var prev = null;
    while (position < formula.length) {
        var startingPosition = position;
        var tokenType = (0, tokenizer_1.getNextToken)({ match: match, skip: skip, prev: prev });
        if (startingPosition === position) {
            throw new Error('Tokenizer did not move forward');
        }
        if (tokenType === types_1.TokenType.EmptyStringAndDoubleQuoteEnd) {
            tokens.push({
                type: types_1.TokenType.String,
                value: ''
            });
            tokenType = types_1.TokenType.DoubleQuoteEnd;
        }
        else if (tokenType === types_1.TokenType.EmptyStringAndQuoteEnd) {
            tokens.push({
                type: types_1.TokenType.String,
                value: ''
            });
            tokenType = types_1.TokenType.QuoteEnd;
        }
        tokens.push({
            type: tokenType,
            value: formula.substring(startingPosition, position)
        });
        if (tokenType !== types_1.TokenType.Whitespace) {
            prev = tokenType;
        }
    }
    return tokens;
}

"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCircularValidationErrors = exports.getTokenDependenciesDeep = exports.getValidationErrors = void 0;
var supportedFunctions_1 = require("./supportedFunctions");
var types_1 = require("./types");
var operatorRequiredMap = (_a = {},
    _a[types_1.TokenType.Number] = types_1.ErrorType.OperatorRequiredBeforeNumber,
    _a[types_1.TokenType.FunctionName] = types_1.ErrorType.OperatorRequiredBeforeFunction,
    _a[types_1.TokenType.QuoteStart] = types_1.ErrorType.OperatorRequiredBeforeQuote,
    _a[types_1.TokenType.DoubleQuoteStart] = types_1.ErrorType.OperatorRequiredBeforeQuote,
    _a);
var startToEndMap = (_b = {},
    _b[types_1.TokenType.QuoteEnd] = types_1.TokenType.QuoteStart,
    _b[types_1.TokenType.DoubleQuoteEnd] = types_1.TokenType.DoubleQuoteStart,
    _b);
var valueAllowedAfter = [
    types_1.TokenType.Operator,
    types_1.TokenType.Comma,
    types_1.TokenType.BracketStart
];
var unclosedErrorMap = (_c = {},
    _c[types_1.TokenType.QuoteStart] = types_1.ErrorType.UnclosedQuote,
    _c[types_1.TokenType.DoubleQuoteStart] = types_1.ErrorType.UnclosedDoubleQuote,
    _c[types_1.TokenType.FunctionName] = types_1.ErrorType.UnclosedBracket,
    _c[types_1.TokenType.Group] = types_1.ErrorType.UnclosedBracket,
    _c[types_1.TokenType.ReferenceName] = types_1.ErrorType.UnclosedReferenceBracket,
    _c);
function getValidationErrors(tokens, supportedRefs) {
    var errors = [];
    var unclosedTokens = [];
    var supportedRefsLowerCase = supportedRefs === null || supportedRefs === void 0 ? void 0 : supportedRefs.map(function (ref) { return ref.toLowerCase(); });
    var functionLevel = 0;
    var prev = null;
    var prevIndex = 0;
    var _loop_1 = function (tokenIndex) {
        var addError = function (errorType) { return errors.push({ token: token, tokenIndex: tokenIndex, errorType: errorType }); };
        var token = tokens[tokenIndex];
        if (token.type === types_1.TokenType.Operator && !'+-'.includes(token.value)) {
            if (!prev || !types_1.operatorAllowedAfter.includes(prev.type)) {
                addError(types_1.ErrorType.UnexpectedOperator);
            }
        }
        if (operatorRequiredMap[token.type] && prev && !valueAllowedAfter.includes(prev.type)) {
            addError(operatorRequiredMap[token.type]);
        }
        if (token.type === types_1.TokenType.FunctionName && !(0, supportedFunctions_1.functionIsSupported)(token.value)) {
            addError(types_1.ErrorType.InvalidFunction);
        }
        if ([types_1.TokenType.QuoteStart, types_1.TokenType.DoubleQuoteStart].includes(token.type)) {
            unclosedTokens.push({ token: token, tokenIndex: tokenIndex, type: token.type });
        }
        if (startToEndMap[token.type]) {
            if (unclosedTokens.length && unclosedTokens[unclosedTokens.length - 1].token.type === startToEndMap[token.type]) {
                unclosedTokens.pop();
            }
        }
        if (token.type === types_1.TokenType.Comma) {
            if (functionLevel <= 0 || !prev || !types_1.operatorAllowedAfter.includes(prev.type)) {
                addError(types_1.ErrorType.UnexpectedComma);
            }
        }
        if (token.type === types_1.TokenType.Error) {
            addError(types_1.ErrorType.InvalidCharacter);
        }
        if (token.type === types_1.TokenType.BracketStart) {
            unclosedTokens.push({ token: token, tokenIndex: tokenIndex, type: (prev === null || prev === void 0 ? void 0 : prev.type) === types_1.TokenType.FunctionName ? types_1.TokenType.FunctionName : types_1.TokenType.Group });
            if ((prev === null || prev === void 0 ? void 0 : prev.type) === types_1.TokenType.FunctionName) {
                functionLevel++;
            }
            else if (prev && !valueAllowedAfter.includes(prev.type)) {
                addError(types_1.ErrorType.OperatorRequiredBeforeBracket);
            }
        }
        if (token.type === types_1.TokenType.BracketEnd) {
            if (unclosedTokens.length && unclosedTokens[unclosedTokens.length - 1].type === types_1.TokenType.FunctionName) {
                functionLevel--;
                unclosedTokens.pop();
                if (!prev || (!types_1.operatorAllowedAfter.includes(prev.type) && prev.type !== types_1.TokenType.BracketStart)) {
                    addError(types_1.ErrorType.UnexpectedBracket);
                }
            }
            else if (unclosedTokens.length && unclosedTokens[unclosedTokens.length - 1].type === types_1.TokenType.Group) {
                unclosedTokens.pop();
                if (!prev || (!types_1.operatorAllowedAfter.includes(prev.type) && prev.type !== types_1.TokenType.BracketStart)) {
                    addError(types_1.ErrorType.UnexpectedBracket);
                }
            }
            else {
                addError(types_1.ErrorType.UnexpectedBracket);
            }
        }
        if (token.type === types_1.TokenType.ReferenceBracketStart) {
            unclosedTokens.push({ token: token, tokenIndex: tokenIndex, type: types_1.TokenType.ReferenceName });
            if (prev && !valueAllowedAfter.includes(prev.type)) {
                addError(types_1.ErrorType.OperatorRequiredBeforeReference);
            }
        }
        if (token.type === types_1.TokenType.ReferenceName && token.value && supportedRefsLowerCase && !supportedRefsLowerCase.includes(token.value.toLowerCase())) {
            addError(types_1.ErrorType.UnsupportedReferenceName);
        }
        if (token.type === types_1.TokenType.ReferenceBracketEnd) {
            if (unclosedTokens.length && unclosedTokens[unclosedTokens.length - 1].type === types_1.TokenType.ReferenceName) {
                unclosedTokens.pop();
                if (!prev || prev.type !== types_1.TokenType.ReferenceName) {
                    addError(types_1.ErrorType.ReferenceNameRequiredInBrackets);
                }
            }
            else {
                addError(types_1.ErrorType.UnexpectedReferenceBracket);
            }
        }
        if (token.type !== types_1.TokenType.Whitespace) {
            prev = token;
            prevIndex = tokenIndex;
        }
    };
    for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
        _loop_1(tokenIndex);
    }
    if ((prev === null || prev === void 0 ? void 0 : prev.type) === types_1.TokenType.Operator) {
        errors.push({ token: prev, tokenIndex: prevIndex, errorType: types_1.ErrorType.ValueRequiredAfterOperator });
    }
    unclosedTokens.forEach(function (_a) {
        var token = _a.token, tokenIndex = _a.tokenIndex, type = _a.type;
        if (unclosedErrorMap[type]) {
            errors.push({ token: token, tokenIndex: tokenIndex, errorType: unclosedErrorMap[type] });
        }
    });
    return errors;
}
exports.getValidationErrors = getValidationErrors;
function getTokenDependenciesDeep(tokensByReferences) {
    var dependencyMap = {};
    var definedReferences = {};
    Object.entries(tokensByReferences).forEach(function (_a) {
        var referenceName = _a[0], tokens = _a[1];
        referenceName = referenceName.toLowerCase();
        definedReferences[referenceName] = true;
        tokens.forEach(function (token) {
            if (token.type === types_1.TokenType.ReferenceName) {
                if (!dependencyMap[referenceName]) {
                    dependencyMap[referenceName] = [];
                }
                dependencyMap[referenceName].push(token.value.toLowerCase());
            }
        });
    });
    var getAllReferences = function (referenceName) {
        var dependencies = {};
        var processedReferences = {};
        var run = function (referenceName) {
            if (dependencyMap[referenceName] && !processedReferences[referenceName]) {
                processedReferences[referenceName] = true;
                dependencyMap[referenceName].forEach(function (dependencyName) {
                    dependencies[dependencyName] = true;
                    run(dependencyName);
                });
            }
        };
        run(referenceName);
        return dependencies;
    };
    return Object.keys(tokensByReferences).reduce(function (out, referenceName) {
        referenceName = referenceName.toLowerCase();
        out[referenceName] = Object.keys(getAllReferences(referenceName))
            .filter(function (key) { return definedReferences[key]; })
            .sort(function (key1, key2) { return key1.localeCompare(key2); });
        return out;
    }, {});
}
exports.getTokenDependenciesDeep = getTokenDependenciesDeep;
function getCircularValidationErrors(referenceName, tokensByReferences) {
    var _a;
    var tokens = tokensByReferences[referenceName] || [];
    referenceName = referenceName.toLowerCase();
    var errors = [];
    var dependenciesByReferences = getTokenDependenciesDeep(tokensByReferences);
    for (var tokenIndex = 0; tokenIndex < tokens.length; tokenIndex++) {
        var token = tokens[tokenIndex];
        if (token.type === types_1.TokenType.ReferenceName) {
            var tokenReferenceName = token.value.toLowerCase();
            if (tokenReferenceName === referenceName) {
                errors.push({ token: token, tokenIndex: tokenIndex, errorType: types_1.ErrorType.CircularReferenceToItself });
            }
            else if ((_a = dependenciesByReferences[tokenReferenceName]) === null || _a === void 0 ? void 0 : _a.includes(referenceName)) {
                errors.push({ token: token, tokenIndex: tokenIndex, errorType: types_1.ErrorType.CircularReference });
            }
        }
    }
    return errors;
}
exports.getCircularValidationErrors = getCircularValidationErrors;

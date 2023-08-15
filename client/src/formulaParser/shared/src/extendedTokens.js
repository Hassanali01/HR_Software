"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtendedTokens = void 0;
var types_1 = require("./types");
var lexer_1 = require("./lexer");
var nodeGenerator_1 = require("./nodeGenerator");
var validator_1 = require("./validator");
function getExtendedTokens(formulasByReferences, supportedRefs) {
    var out = {};
    var tokensByRefs = {};
    Object.entries(formulasByReferences).forEach(function (_a) {
        var referenceNameOrig = _a[0], formula = _a[1];
        var referenceName = referenceNameOrig.toLowerCase();
        var tokens = (0, lexer_1.getTokens)(formula);
        var tokenNodes = (0, nodeGenerator_1.getTokenNodes)(formula);
        tokensByRefs[referenceName] = tokens;
        out[referenceName] = {
            referenceName: referenceName,
            referenceNameOrig: referenceNameOrig,
            formula: formula,
            tokens: tokens,
            tokenNodes: tokenNodes,
            validationErrors: [],
            dependencies: [],
            order: 0
        };
    });
    var allSupportedRefs = __spreadArray(__spreadArray([], (supportedRefs || []), true), Object.keys(tokensByRefs), true);
    var dependenciesByRefs = (0, validator_1.getTokenDependenciesDeep)(tokensByRefs);
    Object.values(out).forEach(function (entry) {
        var validationErrors = (0, validator_1.getValidationErrors)(entry.tokens, allSupportedRefs);
        var circularErrors = (0, validator_1.getCircularValidationErrors)(entry.referenceName, tokensByRefs);
        entry.validationErrors = __spreadArray(__spreadArray([], validationErrors, true), circularErrors, true);
        entry.dependencies = dependenciesByRefs[entry.referenceName] || [];
    });
    var resolved = {};
    var order = 1;
    var updated = true;
    while (updated) {
        updated = false;
        Object.values(out).forEach(function (entry) {
            if (!resolved[entry.referenceName] && !entry.dependencies.some(function (ref) { return !resolved[ref]; })) {
                entry.order = order;
                resolved[entry.referenceName] = true;
                updated = true;
            }
        });
        if (updated) {
            order++;
        }
    }
    var orderedOut = Object.keys(out).sort(function (key1, key2) { return out[key1].order - out[key2].order; });
    orderedOut.forEach(function (referenceName) {
        var entry = out[referenceName];
        entry.tokens.forEach(function (token, tokenIndex) {
            var _a;
            if (token.type === types_1.TokenType.ReferenceName) {
                var tokenValue = token.value.toLowerCase();
                if (tokenValue !== referenceName && !entry.validationErrors.length && ((_a = out[tokenValue]) === null || _a === void 0 ? void 0 : _a.validationErrors.length)) {
                    entry.validationErrors.push({ token: token, tokenIndex: tokenIndex, errorType: types_1.ErrorType.DependsOnInvalid });
                }
            }
        });
    });
    return out;
}
exports.getExtendedTokens = getExtendedTokens;

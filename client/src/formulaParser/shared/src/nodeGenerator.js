"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTokenNodeTree = exports.getTokenNodes = void 0;
var lexer_1 = require("./lexer");
var operatorPrecedence_1 = require("./operatorPrecedence");
var types_1 = require("./types");
function getTokenNodes(formula, skipOperatorPrecedence) {
    if (skipOperatorPrecedence === void 0) { skipOperatorPrecedence = false; }
    if (skipOperatorPrecedence) {
        return buildTokenNodeTree((0, operatorPrecedence_1.fixOperatorsAtTheBegining)((0, lexer_1.getTokens)(formula)));
    }
    else {
        return buildTokenNodeTree((0, operatorPrecedence_1.applyOperatorPrecedence)((0, operatorPrecedence_1.fixOperatorsAtTheBegining)((0, lexer_1.getTokens)(formula))));
    }
}
exports.getTokenNodes = getTokenNodes;
var meaningfulTypes = [types_1.TokenType.String, types_1.TokenType.Number, types_1.TokenType.ReferenceName, types_1.TokenType.Operator, types_1.TokenType.FunctionName, types_1.TokenType.BracketStart, types_1.TokenType.BracketEnd];
function buildTokenNodeTree(tokens, level) {
    var _a;
    if (level === void 0) { level = 0; }
    var nodes = [];
    var filteredTokens = level ? tokens : tokens.filter(function (token) { return meaningfulTypes.includes(token.type); });
    for (var i = 0; i < filteredTokens.length; i++) {
        var token = filteredTokens[i];
        if ([types_1.TokenType.String, types_1.TokenType.Number, types_1.TokenType.ReferenceName].includes(token.type)) {
            addNode(nodes, {
                type: token.type,
                value: token.value,
                innerNodes: []
            });
        }
        else if (token.type === types_1.TokenType.Operator) {
            var lastNode = nodes.pop();
            nodes.push({
                type: token.type,
                value: token.value,
                innerNodes: lastNode ? [lastNode] : []
            });
        }
        else if (token.type === types_1.TokenType.FunctionName) {
            var offset = ((_a = filteredTokens[i + 1]) === null || _a === void 0 ? void 0 : _a.type) === types_1.TokenType.BracketStart ? 1 : 0;
            var nextI = getCorrespondingBracketEndIndex(filteredTokens, i + 1);
            addNode(nodes, {
                type: token.type,
                value: token.value,
                innerNodes: buildTokenNodeTree(filteredTokens.slice(i + 1 + offset, nextI - offset), level + 1)
            });
            i = nextI - offset;
        }
        else if (token.type === types_1.TokenType.BracketStart) {
            var nextI = getCorrespondingBracketEndIndex(filteredTokens, i);
            addNode(nodes, {
                type: types_1.TokenType.Group,
                value: '',
                innerNodes: buildTokenNodeTree(filteredTokens.slice(i + 1, nextI), level + 1)
            });
            i = nextI - 1;
        }
    }
    return nodes;
}
exports.buildTokenNodeTree = buildTokenNodeTree;
function addNode(nodes, node) {
    var lastNode = nodes[nodes.length - 1];
    if ((lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) === types_1.TokenType.Operator && lastNode.innerNodes.length < 2) {
        lastNode.innerNodes.push(node);
    }
    else {
        nodes.push(node);
    }
}
function getCorrespondingBracketEndIndex(tokens, index) {
    var _a, _b;
    var level = 0;
    do {
        if (((_a = tokens[index]) === null || _a === void 0 ? void 0 : _a.type) === types_1.TokenType.BracketStart) {
            level++;
        }
        else if (((_b = tokens[index]) === null || _b === void 0 ? void 0 : _b.type) === types_1.TokenType.BracketEnd) {
            level--;
        }
        index++;
    } while (level > 0 && index < tokens.length);
    return index;
}

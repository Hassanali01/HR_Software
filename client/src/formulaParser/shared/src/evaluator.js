"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateTokenNodes = void 0;
var types_1 = require("./types");
var supportedFunctions_1 = require("./supportedFunctions");
function evaluateTokenNodes(tokenNodes, getPropertyValue) {
    var result = '';
    for (var _i = 0, tokenNodes_1 = tokenNodes; _i < tokenNodes_1.length; _i++) {
        var node = tokenNodes_1[_i];
        result += evaluateNode(node, getPropertyValue);
    }
    return result;
}
exports.evaluateTokenNodes = evaluateTokenNodes;
function evaluateNode(node, getPropertyValue) {
    if (node.type === types_1.TokenType.Operator) {
        var parameters = node.innerNodes.map(function (x) { return evaluateNode(x, getPropertyValue); });
        return (0, supportedFunctions_1.executeOperator)(node.value, parameters);
    }
    else if (node.type === types_1.TokenType.FunctionName) {
        var parameters = node.innerNodes.map(function (x) { return evaluateNode(x, getPropertyValue); });
        return (0, supportedFunctions_1.executeFunction)(node.value, parameters);
    }
    else if (node.type === types_1.TokenType.ReferenceName) {
        return getPropertyValue(node.value);
    }
    else if (node.type === types_1.TokenType.String) {
        return node.value;
    }
    else if (node.type === types_1.TokenType.Number) {
        return node.value;
    }
    else if (node.type === types_1.TokenType.Group) {
        return node.innerNodes.reduce(function (out, childNode) { return out + evaluateNode(childNode, getPropertyValue); }, '');
    }
    return '';
}

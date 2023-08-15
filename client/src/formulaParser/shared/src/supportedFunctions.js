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
exports.toNumberString = exports.functionIsSupported = exports.executeFunction = exports.executeOperator = void 0;
var supportedFunctions = {
    uppercase: function (params) {
        return params.map(function (param) { return param.toUpperCase(); }).join('');
    },
    lowercase: function (params) {
        return params.map(function (param) { return param.toLowerCase(); }).join('');
    },
    concatenate: function (params) {
        return params.join('');
    },
    round: function (params) {
        if (params.length > 0) {
            var out = (Number.EPSILON + Number(params[0] || '')).toFixed(Number(params[1]) || 0);
            if (paramAsBooleanIsSet(params[2])) {
                return out;
            }
            return stripLastZeroesAfterDot(out);
        }
        return (Number.NaN).toString();
    },
    ceil: function (params) {
        if (params.length > 0) {
            var mult = Math.pow(10, Number(params[1]) || 0);
            var out = (Math.ceil(Number(params[0]) * mult) / mult).toFixed(Number(params[1]) || 0);
            if (paramAsBooleanIsSet(params[2])) {
                return out;
            }
            return stripLastZeroesAfterDot(out);
        }
        return (Number.NaN).toString();
    },
    floor: function (params) {
        if (params.length > 0) {
            var mult = Math.pow(10, Number(params[1]) || 0);
            var out = (Math.floor(Number(params[0]) * mult) / mult).toFixed(Number(params[1]) || 0);
            if (paramAsBooleanIsSet(params[2])) {
                return out;
            }
            return stripLastZeroesAfterDot(out);
        }
        return (Number.NaN).toString();
    },
    add: function (params) {
        return params.reduce(function (out, param) {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return toNumberString(Number(out) + Number(param));
            }
            else {
                return (Number.NaN).toString();
            }
        }, '0');
    },
    multiply: function (params) {
        return params.reduce(function (out, param) {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return toNumberString(Number(out) * Number(param));
            }
            else {
                return (Number.NaN).toString();
            }
        }, '1');
    },
    subtract: function (params) {
        params = __spreadArray([], params, true);
        var first = params.shift();
        var rest = supportedFunctions.add(params);
        if (!isNaN(Number(first)) && !isNaN(Number(rest))) {
            return toNumberString(Number(first) - Number(rest));
        }
        return (Number.NaN).toString();
    },
    divide: function (params) {
        params = __spreadArray([], params, true);
        var first = params.shift();
        var rest = supportedFunctions.multiply(params);
        if (!isNaN(Number(first)) && !isNaN(Number(rest)) && Number(rest)) {
            return toNumberString(Number(first) / Number(rest));
        }
        return (Number.NaN).toString();
    },
    pow: function (params) {
        if (!isNaN(Number(params[0] || '0')) && !isNaN(Number(params[1] || '0'))) {
            return toNumberString(Math.pow(Number(params[0] || '0'), Number(params[1] || '0')));
        }
        return (Number.NaN).toString();
    },
    max: function (params) {
        if (!params.length) {
            return (Number.NaN).toString();
        }
        return params.reduce(function (out, param) {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return Math.max(Number(out), Number(param)).toString();
            }
            else {
                return (Number.NaN).toString();
            }
        }, params[0]);
    },
    min: function (params) {
        if (!params.length) {
            return (Number.NaN).toString();
        }
        return params.reduce(function (out, param) {
            if (!isNaN(Number(out)) && !isNaN(Number(param))) {
                return Math.min(Number(out), Number(param)).toString();
            }
            else {
                return (Number.NaN).toString();
            }
        }, params[0]);
    },
    lt: function (params) {
        return compare(params, '<');
    },
    lte: function (params) {
        return compare(params, '<=');
    },
    eq: function (params) {
        return compare(params, '=');
    },
    gte: function (params) {
        return compare(params, '>=');
    },
    gt: function (params) {
        return compare(params, '>');
    },
    if: function (params) {
        if (params.length < 2) {
            return '';
        }
        if (['', '0'].includes(params[0])) {
            return params[2] || '';
        }
        return params[1];
    }
};
var supportedOperators = {
    '&': supportedFunctions.concatenate,
    '+': supportedFunctions.add,
    '-': supportedFunctions.subtract,
    '/': supportedFunctions.divide,
    '*': supportedFunctions.multiply,
    '^': supportedFunctions.pow,
    '<': supportedFunctions.lt,
    '<=': supportedFunctions.lte,
    '=': supportedFunctions.eq,
    '>=': supportedFunctions.gte,
    '>': supportedFunctions.gt
};
function executeOperator(operator, parameters) {
    if (operator in supportedOperators) {
        return supportedOperators[operator](parameters);
    }
    return '';
}
exports.executeOperator = executeOperator;
function executeFunction(name, parameters) {
    name = name.toLowerCase();
    if (name in supportedFunctions) {
        return supportedFunctions[name](parameters);
    }
    return '';
}
exports.executeFunction = executeFunction;
function functionIsSupported(name) {
    name = name.toLowerCase();
    return (name in supportedFunctions);
}
exports.functionIsSupported = functionIsSupported;
function toNumberString(n) {
    return Number(n.toFixed(10)).toString();
}
exports.toNumberString = toNumberString;
function paramAsBooleanIsSet(param) {
    param = (param || '').toLowerCase();
    return param && param !== '0' && param !== 'false' && param !== 'no';
}
function stripLastZeroesAfterDot(param) {
    if (param.match(/\./)) {
        return param.replace(/0+$/, '').replace(/\.$/, '');
    }
    return param;
}
function compare(params, operator) {
    if (params.length < 2) {
        return '0';
    }
    var p0 = isNaN(Number(params[0])) ? params[0] : Number(params[0]);
    var p1 = isNaN(Number(params[1])) ? params[1] : Number(params[1]);
    if (operator.includes('=') && p0 === p1) {
        return '1';
    }
    if (operator.includes('<') && p0 < p1) {
        return '1';
    }
    if (operator.includes('>') && p0 > p1) {
        return '1';
    }
    return '0';
}

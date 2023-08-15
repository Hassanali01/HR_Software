"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFormulaFields = exports.generateItems = exports.supportedColumns = exports.supportedRefs = void 0;
exports.supportedRefs = ['id', 'title', 'estimation', 'budget'
    // , 'loggedTime'
];
exports.supportedColumns = [
    { key: 'title', title: 'Item Title', type: 'default' },
    { key: 'estimation', title: 'Estimation (hours)', type: 'default' },
    { key: 'budget', title: 'Budget ($)', type: 'default' },
    // { key: 'loggedTime', title: 'Time (seconds)', type: 'default' }
];
function generateItems(n) {
    if (n === void 0) { n = 1; }
    var out = [];
    for (var i = 0; i < n; i++) {
        out.push({
            id: crypto.randomUUID(),
            title: "Item #".concat(i + 1),
            estimation: Math.floor(Math.random() * 10) + 1,
            budget: (Math.floor(Math.random() * 10) + 1) * 100,
            // loggedTime: Math.floor(Math.random() * 20000)
        });
    }
    return out;
}
exports.generateItems = generateItems;
function generateFormulaFields() {
    return [
    // { id: crypto.randomUUID(), referenceName: 'rate', formula: '50' },
    // { id: crypto.randomUUID(), referenceName: 'tax', formula: '21' },
    // { id: crypto.randomUUID(), referenceName: 'timeHours', formula: 'floor({loggedTime} / 3600)' },        
    // { id: crypto.randomUUID(), referenceName: 'spent', formula: 'round(({rate} * {timeHours}) * (100 + {tax}) / 100, 2, 1)' },
    // { id: crypto.randomUUID(), referenceName: 'budgetLeft', formula: 'if ({budget} - {spent}<0, "overspent", ({budget} - {spent}) & "$ left")' },
    // { id: crypto.randomUUID(), referenceName: 'a', formula: '{b}' },
    // { id: crypto.randomUUID(), referenceName: 'b', formula: '{c}' },
    // { id: crypto.randomUUID(), referenceName: 'c', formula: '{a}' }
    ];
}
exports.generateFormulaFields = generateFormulaFields;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFormulaFields = exports.generateItems = exports.supportedColumns = exports.supportedRefs = void 0;
exports.supportedRefs = ['wd', 'cpl', 'gh', 'dayoff'
    // , 'loggedTime'
];
exports.supportedColumns = [
    { key: 'wd', title: 'W.D', type: 'default' },
    { key: 'cpl', title: 'C.P.L', type: 'default' },
    { key: 'lwp', title: 'L.W.P', type: 'default' },

    { key: 'gh', title: 'G.H', type: 'default' },
    { key: 'dayoff', title: 'D.O', type: 'default' }
];
function generateItems(wd, cpl, gh, lwp, dayoff) {
    // if (n === void 0) { n = 1; }
    var out = [];
    for (var i = 0; i < 1; i++) {
        out.push({
            id: crypto.randomUUID(),
            title: "Item #".concat(i + 1),
            // estimation: Math.floor(Math.random() * 10) + 1,
            // budget: (Math.floor(Math.random() * 10) + 1) * 100,
            // loggedTime: Math.floor(Math.random() * 20000)

            
      wd:wd,
      cpl:cpl,
      gh:gh,
      lwp: lwp,
      dayoff:dayoff,

        });
    }
    return out;
}
exports.generateItems = generateItems;
function generateFormulaFields() {
    return [
        { id: crypto.randomUUID(), referenceName: 'net pay days', npd_formula: '' },

    // { id: crypto.randomUUID(), referenceName: '', formula: '' },
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

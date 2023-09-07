import React from 'react';
import { useState, useMemo } from 'react'
import { evaluateTokenNodes, getExtendedTokens } from '../../../../formulaParser/shared/src'
import { generateItems, generateFormulaFields, supportedColumns, supportedRefs } from '../../../../formulaParser/shared-demo/gen'
import { FormulaInput } from './FormulaInput'
import '../../../../formulaParser/shared-demo/global.css'

export function App({ setSetupTitle, setSetupFormula }) {

  const [fields, setFields] = useState(generateFormulaFields())
  const setField = (field) => {
    setFields(fields.map(f => f.id === field.id ? field : f))
  }
  const addField = () => {
    setFields([...fields, { id: crypto.randomUUID(), referenceName: '', npd_formula: '' }])
  }

  const formulasByRefs = useMemo(() => fields.reduce((out, field) => {
    if (field.referenceName) {
      out[field.referenceName] = field.npd_formula
    }
    return out
  }, {}), [fields])

  const extendedTokens = useMemo(() => getExtendedTokens(formulasByRefs, supportedRefs), [formulasByRefs])
  const extendedTokensByRefs = useMemo(() => Object.values(extendedTokens).reduce((out, entry) => {
    out[entry.referenceNameOrig] = entry
    return out
  }, {}), [extendedTokens])

  const extendedTokensOrdered = useMemo(() => Object.values(extendedTokens).sort((a, b) => a.order - b.order), [extendedTokens])
  const columns = useMemo(() => [
    ...supportedColumns,
    ...fields.map(field => ({ key: field.referenceName, title: field.referenceName, type: 'formula' }))
  ], [fields])

  const [items] = useState(generateItems())
  const extendedItems = useMemo(() => items.map((item) => {
    const extendedItem = {}
    Object.entries(item).forEach(([key, value]) => {
      extendedItem[key] = (value === 0 ? 0 : (value || '')).toString()
    })
    extendedTokensOrdered.forEach((entry) => {
      extendedItem[entry.referenceNameOrig] = evaluateTokenNodes(entry.tokenNodes, (prop) => (extendedItem[prop] || '').toString())
    })
    return extendedItem
  }), [items, extendedTokensOrdered])


  return (

    <div className="fm-container">
      <div className="fm-block">
        <div className="fm-block__content">
          <label>Payroll setup title: &nbsp;</label>
          <input
            type="text"
            onChange={event => {
              setSetupTitle(event.target.value)
            }}
          />
          <table className="fm-table">
            <thead>
              <tr>
                <th className="fm-table__col fm-table__col--header" style={{ width: '25%' }}>
                  item
                </th>
                <th className="fm-table__col fm-table__col--header">
                  formula
                </th>
                <th className="fm-table__col fm-table__col--header" style={{ width: '50px' }} />
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.id}>
                  <td className="fm-table__col fm-table__col--input">
                    <input
                      value={field.referenceName}
                      type="text"
                    />
                  </td>
                  <td
                    className="fm-table__col fm-table__col--input"
                    style={{ height: "50px" }}
                  >
                    <FormulaInput
                      modelValue={field.npd_formula}
                      tokens={extendedTokensByRefs[field.referenceName] && extendedTokensByRefs[field.referenceName].tokens}
                      validationErrors={extendedTokensByRefs[field.referenceName] && extendedTokensByRefs[field.referenceName].validationErrors}
                      onChange={(formula) => {
                        setSetupFormula(formula)
                        setField({ ...field, npd_formula: formula })
                      }
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App


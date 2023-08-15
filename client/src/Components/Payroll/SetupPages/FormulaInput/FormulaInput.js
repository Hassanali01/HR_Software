import React, { Component }  from 'react';

import { useState, useMemo, useRef, useLayoutEffect } from 'react'



export function FormulaInput(props) {
  const { modelValue, onChange, tokens, validationErrors } = props
  const [isFocused, setFocused] = useState(false)

  const highlight = useMemo(() => {
    const errorsByTokenIndexes = validationErrors && validationErrors.reduce((out, error) => {
      if (error.tokenIndex || error.tokenIndex === 0) {
        out[error.tokenIndex] = true
      }
      return out
    }, {})
    return tokens && tokens.map((token, tokenIndex) => ({
      value: token.value,
      css: `fm-colored-input__highlight--${token.type}` + (errorsByTokenIndexes[tokenIndex] ? ' fm-colored-input__highlight--error' : '')
    }))
  }, [tokens, validationErrors])

  const textareaRef = useRef(null)

  const updateHeight = (el) => {
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
      setTimeout(() => {
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
      }, 0)
    }
  }

  useLayoutEffect(() => {
    updateHeight(textareaRef.current)
  }, [modelValue])  

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateHeight(textareaRef.current)
    })
    if (textareaRef.current) {
      resizeObserver.observe(textareaRef.current)
    }
    return () => {
      resizeObserver.disconnect()
    }
  }, [textareaRef])

  return (
    <div className="fm-colored-input">
      <div className={'fm-colored-input__wrapper' + (isFocused ? ' fm-colored-input__wrapper--focused' : '')}>
        <textarea
          ref={textareaRef}
          value={modelValue}
          className="fm-colored-input__textarea"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          rows={1}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={event => { 
            console.log("formula parser", event.target.value)
            onChange(event.target.value)}}
        />
        <div className="fm-colored-input__highlight">
          {highlight && highlight.map((highlightEntry, highlightEntryIndex) => (
            <span
              key={highlightEntry.value + highlightEntryIndex}
              className={highlightEntry.css}
            >
              {highlightEntry.value}
            </span>
          ))}
        </div>
      </div>
      <div className="fm-colored-input__validation">
        {validationErrors && validationErrors.map(error => error.errorType).join(', ') }
      </div>
    </div>
  )
}

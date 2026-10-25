import React from 'react';
import './Input.css';

export const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  options = [], // For select input
  rows = 4, // For textarea
  className = '',
  helperText = '',
  rightElement = null,
  isNameInput = false,
  isPhoneInput = false,
  maxLength
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e) => {
    if (!onChange) return;
    if (isNameInput) {
      // Automatically reject/strip all numbers from name inputs
      const sanitized = e.target.value.replace(/[0-9]/g, '');
      e.target.value = sanitized;
      onChange(e);
    } else if (isPhoneInput) {
      // Strip non-digits and cap at exactly 10 digits for Indian mobile numbers
      const sanitized = e.target.value.replace(/\D/g, '').slice(0, 10);
      e.target.value = sanitized;
      onChange(e);
    } else {
      onChange(e);
    }
  };

  const calculatedMaxLength = isPhoneInput ? 10 : maxLength;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label} {required && <span className="required-asterisk">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={inputId}
          value={value}
          onChange={handleChange}
          className={`input-element input-select ${error ? 'input-error' : ''}`}
          required={required}
        >
          {options.map((opt, i) => (
            <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
              {typeof opt === 'object' ? opt.label : opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className={`input-element input-textarea ${error ? 'input-error' : ''}`}
          required={required}
        />
      ) : rightElement ? (
        <div className="input-wrapper">
          <input
            id={inputId}
            type={isPhoneInput ? 'tel' : type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={calculatedMaxLength}
            className={`input-element ${error ? 'input-error' : ''} input-has-right-element`}
            required={required}
          />
          <div className="input-right-element">{rightElement}</div>
        </div>
      ) : (
        <input
          id={inputId}
          type={isPhoneInput ? 'tel' : type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={calculatedMaxLength}
          className={`input-element ${error ? 'input-error' : ''}`}
          required={required}
        />
      )}

      {error && <span className="input-error-msg">{error}</span>}
      {!error && helperText && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
};

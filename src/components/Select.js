import React from 'react'

export default function Select({ id, label, value, handleChange, options, feedback = '', ...props }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                className={feedback ? 'form-control is-invalid' : 'form-control'}

                value={value}
                onChange={handleChange}
                {...props}
            >
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            <div className="invalid-feedback">{feedback}</div>
        </div>
    )
}

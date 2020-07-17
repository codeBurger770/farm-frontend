import React from 'react'

export default function Input({ id, label, value, handleChange, feedback = '', ...props }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className={feedback ? 'form-control is-invalid' : 'form-control'}
                value={value}
                onChange={handleChange}
                {...props}
            />
            <div className="invalid-feedback">{feedback}</div>
        </div>
    )
}

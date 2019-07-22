import React from 'react'

const FormField = (props) => {
    const {
        label,
        name,
        onBlur,
        value,
        onChange,
        touch,
        error,
        inputType,
        validationClassName,
        isInput,
    } = props

    const inputAttrs ={
        autoComplete:'off', 
        className: `form-control ${validationClassName}`,
        name,
        value,
        onBlur,
        onChange:onChange
    }
    
    return (
        <div className='FormField'>
            <label className='FormField'>{label}</label>
            
            {isInput && <input type='file'></input>}
         
            {inputType === 'textarea'
            ? <textarea { ...inputAttrs }rows={2}></textarea>
            : ( <input placeholder={props.placeholder} type={props.type} {...inputAttrs}/>)}

            {touch && !error && (
                <div className='valid-feedback'>
                    Looks good!
                </div>
            )}

            {touch && error && (
                <div className="invalid-feedback">
                    Invalid field
                </div>
            )}
        </div>
    ) 
}

export default FormField
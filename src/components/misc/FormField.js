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
        isCreate
    } = props

    const inputAttrs ={
        autoComplete:'off', 
        className: `form-control $ {validationClassName}`,
        name,
        value,
        onBlur,
        onChange:onChange
    }
    
    return (
        <div className='form-group'>
            <label>{label}</label>
            
            
            {isInput && <input type='file'></input>}
  
            {inputType === 'textarea'
            ? <textarea { ...inputAttrs }rows={2}></textarea>
            : (!isCreate && <input{...inputAttrs}/>)}

            {touch && !error && (
                <div className='valid-feedback'>
                    Looks good!
                </div>
            )}
        </div>
    ) 
}


export default FormField
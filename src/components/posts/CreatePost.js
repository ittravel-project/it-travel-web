import React from 'react'
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import { Redirect } from 'react-router-dom';
import FormField from '../misc/FormField';
import PostService from '../../services/PostService'

const validators={
    title: value => value.length > 3,
    creater: value => value.length > 3,    
    city: value => value.length > 3,    
    attachment: value => value.length > 10,
}

class CreatePost extends React.Component {
    state={
        data:{
            title:'',
            creater: '',
            city: '',
            attachment:'',
            message:''
        },
        errors:{
           title: true,
           attachment: true
        },
        goToPosts:false,
        touch:{}
   }
   
    handleChange = (event) => {
        const {name, value } = event.target
        const isValid = validators[name](value)

        this.setState({ 
            data:{
                ...this.state.data,
                [name]:value
            },
            errors:{
                ...this.state.errors,
                [name]:!isValid
            },
            mdeValue: value 
        });
    };

    handleContentChange = (value) => {
        this.setState({ 
            data:{
                ...this.state.data,
                message: value
            }
        });
    };
    
    handleBlur = (event) => {
        const{name} = event.target

        this.setState({
            touch:{
                ...this.state.touch,
                [name]:true
            }
        })
    }

    getValidationsClassName= (attr)=>{
        const {errors, touch}= this.state

        if(!touch[attr]){
            return ''
        } else if (errors[attr]){
            return 'is-invalid'
        }else {
            return 'is-valid'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        PostService.createPost(this.state.data).then(
            () => {
                this.setState({
                    goToPosts: true
                })
            },
            error => {
                const serverErrors = Object.keys(error.response.data.errors).reduce((acc, el) => (
                    {...acc, [el]: true }
                ), {})
                
                this.setState({
                    errors:{
                        ...this.state.errors,
                        ...serverErrors
                    }
                })
            }
        )
    }
    render() {
        if (this.state.goToPosts) {
            return <Redirect to='/posts' />
        }

        const {user, data,errors,touch}=this.state
        const hasErrors=Object.values(errors).some(el => el === true)
        
        return (
            <article className='CreatePost'>

                <form onSubmit={this.handleSubmit}>
                    <FormField
                    label='Title'
                    name="title"
                    onBlur={this.handleBlur}
                    value={data.title}
                    onChange={this.handleChange}
                    touch={touch.title}
                    error={errors.title}
                    inputType='text'
                    validationsClassName={this.getValidationsClassName('title')}
                    />

                    <FormField
                    label='Creater'
                    name="creater"
                    onBlur={this.handleBlur}
                    value={data.creater}
                    onChange={this.handleChange}
                    touch={touch.creater}
                    error={errors.creater}
                    inputType='text'
                    validationsClassName={this.getValidationsClassName('creater')}
                    />

                    <FormField
                    label='City'
                    name="city"
                    onBlur={this.handleBlur}
                    value={data.city}
                    onChange={this.handleChange}
                    touch={touch.city}
                    error={errors.city}
                    inputType='text'
                    validationsClassName={this.getValidationsClassName('city')}
                    />
                    <FormField
                    label="Image URL"
                    name="attachment"
                    onBlur={this.handleBlur}
                    value={data.attachment}
                    onChange={this.handleChange}
                    touch={touch.attachment}
                    error={errors.title}
                    inputType='text'
                    validationsClassName={this.getValidationsClassName('attachment')}
                
                    />
 
                    <SimpleMDE
                        label='Message'
                        name='message'
                        value={data.message}
                        onChange={this.handleContentChange}
                        options={{
                            toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "preview", "side-by-side", "fullscreen"]
                        }}
                    />

                    <button type='submit'
                    className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
                    disabled={hasErrors}>Submit</button>
                </form>
            </article>
            
        )
    }
}

export default CreatePost
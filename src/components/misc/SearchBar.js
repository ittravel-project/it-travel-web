import React from 'react';
import { queryString } from 'query-string';

class SearchBar extends React.Component {
   state= {
       searchText: this.props.queryString.name || '',
       error: true,
       touch: false 
   }

   handleChange=(e) =>{
       const name = e.target.name
       const newState = {} 

       newState[name]= e.target.value 
       newState.error= e.target.value.length < 3

       this.setState(newState)
   }

   handleBlur=(e) => {
       this.setState({ touch:true })
   }
   
   handleSubmit=(e)=>{
       e.preventDefault()
       this.props.onSearch(this.state.searchText)
   }

   componentDidMount(){
       const {searchText} = this.state
       if (searchText) {
           this.props.onSearch(searchText)
       }
   }
   
    render() {
        return(
            <div className='SearchBar row mb-4'>
                <div className="col">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="exampleFormControlInput1"></label>
                        <input type="text" className="form-control" placeholder="Enter name/city...." name='searchText' autoComplete='off' value={this.state.searchText} onChange={this.handleChange} onBlur={this.handleBlur} />

                        {this.state.touch && this.state.error && (
                            <div>
                                Invalid Field
                            </div>
                        )}
                    </div>
                    <div className='d-flex flex-direction-row'>
                    <button type='submit' className="btn btn-primary" disabled={this.state.error}>Search</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }

}

export default SearchBar 




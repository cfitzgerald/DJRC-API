import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVenues, fetchUsers, updateOwner } from '../store';

class WebAdmin extends Component {
  constructor(){
    super();
    this.state = {
      filterValue: '',
      userId: 0

    }
    this.handleFilter = this.handleFilter.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  cpmonentDidMount(){
    this.setState({
      venues: fetchVenues(),
    users: fetchUsers()})
  }
  handleFilter(ev){
    this.setState({filterValue: ev.target.value})
  }

  onChangeHandler(ev){
    this.setState({userId: ev.target.value})
  }

  onSubmitHandler(ev){
    ev.preventDefault()
    this.props.updateOwner(this.state.userId)
  }

  render(){
    const { handleFilter, onSubmitHandler, onChangeHandler } = this;
    const { filterValue } = this.state;
    // const filteredVenues = this.props.venues.filter(venue => venue.name.match(filterValue));
    const filteredVenues = [{id: 1, name: 'Pizza Bar'}, {id: 2, name: 'Drink Bar'}]
    // const users = this.props.users;
    const users = [{id:1, name: 'bob'}, {id: 2, name: 'tony'}]
    console.log(this.state);
    console.log(this.props);
    return(
     <div>

       <form className='form-group'>
        <input
          onChange={ handleFilter }
          value={ filterValue }
          className='form-control'
         />
       </form>
       <table className="table">
        <thead>
          <tr>
            <th> ID </th>
            <th> Venue Name </th>
          </tr>
        </thead>
        <tbody>

          {
            filteredVenues.map( bar => {
              return (
                <tr key={ bar.id }>
                  <td> { bar.id } </td>
                  <td> { bar.name } </td>
                  <td>
                    <form onSubmit={(ev)=> { this.props.updateOwner(bar.id, ev.target.value)}}>
                      <select onChange={ onChangeHandler }>

                        {
                          users.map( user => {
                            return(
                              <option key= {user.id} value={user.id}> {user.id} - {user.name} </option>
                            )
                          })
                        }
                      </select>
                      <button className="btn btn-primary"> Update </button>
                    </form>
                  </td>
                </tr>
              )
            })
           }

        </tbody>

      </table>
     </div>
    )

  }

}

const mapState = ({ venues, users }) => {
    return { venues, users };
};

const mapDispatch = (dispatch) => {
    return {
        fetchVenues: () => {
            dispatch(fetchVenues());
        },
        fetchUsers: () => {
          dispatch(fetchUsers());
        },
        updateOwner
    }
}

export default connect(mapState, mapDispatch)(WebAdmin);

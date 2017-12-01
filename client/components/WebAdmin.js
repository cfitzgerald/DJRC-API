import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVenues, fetchUsers, updateOwner, addPromo } from '../store';

class WebAdmin extends Component {
  constructor(){
    super();
    this.state = {
      filterValue: '',
      userId: 0

    }
    this.handleFilter = this.handleFilter.bind(this);

    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  componentDidMount(){
    this.props.fetchVenues();
    this.props.fetchUsers();
  }
  handleFilter(ev){
    this.setState({filterValue: ev.target.value})
  }

  onChangeHandler(ev){
    this.setState({userId: ev.target.value * 1})
  }



  render(){
    const { handleFilter, onChangeHandler } = this;
    const { filterValue } = this.state;
    let filteredVenues, users
    if (this.props.venues){
    filteredVenues = this.props.venues.filter(venue => venue.name.match(filterValue));
    }

    if (this.props.users){
      users = this.props.users.filter(user => user.isBusiness !== true)
    }

    return(
     <div>
      <h2>Bar Name Filter</h2>
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
                    <form onSubmit={()=> {

                      this.props.updateOwner(bar.id, this.state.userId)}}
                      >
                      <select onChange={ onChangeHandler }>


                        {
                          users.map( user => {
                            return(
                              <option key= {user.id} value={user.id}> {user.id} - {user.fullName} </option>
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
        updateOwner,
        addPromo
    }
}

export default connect(mapState, mapDispatch)(WebAdmin);

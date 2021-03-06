import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>Bye..</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

export default connect(null, actions)(Signout);

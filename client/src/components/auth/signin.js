import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit = ({email, password}) => {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.renderAlert()}

        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        <button type="submit" className="btn btn-primary">Sign In</button>

      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

const SignInForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

export default connect(mapStateToProps, actions)(SignInForm);

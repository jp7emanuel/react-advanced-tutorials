import React, { Component } from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps);
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
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {this.renderAlert()}

        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
          {email.touched && email.error && <div className="error">{password.email}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} type="password" className="form-control" />
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{password.passwordConfirm}</div>}
        </fieldset>
        <button type="submit" className="btn btn-primary">Sign Up!</button>

      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Email is required';
  }

  if (!formProps.password) {
    errors.email = 'Password is required';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password Confirmation is required';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

const SignupForm = reduxForm({
  form: 'signin',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default connect(mapStateToProps, actions)(SignupForm);

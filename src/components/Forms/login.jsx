import React from 'react';
import Form from '../Common/form';
import Joi from 'joi-browser';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
  };
  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = () => this.props.onSubmit(this.state.data);

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;

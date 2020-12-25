import React from 'react';
import Form from '../Common/Form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
  state = {
    data: { username: '', email: '', password: '' },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label('User Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = () => this.props.onSubmit(this.state.data);

  render() {
    return (
      <React.Fragment>
        <h1 className='formTitle'>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'User Name')}
          {this.renderInput('email', 'Email', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Sign Up')}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;

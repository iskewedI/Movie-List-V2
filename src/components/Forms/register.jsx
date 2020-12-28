import React from 'react';
import { withTranslation } from 'react-i18next';
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
    const { t } = this.props;

    return (
      <React.Fragment>
        <h1 className='formTitle'>{t('forms.titles.sign_up')}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', t('forms.fields.user_name'))}
          {this.renderInput('email', t('forms.fields.email'), 'email')}
          {this.renderInput('password', t('forms.fields.password'), 'password')}
          {this.renderButton(t('forms.buttons.sign_up'))}
        </form>
      </React.Fragment>
    );
  }
}

export default withTranslation()(RegisterForm);

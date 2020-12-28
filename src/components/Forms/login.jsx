import React from 'react';
import { withTranslation } from 'react-i18next';
import Form from '../Common/Form/';
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
    const { t } = this.props;
    return (
      <React.Fragment>
        <h1 className='formTitle'>{t('forms.titles.log_in')}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', t('forms.fields.email'), 'email')}
          {this.renderInput('password', t('forms.fields.password'), 'password')}
          {this.renderButton(t('forms.buttons.log_in'))}
        </form>
      </React.Fragment>
    );
  }
}

export default withTranslation()(LoginForm);

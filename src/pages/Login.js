import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { setUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false,
      buttonDisableStatus: true,
    };
  }

  handleValidation = () => {
    const { email, password } = this.state;
    const validRegex = /\S+@\S+\.\S+/;
    const minimumPasswordChars = 6;

    if (validRegex.test(email) && password.length >= minimumPasswordChars) {
      this.setState({ buttonDisableStatus: false });
    } else {
      this.setState({ buttonDisableStatus: true });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleValidation();
    });
  }

  render() {
    const { email, buttonDisableStatus, redirect } = this.state;
    const { user } = this.props;

    if (redirect) return <Redirect to="/carteira" />;

    return (
      <>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          onChange={ this.handleChange }
        />

        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          name="password"
          onChange={ this.handleChange }
        />

        <button
          type="button"
          onClick={ () => {
            user(email);
            this.setState({ redirect: true });
          } }
          disabled={ buttonDisableStatus }
        >
          Entrar
        </button>
      </>
    );
  }
}

Login.propTypes = {
  user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (email) => dispatch(setUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);

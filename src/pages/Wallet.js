import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { displayEmail } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {displayEmail}
        </p>

        <p data-testid="total-field">
          0
        </p>

        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  displayEmail: state.user.email,
});

Wallet.propTypes = {
  displayEmail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);

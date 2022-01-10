import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const displayEmail = this.props;
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

export default connect(mapStateToProps, null)(Wallet);

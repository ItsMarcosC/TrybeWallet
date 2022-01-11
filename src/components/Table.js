import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((ele) => (
              <tr key={ ele.id }>
                <td>{ ele.description }</td>
                <td>{ ele.tag }</td>
                <td>{ ele.method }</td>
                <td>{ ele.value }</td>
                <td>{ ele.exchangeRates[ele.currency].name }</td>
                <td>
                  { parseFloat(ele.exchangeRates[ele.currency].ask).toFixed(2) }
                </td>
                <td>
                  {
                    parseFloat(ele.exchangeRates[ele.currency].ask * ele.value).toFixed(2)
                  }
                </td>
                <td>Real</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Table);

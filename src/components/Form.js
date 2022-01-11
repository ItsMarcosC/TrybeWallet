import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addValue, getData } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.addValue = this.addValue.bind(this);
    // Eu adoraria tirar isso e fazer um handleChange = () => {}, mas por alguma razão buga tudo, lembrar de procurar descobrir o pq depois...

    this.state = {
      id: 0,
      ...INITIAL_STATE,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  async addValue() {
    const { add, fetchCurrencies, currencies } = this.props;
    const { id, currency } = this.state;
    fetchCurrencies();
    const currentAsk = parseFloat(currencies[currency].ask);
    await this.setState({ exchangeRates: { ...currencies } });
    add(this.state, currentAsk);
    this.setState({
      id: id + 1,
      ...INITIAL_STATE,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          placeholder="Valor"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          placeholder="Descrição"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            id="currency-input"
          >
            { Object.keys(currencies).map((element, index) => (
              element !== 'USDT' && (
                <option key={ index }>{ element }</option>
              )
            ))}
          </select>
        </label>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button" onClick={ this.addValue }>Adicionar despesa</button>
      </div>
    );
  }
}

Form.propTypes = {
  add: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  add: (payload, ask) => dispatch(addValue(payload, ask)),
  fetchCurrencies: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

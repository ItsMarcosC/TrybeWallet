export const SAVE_USER = 'SAVE_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_VALUE = 'ADD_VALUE';

export const setUser = (email) => ({
  type: SAVE_USER,
  email,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

// Nota pro futuro, 'ask' é o valor que vem da API.
export const addValue = (payload, ask) => ({
  type: ADD_VALUE,
  payload,
  ask,
});

export const getData = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((payload) => dispatch(getCurrencies(payload)));

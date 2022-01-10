export const SAVE_USER = 'SAVE_USER';

export const setUser = (email) => ({
  type: SAVE_USER,
  email,
});

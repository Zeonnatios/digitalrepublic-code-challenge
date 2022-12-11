export const setStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value)));

export const getStorage = (key, value = []) => (
  JSON.parse(localStorage.getItem(key)) || value);

export const getStorageValue = (key, value = 0) => (
  JSON.parse(localStorage.getItem(key)) || value);

export const userStorage = (response) => {
  const { token, user } = response.data;
  const userStor = {
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    account: user.account,
    token,
  };
  return userStor;
};

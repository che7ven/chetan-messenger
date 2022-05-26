export const getTime = () =>
  `${new Date(Date.now()).getHours()}:${new Date(
    Date.now()
  ).getMinutes()}:${new Date(Date.now()).getSeconds()}`;

export const isEmptyObject = (obj) => obj && Object.keys(obj).length === 0;

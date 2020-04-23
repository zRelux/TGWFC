const domain = 'http://192.168.1.10:3000'; //'https://cah-back.herokuapp.com'; //
export const socketEndpoint = domain;
const api = domain + '/api';

export default async (path: string) => {
  const res = await fetch(api + path);

  return res.json();
};

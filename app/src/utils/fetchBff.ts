const domain = 'https://cah-back.herokuapp.com';
export const socketEndpoint = 'http://localhost:3000'; //domain;
const api = domain + '/api';

export default async (path: string) => {
  const res = await fetch(api + path);

  return res.json();
};

const domain = 'https://tgwfc-stg.herokuapp.com'; //https://tgwfc-prod.herokuapp.com 'http://192.168.1.10:3000'; //
export const socketEndpoint = domain;
const api = domain + '/api';

export default async (path: string) => {
  const res = await fetch(api + path);

  return res.json();
};

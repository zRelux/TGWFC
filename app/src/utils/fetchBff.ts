const domain = 'https://tgwfc-stg.herokuapp.com'; //'https://tgwfc-stg.herokuapp.com'; //https://tgwfc-prod.herokuapp.com
export const socketEndpoint = domain;
const api = domain + '/api';

export default async (path: string) => {
  const res = await fetch(api + path);

  return res.json();
};

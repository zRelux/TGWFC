import ENV from './config';

export const socketEndpoint = ENV.domain;
const api = ENV.domain + '/api';

export default async (path: string) => {
  const res = await fetch(api + path);

  return res.json();
};

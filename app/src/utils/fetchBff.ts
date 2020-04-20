const domain = 'https://cah-back.herokuapp.com';
export const socketEndpoint = 'http://192.168.1.4:3000'; // domain; //
const api = 'http://192.168.1.4:3000' + '/api';

export default async (path: string) => {
  const res = await fetch(api + path);

  return res.json();
};

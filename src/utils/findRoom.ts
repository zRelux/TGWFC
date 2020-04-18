import rooms from '../db';

export default (roomId: string) => {
  const roomToGet = rooms.filter(roomToFind => roomToFind.id === roomId);
  const room = roomToGet.length > 0 ? roomToGet[0] : null;

  return room;
};

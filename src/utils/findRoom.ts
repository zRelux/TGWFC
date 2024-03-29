import roomsdb from '../db';

export default (roomId: string) => {
  const roomToGet = roomsdb.rooms.filter(roomToFind => roomToFind.id === roomId);
  const room = roomToGet.length > 0 ? roomToGet[0] : null;

  return room;
};

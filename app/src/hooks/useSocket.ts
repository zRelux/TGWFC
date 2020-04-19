import { useContext } from 'react';

import SocketContext from '../contexts/Socket';
// tells us if our page data is sources from either 'drupal' or 'sanity'
export default () => useContext(SocketContext);

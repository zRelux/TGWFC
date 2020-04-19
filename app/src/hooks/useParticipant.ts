import { useContext } from 'react';

import ParticipantContext from '../contexts/Participant';
// tells us if our page data is sources from either 'drupal' or 'sanity'
export default () => useContext(ParticipantContext);

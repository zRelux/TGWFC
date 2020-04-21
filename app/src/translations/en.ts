export default {
  HomeScreen: {
    header: 'The Game with Funny Cards',
    startButton: 'Start a game',
    joinButton: 'Partecipate',
    settingsButton: 'Settings'
  },
  StartScreen: {
    setupHeader: 'Setup your game',
    roundsHeader: 'Number of rounds',
    packsHeader: 'Card packs',
    createRoomButtonEmpty: 'Select at least a card pack',
    createRoomButton: 'Create game',
    goBackButton: 'Go Back'
  },
  LobbyScreen: {
    hostCardHeader: 'Game host:',
    shareButton: 'Share link to this match',
    exitButton: 'Leave the match',
    participantHeader: 'Participants',
    noParticipantsLoader: 'There are no participants yet.',
    waitingButton: 'Waiting for partecipants...',
    startButton: 'Start the game!',
    waitHostButton: 'Waiting for host…'
  },
  JoinScreen: {
    pageHeader: 'Join a game',
    inputHeader: 'Insert room id',
    joinButton: 'Join room',
    noJoinButton: 'Please insert room Id'
  },
  GameScreen: {
    waiting: 'Waiting for players to choose…',
    userChoseCard: 'Choose your completion:',
    userWaitingCzar: 'Waiting for Czar to choose...',
    czarChoosing: 'Choose the funnier card',
    czarWaiting: 'You are the Card Czar.',
    cardButtonChoose: 'Select',
    cardButtonChosen: 'Selected',
    winnerUser: '%{name} won the round!!'
  },
  WinnerScreen: {
    winnerText: 'The winner is',
    iWonText: 'You won the game',
    exitButton: 'Exit the match'
  },
  SettingsScreen: {
    pageHeader: 'Settings',
    inputHeader: 'Your name in game',
    disclaimer: {
      first: 'The Game With Funny Cards or TGWFC is a ',
      boldFirst: 'Cards Against Humanity',
      second:
        ' clone. You can buy the game at their website or print the cardsyourself. TGWFC is completely free to use and is in no way endorsed or sponsored by ',
      secondBold: `cardsagainsthumanity.com.`
    },
    noSaveButton: 'Please insert your username',
    saveButton: 'Save',
    goBackButton: 'Go Back'
  }
};

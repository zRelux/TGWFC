import React, { useState, useEffect } from 'react';

import { Dimensions, FlatList } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../..';

import ScreenContainer, { Content } from '../../components/ScreenContainer';
import Game from '../../components/BottomSheet/Game';

import {
  CardToFill,
  CardToFillText,
  ChooseSection,
  ChooseSectionText,
  ChooseCard,
  ChooseCardText,
  ChooseCardButton,
  ChooseCardButtonText,
  ChooserTextSection,
  ChooserText
} from './styles';

import useData from '../../hooks/useData';
import useSocket from '../../hooks/useSocket';
import useParticipant from '../../hooks/useParticipant';
import { StartGameReplyPayload } from '../LobbyScreen';

interface GameScreenProps {
  route: RouteProp<RootStackParamList, 'Game'>;
}

type ChosenCardReplyPayload = {
  chosen_cards: string[];
};

const screenWidth = Dimensions.get('screen').width;

const GameScreen: React.FunctionComponent<GameScreenProps> = ({ route }) => {
  const [blackCard, setBlackCard] = useState((route.params && route.params.cardToShow) || 'Crad');
  const [myCards, setMyCards] = useState<string[]>(route.params && route.params.cards);
  const [chosenCards, setChosenCards] = useState<string[]>([]);
  const [myTurn, setMyTurn] = useState((route.params && route.params.iAmChooser) || false);
  const [thisRound, setThisRound] = useState((route.params && route.params.round) || 1);
  const [userThatChooses, setUserThatChooses] = useState(
    (route.params && route.params.chooser) || { username: 'Pippo' }
  );
  const [selectedCard, setSelectedCard] = useState('');

  const { roomId } = useData();
  const { participants } = useParticipant();
  const { send, listen, socketAvailable } = useSocket();

  const enableChoose = chosenCards.length === participants.length;

  useEffect(() => {
    if (socketAvailable) {
      listen<ChosenCardReplyPayload>('chosenCardReply', ({ chosen_cards }) => {
        setChosenCards(chosen_cards);
      });

      listen<StartGameReplyPayload>(
        'chosenSelectedWinnerReply',
        ({ error, card_to_show, cards, i_am_chooser, round, chooser }) => {
          if (!error) {
            setBlackCard(card_to_show);
            setMyTurn(i_am_chooser);
            setThisRound(round);
            setUserThatChooses(chooser);
            setMyCards(cards);
          } else {
            alert(error);
          }
        }
      );
    }
  }, [socketAvailable]);

  const selectCard = (card: string) => () => {
    if (selectedCard === '' && !myTurn) {
      setSelectedCard(card);

      send('chosenCard', { room_id: roomId, chosen_card: card });
    } else if (myTurn && enableChoose) {
      send('chosenSelectedWinner', { room_id: roomId, winner_card: card });
    }
  };

  return (
    <ScreenContainer>
      <Game round={thisRound} chooser={userThatChooses} />
      <Content>
        <CardToFill>
          <CardToFillText>{blackCard}</CardToFillText>
        </CardToFill>
        <ChooseSection>
          {selectedCard !== '' || myTurn ? (
            <ChooseSectionText>Waiting for players to choose…</ChooseSectionText>
          ) : (
            <ChooseSectionText>Choose your completion:</ChooseSectionText>
          )}
        </ChooseSection>
        {myTurn && chosenCards.length === 0 ? (
          <ChooserTextSection>
            <ChooserText>You are the Card Czar.</ChooserText>
          </ChooserTextSection>
        ) : (
          <FlatList
            data={myTurn ? chosenCards : myCards}
            horizontal={true}
            renderItem={({ item }) => (
              <ChooseCard screenWidth={screenWidth}>
                <ChooseCardText>{item}</ChooseCardText>
                <ChooseCardButton selected={selectedCard === item} onPress={selectCard(item)}>
                  {enableChoose ? (
                    <></>
                  ) : selectedCard === item ? (
                    <ChooseCardButtonText selected={true}>Selected</ChooseCardButtonText>
                  ) : (
                    <ChooseCardButtonText selected={false}>Select</ChooseCardButtonText>
                  )}
                </ChooseCardButton>
              </ChooseCard>
            )}
            keyExtractor={(card) => card}
          />
        )}
      </Content>
    </ScreenContainer>
  );
};

export default GameScreen;

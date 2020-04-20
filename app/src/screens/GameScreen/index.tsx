import React, { useState, useEffect } from 'react';

import { Dimensions, FlatList, ScrollView } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../..';

import ScreenContainer, { Content } from '../../components/ScreenContainer';
import Game from '../../components/BottomSheet/Game';

import useData from '../../hooks/useData';
import useSocket from '../../hooks/useSocket';
import useParticipant from '../../hooks/useParticipant';
import { StartGameReplyPayload } from '../LobbyScreen';

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
import { translate } from '../../translations';

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

  const enableChoose = myTurn ? (chosenCards.length === participants.length ? true : false) : true;
  const showChosenCards = chosenCards.length === participants.length - 1;

  useEffect(() => {
    if (socketAvailable) {
      listen<ChosenCardReplyPayload>('chosenCardReply', ({ chosen_cards }) => {
        setChosenCards(chosen_cards);
      });

      listen<StartGameReplyPayload>(
        'chosenSelectedWinnerReply',
        ({ error, card_to_show, cards, i_am_chooser, round, chooser }) => {
          console.log({ error, card_to_show, cards, i_am_chooser, round, chooser });

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

  const selectCard = (card: string, iChoose: boolean) => () => {
    if (selectedCard === '' && !iChoose) {
      setSelectedCard(card);

      send('chosenCard', { room_id: roomId, chosen_card: card });
    } else if (iChoose && enableChoose) {
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
          <ChooseSectionText>
            {showChosenCards && myTurn
              ? translate('GameScreen.czarChoosing')
              : showChosenCards
              ? translate('GameScreen.userWaitingCzar')
              : selectedCard !== '' || myTurn
              ? translate('GameScreen.waiting')
              : translate('GameScreen.userChoseCard')}
          </ChooseSectionText>
        </ChooseSection>
        {myTurn && chosenCards.length === 0 && (
          <ChooserTextSection>
            <ChooserText>{translate('GameScreen.czarWaiting')}</ChooserText>
          </ChooserTextSection>
        )}
      </Content>
      <ScrollView style={{ height: 300 }}>
        {!(myTurn && chosenCards.length === 0) && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={showChosenCards ? chosenCards : myCards}
            horizontal={true}
            renderItem={({ item }) => (
              <ChooseCard screenWidth={screenWidth}>
                {enableChoose && (
                  <>
                    <ChooseCardText>{item}</ChooseCardText>
                    {!showChosenCards && (
                      <ChooseCardButton selected={selectedCard === item} onPress={selectCard(item, myTurn)}>
                        <ChooseCardButtonText selected={selectedCard === item}>
                          {selectedCard === item
                            ? translate('GameScreen.cardButtonChosen')
                            : translate('GameScreen.cardButtonChoose')}
                        </ChooseCardButtonText>
                      </ChooseCardButton>
                    )}
                  </>
                )}
              </ChooseCard>
            )}
            keyExtractor={(card) => card}
          />
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default GameScreen;

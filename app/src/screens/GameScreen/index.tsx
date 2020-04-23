import React, { useState, useEffect } from 'react';

import { Dimensions, FlatList, ScrollView } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../..';

import ScreenContainer, { Content } from '../../components/ScreenContainer';
import Game from '../../components/BottomSheet/Game';

import useData from '../../hooks/useData';
import useSocket from '../../hooks/useSocket';
import useParticipant from '../../hooks/useParticipant';

import { Card } from '../../types/User';

import { translate } from '../../translations';

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
  ChooserText,
  SpaceContainer
} from './styles';
import { GameReplyPayload } from '../../types/Payloads';

interface GameScreenProps {
  route: RouteProp<RootStackParamList, 'Game'>;
  navigation: StackNavigationProp<RootStackParamList, 'Game'>;
}

type ChosenCardReplyPayload = {
  chosen_cards: Card[];
};

const screenWidth = Dimensions.get('screen').width;

const GameScreen: React.FunctionComponent<GameScreenProps> = ({ route, navigation }) => {
  const [blackCard, setBlackCard] = useState(route.params.cardToShow);
  const [myCards, setMyCards] = useState<Card[]>(route.params.cards);
  const [chosenCards, setChosenCards] = useState<Card[]>([]);
  const [myTurn, setMyTurn] = useState(route.params.iAmChooser);
  const [thisRound, setThisRound] = useState(route.params.round);
  const [winnerUser, setWinnerUser] = useState('');
  const [userThatChooses, setUserThatChooses] = useState(route.params.chooser);

  const [selectedCard, setSelectedCard] = useState<Card>();

  const { roomId } = useData();
  const { participants } = useParticipant();
  const { send, listen, socketAvailable } = useSocket();

  const allCardsHaveBeenChosen = chosenCards.length === participants.length - 1;
  const showChosenCards = chosenCards.length === participants.length - 1;

  const dataToShow = !myTurn && !allCardsHaveBeenChosen ? myCards : chosenCards;
  const showCard = myTurn ? (allCardsHaveBeenChosen ? true : false) : true;
  const showMessage = (myTurn && chosenCards.length === 0) || winnerUser !== '';
  const showOnlySelected = myTurn ? false : !!selectedCard;

  useEffect(() => {
    if (socketAvailable) {
      listen<ChosenCardReplyPayload>('chosenCardReply', ({ chosen_cards }) => {
        setChosenCards(chosen_cards);
      });

      listen<ChosenCardReplyPayload>('finishGameReply', () => {
        navigation.navigate('Winner');
      });

      listen<GameReplyPayload>(
        'chosenSelectedWinnerReply',
        ({ error, card_to_show, cards, i_am_chooser, round, chooser, round_winner, game_finished }) => {
          if (!error && !game_finished) {
            setBlackCard(card_to_show);
            setMyTurn(i_am_chooser);
            setThisRound(round);
            setUserThatChooses(chooser);
            setMyCards(cards);
            setSelectedCard(undefined);
            setChosenCards([]);
            setWinnerUser((round_winner && round_winner.username) || '');
          } else {
            if (game_finished) {
              send('finishGame', { room_id: roomId });
            } else {
              alert(error);
            }
          }
        }
      );
    }
  }, [socketAvailable]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (winnerUser !== '') {
      timeout = setTimeout(() => {
        setWinnerUser('');
      }, 2000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [winnerUser]);

  const selectCard = (card: Card, iChoose: boolean) => () => {
    if (!selectedCard && !iChoose) {
      setSelectedCard(card);

      send('chosenCard', { room_id: roomId, chosen_card: card });
    } else if (iChoose && allCardsHaveBeenChosen) {
      send('chosenSelectedWinner', { room_id: roomId, winner_card: card });
    }
  };

  return (
    <ScreenContainer>
      <Game round={thisRound} chooser={userThatChooses} />
      <SpaceContainer horizontal={false}>
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
                : !selectCard || myTurn
                ? translate('GameScreen.waiting')
                : translate('GameScreen.userChoseCard')}
            </ChooseSectionText>
          </ChooseSection>
          {showMessage && (
            <ChooserTextSection>
              <ChooserText>
                {winnerUser !== ''
                  ? translate('GameScreen.winnerUser', { name: winnerUser })
                  : translate('GameScreen.czarWaiting')}
              </ChooserText>
            </ChooserTextSection>
          )}
        </Content>
        <ScrollView style={{ flex: 1 }}>
          {!showMessage && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={dataToShow}
              horizontal={true}
              renderItem={({ item }) => (
                <ChooseCard screenWidth={screenWidth}>
                  {showCard && (
                    <>
                      <ChooseCardText>{item.card}</ChooseCardText>
                      {selectedCard?.card === item.card && !allCardsHaveBeenChosen ? (
                        <ChooseCardButton
                          selected={selectedCard?.card === item.card}
                          onPress={selectCard(item, myTurn)}
                        >
                          <ChooseCardButtonText selected={selectedCard?.card === item.card}>
                            {translate('GameScreen.cardButtonChosen')}
                          </ChooseCardButtonText>
                        </ChooseCardButton>
                      ) : (
                        !showOnlySelected && (
                          <ChooseCardButton
                            selected={selectedCard?.card === item.card}
                            onPress={selectCard(item, myTurn)}
                          >
                            <ChooseCardButtonText selected={selectedCard?.card === item.card}>
                              {translate('GameScreen.cardButtonChoose')}
                            </ChooseCardButtonText>
                          </ChooseCardButton>
                        )
                      )}
                    </>
                  )}
                </ChooseCard>
              )}
              keyExtractor={({ card }) => card}
            />
          )}
        </ScrollView>
      </SpaceContainer>
    </ScreenContainer>
  );
};

export default GameScreen;

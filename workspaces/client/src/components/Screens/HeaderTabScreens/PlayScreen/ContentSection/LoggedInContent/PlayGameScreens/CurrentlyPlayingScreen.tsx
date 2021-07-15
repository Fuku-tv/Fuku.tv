import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import Timer from 'src/components/game/Timer/Timer';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import Controls from '../GameComponents/Controls/Controls';

interface PROPS {
  gameStatus: string;
}
const CurrentlyPlayingScreen: React.FC<PROPS> = ({ gameStatus }) => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();

  return (
    <SlideableContent direction="right" show={gameStatus !== 'gameplay'}>
      <Timer />
    </SlideableContent>
  );
};

export default CurrentlyPlayingScreen;

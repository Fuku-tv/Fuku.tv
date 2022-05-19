import * as React from 'react';
// import {Buttons} from '../../../Buttons';
import { useGameState } from 'src/state/hooks';
import SlideableContent from 'src/components/UIElements/SlideableContent/SlideableContent';
import TransparentGameControls from '../../../VideoFeedSection/TransparentGameControls/TransparentGameControls';

interface PROPS {
  gameStatus: string;
}
const CurrentlyPlayingScreen: React.FC<PROPS> = ({ gameStatus }) => {
  // const old = <Buttons/>;
  const { state, actions } = useGameState();

  return (
    <SlideableContent direction="right" show={state.gameStatus === 'gameplay'}>
      <TransparentGameControls />
    </SlideableContent>
  );
};

export default CurrentlyPlayingScreen;

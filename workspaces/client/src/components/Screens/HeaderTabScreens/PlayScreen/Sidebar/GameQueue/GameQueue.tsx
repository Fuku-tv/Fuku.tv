import * as React from 'react';
import { useGameState, useAuthState } from 'src/state/hooks';
import './GameQueue.scss';

const GameQueue: React.FC = () => {
  const { state, actions } = useGameState();
  const authState = useAuthState();
  const claw = <div className="queue-item__icon">{clawIcon}</div>;

  const twoUsers = (
    <>
      <div id="playing--curently" className="queue-item">
        {claw}
        <div className="title">Now Playing</div>
        <div className="user">Jimmy Oliva</div>
      </div>
      <div className="line hortizontal" />
      <div id="playing--currently" className="queue-item">
        <div className="queue-item__icon">
          <div className="vertical-line" />
        </div>
        <div className="title">Up Next</div>
        <div className="user">Bill Smith</div>
      </div>
    </>
  );

  const emptyQueueLoggedOut = (
    <>
      <div id="coming-soon" className="queue-item">
        <div className="title">Queue Is Empty</div>
      </div>
    </>
  );

  const oneUser = (
    <>
      <div id="playing--curently" className="queue-item">
        <div className="title">Now Playing</div>
        <div className="sub-title">{state.currentlyPlaying}</div>
      </div>
    </>
  );

  const emptyQueueLoggedIn = (
    <>
      <div id="coming-soon" className="queue-item">
        <div className="title">Queue Is Empty</div>
        <div className="sub-title">
          <button className="enter-queue-btn " onClick={() => actions.enterQueue()}>
            Enter Player Queue <span>{roomIcon}</span>
          </button>
        </div>
      </div>
    </>
  );

  const emptyQueue = authState.state.isAuthenticated ? emptyQueueLoggedIn : emptyQueueLoggedOut;

  const comingSoon = (
    <>
      <div id="coming-soon" className="queue-item">
        <div className="title">Feature coming soon!</div>
      </div>
    </>
  );

  return <div className="game-queue-wrapper">{state.currentlyPlaying ? oneUser : emptyQueueLoggedOut}</div>;
};

export default GameQueue;
const clawIcon = (
  <svg id="claw" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 80">
    <path
      d="M294.5,74.5h-68a2,2,0,0,0-2,2v4a10,10,0,0,0,10,10h14v6a2,2,0,0,0,2,2h8v13.23L241,131.16a2,2,0,0,0-.37,2.08l8,20a2,2,0,0,0,1.86,1.26,1.91,1.91,0,0,0,.74-.14,2,2,0,0,0,1.12-2.6l-7.54-18.85,13.68-15.2V152.5a2,2,0,0,0,4,0V117.71l13.68,15.2-7.54,18.85a2,2,0,0,0,1.12,2.6,1.91,1.91,0,0,0,.74.14,2,2,0,0,0,1.86-1.26l8-20a2,2,0,0,0-.37-2.08L262.5,111.73V98.5h8a2,2,0,0,0,2-2v-6h14a10,10,0,0,0,10-10v-4A2,2,0,0,0,294.5,74.5Zm-26,20h-16v-4h16Zm24-14a6,6,0,0,1-6,6h-52a6,6,0,0,1-6-6v-2h64Z"
      transform="translate(-224.5 -74.5)"
    />
  </svg>
);

const roomIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="m218.667969 240h-202.667969c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h202.667969c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
    <path d="m138.667969 320c-4.097657 0-8.191407-1.558594-11.308594-4.691406-6.25-6.253906-6.25-16.386719 0-22.636719l68.695313-68.691406-68.695313-68.671875c-6.25-6.253906-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l80 80c6.25 6.25 6.25 16.382813 0 22.636719l-80 80c-3.136719 3.132812-7.234375 4.691406-11.328125 4.691406zm0 0" />
    <path d="m341.332031 512c-23.53125 0-42.664062-19.136719-42.664062-42.667969v-384c0-18.238281 11.605469-34.515625 28.882812-40.511719l128.171875-42.730468c28.671875-8.789063 56.277344 12.480468 56.277344 40.578125v384c0 18.21875-11.605469 34.472656-28.863281 40.488281l-128.214844 42.753906c-4.671875 1.449219-9 2.089844-13.589844 2.089844zm128-480c-1.386719 0-2.558593.171875-3.816406.554688l-127.636719 42.558593c-4.183594 1.453125-7.210937 5.675781-7.210937 10.21875v384c0 7.277344 7.890625 12.183594 14.484375 10.113281l127.636718-42.558593c4.160157-1.453125 7.210938-5.675781 7.210938-10.21875v-384c0-5.867188-4.777344-10.667969-10.667969-10.667969zm0 0" />
    <path d="m186.667969 106.667969c-8.832031 0-16-7.167969-16-16v-32c0-32.363281 26.300781-58.667969 58.664062-58.667969h240c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16h-240c-14.699219 0-26.664062 11.96875-26.664062 26.667969v32c0 8.832031-7.167969 16-16 16zm0 0" />
    <path d="m314.667969 448h-85.335938c-32.363281 0-58.664062-26.304688-58.664062-58.667969v-32c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v32c0 14.699219 11.964843 26.667969 26.664062 26.667969h85.335938c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
  </svg>
);

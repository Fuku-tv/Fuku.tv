/**
 * Constants for messages between the client UI and Server websocket workspace
 *
 */

// commands sent to/from the player
const PlayerCommand = {
  init: 'init', // first command sent to the player on connect
  control: 'control',
  queue: 'queue',
  dequeue: 'dequeue',
  login: 'login',
  logout: 'logout',
  register: 'register',
  swapvideo: 'swapvideo',
  gamestats: 'gamestats', // viewers, queue count, credits
  gamestandby: 'gamestandby',
  gamestart: 'gamestart',
  gameplay: 'gameplay',
  gameplayend: 'gameplayend',
  gameend: 'gameend',
  prizeget: 'prizeget',
  chatmsg: 'chatmsg',
  chatuserlist: 'chatuserlist',
  chatjoin: 'chatjoin',
  chatpart: 'chatpart'
};

// commands sent to/from the pi
const ControllerCommand = {
  control: 'control',
  buttonstart: 'buttonstart',
  buttonstop: 'buttonstop',
  resetclaw: 'resetclaw',
};

const GameState = {
  idle: 'idle',
  queue: 'queue',
  standby: 'standby',
  playing: 'playing',
  ending: 'ending',
  recharge: 'recharge',
};

const Video = {
  front: 'front',
  side: 'side',
};

const VideoState = {
  active: 'active',
  inactive: 'inactive'
};

const Button = {
  queue: 'queue',
  start: 'start',
  stop: 'stop',
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  drop: 'drop',
};

const Action = {
  start: 'start',
  stop: 'stop',
};

const RedisChat = {
  chatusers: 'chatusers',
  chatmsgs: 'chatmsgs',
};

export default {
  PlayerCommand,
  ControllerCommand,
  GameState,
  Video,
  VideoState,
  Button,
  Action,
};

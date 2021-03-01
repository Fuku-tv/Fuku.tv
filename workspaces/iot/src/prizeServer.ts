import { LogLevel, LoggerClass, ConfigManager } from 'fuku.tv-shared';
import Mfrc from 'mfrc522-rpi';
import SoftSPI from 'rpi-softspi';
import crypto from 'crypto';

const softspi = new SoftSPI({
  clock: 23,
  mosi: 19,
  miso: 21,
  client: 24
});

const mfrc = new Mfrc(softspi).setResetPin(22);

// authorization/decryption key
const key = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];

// blocks that are safe to write to
const safeblocks = [1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 21, 22, 24, 25, 26, 28, 29, 30, 32, 33, 34, 36, 37, 38, 40, 41, 42, 44, 45, 46, 48, 49, 50, 52, 53, 54, 56, 57, 58, 60, 61, 62];

let uid = []; // internal card identifier
let cardid = []; // id we write to the card

function ath(arr: number[]) {
  var text = '';
  for (var i = 0; i < arr.length; i++) {
    text += arr[i].toString(16);
    text += ' ';
  }
  return text;
}

function checkValidBlock(block: number) {
  if (block < 0 || block >= safeblocks.length) {
    console.log('Invalid block');
    return false;
  }
  return true;
}

function authenticate(block: number) {
  if (!mfrc.authenticate(safeblocks[block], key, uid)) {
    console.log('Authentication failure.');
    return false;
  }
  return true;
}

// zero out a block
function zero(block: number) {
  if (!checkValidBlock(block)) return;
  if (!authenticate(block)) return;

  var data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
  mfrc.writeDataToBlock(safeblocks[block], data);
  if (!authenticate(block)) {
    console.log('Post-write authentication failure. Is tag damaged?');
    return;
  }

  var readdata = mfrc.getDataForBlock(safeblocks[block]);

  for (var i = 0; i < readdata.length; i++) {
    if (readdata[i] !== data[i]) {
      console.log('Read error.');
      console.log('Read: %s', ath(readdata));
      console.log('Expected: %s', ath(data));
      console.log('Is tag damaged?');
      return;
    }
  }
  return;
}

function write(block: number, data: number[]) {
  if (data.length > 16) {
    console.log('Data too long');
    return;
  }
  if (!checkValidBlock(block)) return;
  if (!authenticate(block)) return;
  mfrc.writeDataToBlock(safeblocks[block], data);
  return;
}

function read(block) {
  if (!checkValidBlock(block)) return;
  if (!authenticate(block)) return;
  return mfrc.getDataForBlock(safeblocks[block]);
}

// this is the actual main loop, isn't this fantastic?
setInterval(() => {
  mfrc.reset();
  var response = mfrc.findCard();
  if (!response.status) {
    // no card found
    // this isn't an error
    cardid = [];
    return;
  }
  var bitSize = response.bitSize;

  response = mfrc.getUid();
  if (!response.status) {
    // could not decode uid
    // usually because tag was off center or moved too far away after found
    // Also happens when too much RF interference
    return;
  }

  uid = response.data;

  var memoryCapacity = mfrc.selectCard(uid);
  var tempid = read(0);
  var prizedata = read(1);

  // new read from previous
  // TODO: figure out how to handle multiple prizes stuck on the pad
  if (tempid.length !== cardid.length || tempid.every((v, i) => v !== cardid[i])) {
    cardid = tempid
    console.log('New card read');
    console.log('Bit size: ' + bitSize);
    console.log('UID: %s %s %s %s',
    uid[0].toString(16), uid[1].toString(16), 
    uid[2].toString(16), uid[3].toString(16));
    console.log('Memory capacity: ' + memoryCapacity);
    
    console.log('Block 1 (ID): %s', ath(cardid));
    console.log('Block 2 (Prize Data); %s', ath(prizedata));
  }

  mfrc.stopCrypto();
}, 250);

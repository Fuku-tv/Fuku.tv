import { redisSubscriber } from '../index';
import { QUEUE_SUBSCRIBE, QUEUE_PUBLISH } from './const';

const queueSubscriber = {
  /**
   * Subscribe to the queue cache
   */
  subscribe(): void {
    redisSubscriber.subscribe(QUEUE_SUBSCRIBE);
  },

  onConnect(callback: () => void): void {
    redisSubscriber.on('connect', callback);
  },

  /**
   * OnMessage event for the queue subscriber
   * @param callback  callback function
   */
  onMessage(callback: (data: any) => void): void {
    redisSubscriber.on('message', (channel, data) => {
      if (channel !== QUEUE_PUBLISH) return;
      callback(data);
    });
  },
};

export default queueSubscriber;

import { redisPublisher } from '../index';
import { QUEUE_PUBLISH } from './const';

const queuePublisher = {
  onConnect(callback: () => void): void {
    redisPublisher.on('message', callback);
  },

  publish(data: any): void {
    redisPublisher.publish(QUEUE_PUBLISH, data);
  },
};

export default queuePublisher;

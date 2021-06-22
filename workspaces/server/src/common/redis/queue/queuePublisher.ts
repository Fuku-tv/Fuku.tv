import { redisPublisher } from '../index';
import { QUEUE_PUBLISH } from './const';

const queuePublisher = {
  onConnect(callback: () => void): void {
    redisPublisher.on('message', callback);
  },

  publish(data: any): void {
    redisPublisher.publish(QUEUE_PUBLISH, data);
  },

  async getQueue(): Promise<string> {
    return new Promise<string>((resovle, reject) => {
      redisPublisher.get(QUEUE_PUBLISH, (err: Error, reply: string) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resovle(reply);
      });
    });
  },
  async setQueue(data: any): Promise<string> {
    return new Promise<string>((resovle, reject) => {
      redisPublisher.set(QUEUE_PUBLISH, data, (err: Error, reply: string) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resovle(reply);
      });
    });
  },
};

export default queuePublisher;

import cors from 'cors';
import express from 'express';

import https from 'https';

import { Server } from 'socket.io';

export default class WebRtcServer {
  server: https.Server;

  io: Server;

  /**
   * broadcaster socket id
   */
  broadcaster: string;

  // create a new WebRTC server with pfx certificate
  constructor(pfxCredentials: https.ServerOptions) {
    this.server = https.createServer(pfxCredentials, express().use(cors()));
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
      },
    });
  }

  async run(port: number): Promise<void> {
    this.server.listen(port);
    this.io.sockets.on('error', (e) => console.log(e));
    this.io.sockets.on('connection', (socket) => {
      socket.on('broadcaster', () => {
        this.broadcaster = socket.id;
        socket.broadcast.emit('broadcaster');
      });
      socket.on('watcher', () => {
        socket.to(this.broadcaster).emit('watcher', socket.id);
      });
      socket.on('offer', (id, message) => {
        socket.to(id).emit('offer', socket.id, message);
      });
      socket.on('answer', (id, message) => {
        socket.to(id).emit('answer', socket.id, message);
      });
      socket.on('candidate', (id, message) => {
        socket.to(id).emit('candidate', socket.id, message);
      });
      socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
        socket.to(this.broadcaster).emit('disconnectPeer', socket.id);
      });
    });
  }
}

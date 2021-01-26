declare module 'h264-live-player' {
  export default class WSAvcPLayer {
    constructor(canvas: HTMLElement, protocol: string);

    running: boolean;

    sendMessage(message: string): void;

    connect(uri: string): void;

    disconnect(): void;

    decode(data: unknown): void;

    initCanvas(width: number, height: number): void;
  }
}

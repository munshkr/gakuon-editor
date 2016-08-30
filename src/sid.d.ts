declare module 'sid' {
  export
  interface PlayerOptions {
    clock: string;
    model: string;
    sample?: string;
  }

  export
  interface Synth {}

  export
  class ReSID implements Synth {}

  export
  class Player {
    constructor(synthClass: Synth, opts?: PlayerOptions);
    loadURL(url: string, callback: any): void;
    loadData(data: string): void;
    play(): void;
    stop(): void;
    changeTrack(track: number): void;
    nextTrack(): void;
    prevTrack(): void;
    getSidFile(): SIDFile;
    getTrack(): number;
    getTracks(): number;

    private _audioprocess(e: any);
    private _getNextFrame(): void;
    private _generateIntoBuffer(samples: number, data: number[], dataOffset: number): number;
  }

  export
  class SIDFile {
    constructor(data: string);
    infostring(): string;
    getCurrentSong(): number;
    getSubsongs(): number;

    private _loadFileFromData(data: string);
  }

  /*
  export
  class Stream {
    constructor(data: string);
    seek(newpos: number): void;
    read(length: number): string;
    readInt32(): string;
    readInt16(): string;
    readInt8(signed: boolean): string;
    eof(): boolean;
    readVarInt(): number;
    static loadRemoteFile(path: string, callback: function(data: string): void);
    static Base64Decode(input: string): string;
  }
  */
}

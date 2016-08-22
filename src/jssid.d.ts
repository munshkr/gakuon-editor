declare module "jssid" {
  export
  function playSID(sidurl: string, subtune: number): void;

  export
  class jsSID {
    author: string;
    sourcecode: string;
    version: string;
    year: string;

    constructor(bufferlen: number, background_noise: number);

    /* Methods */
    loadstart(sidurl: string, subt: number): void;
    loadinit(sidurl: string, subt: number): void;
    loadinitdata(data: Uint8Array, subt: number): void;
    start(subt: number): void;
    playcont(): void;
    pause(): void;
    stop(): void;

    /* Getters */
    gettitle(): string;
    getauthor(): string;
    getinfo(): string;
    getsubtunes(): number;
    getprefmodel(): string;
    getmodel(): string;
    getoutput(): number;
    getplaytime(): number;

    /* Setters */
    setmodel(model: string): void;
    setvolume(vol: number): void;
    setloadcallback(fname: any): void;
    setstartcallback(fname: any): void;
    setendcallback(fname: any, seconds: number): void;
  }
}

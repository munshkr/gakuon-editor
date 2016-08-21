declare module "jssid" {
  export
  function playSID(sidurl: string, subtune: number): void;

  export
  function jsSID(bufferlen: number, background_noise: number): any;
}

declare module "6502asm" {
  export interface AssemblerOptions {
    debug?: boolean;
  }

  export interface AssemblerOutput {
    objectCode: number[];
    symbolTable: any;
  }

  export class Assembler {
    constructor(options?: AssemblerOptions);
    assemble(source: string): AssemblerOutput;
  }
}

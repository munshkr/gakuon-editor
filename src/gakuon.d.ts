declare module "gakuon" {
  export class Parser {
    parse(mmlString: string): any
  }

  export class Document {
    constructor(source: string);

    directives: any[];
    commands: any[];
    initialState: any;
    AST: any;
  }

  export interface CodeGeneratorOptions {
    debug?: boolean;
    player?: boolean;
  }

  export class CodeGenerator {
    constructor(document: string, options: CodeGeneratorOptions);

    generate(): string;
  }

  export interface CompilerOptions extends CodeGeneratorOptions {
    debug?: boolean;
    player?: boolean;
  }

  export class Compiler {
    constructor(options?: CompilerOptions);

    compile(source: string): string;
  }
}

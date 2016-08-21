'use script';

import {
  Menu,
  MenuBar,
  MenuItem
} from 'phosphor-menus';

import {
  Panel
} from 'phosphor-panel';

import {
  Widget
} from 'phosphor-widget';

import {
  DocumentPanel
} from '../document';

import {
  AppPanel
} from './panel';

import {
  Compiler
} from 'gakuon';

import {
  Assembler
} from '6502asm';

export * from './panel';


export
class App {
  /**
   * Construct a new App instance and attach to document.body
   */
  constructor() {
    this._menuBar = Private.createMenuBar(this);
    this._panel = Private.createPanel(this);

    // attach menu and panel to HTML body
    this._menuBar.attach(document.body);
    this._panel.attach(document.body);

    this._compiler = new Compiler();
    this._assembler =  new Assembler();

    window.onresize = () => this._panel.update();
  }

  /**
   * Get dock panel
   */
  get panel(): AppPanel {
    return this._panel;
  }

  /**
   * Get current document
   */
  get currentDocument(): DocumentPanel {
    return this._panel.documentPanel.currentWidget as DocumentPanel;
  }

  /**
   * Set current document
   */
  set currentDocument(doc: DocumentPanel) {
    this._panel.documentPanel.currentWidget = doc;
  }

  /**
   * Compile current document and export to .sid
   */
  exportSID() {
    let source = this.currentDocument.editor.content;
    let asm = Util.bench('compile', () => this._compiler.compile(source));
    let {objectCode} = Util.bench('assemble', () => this._assembler.assemble(asm));
    console.log(objectCode);
  }

  /**
   * Compile current document and export assembly code
   */
  exportASM() {
    let source = this.currentDocument.editor.content;
    let asm = Util.bench('compile', () => this._compiler.compile(source));
    console.log(asm);
  }

  /**
   * Compile current document and export player program
   */
  exportPlayer() {
    let source = this.currentDocument.editor.content;
    let asm = Util.bench('compile', () => {
      let compiler = new Compiler({ player: true });
      return compiler.compile(source);
    });
    let {objectCode} = Util.bench('assemble', () => this._assembler.assemble(asm));
    console.log(objectCode);
  }

  private _menuBar: MenuBar;
  private _panel: AppPanel;
  private _currentDocument: DocumentPanel;
  private _compiler: Compiler;
  private _assembler: Assembler;
}


/**
 * The namespace for the `App` class private data
 */
namespace Private {
  export
  function createPanel(app: App): AppPanel {
    return new AppPanel(app);
  }

  export
  function createMenuBar(app: App): MenuBar {
    let fileMenu = new Menu([
      new MenuItem({
        text: 'New',
        shortcut: 'Ctrl+N',
        handler: () => newFile(app)
      }),
      new MenuItem({
        text: 'Open',
        shortcut: 'Ctrl+O',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Save',
        shortcut: 'Ctrl+S',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Save As...',
        shortcut: 'Ctrl+Shift+S',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        type: MenuItem.Separator
      }),
      new MenuItem({
        text: 'Export SID file',
        handler: () => app.exportSID()
      }),
      new MenuItem({
        text: 'Export to...',
        submenu: new Menu([
          new MenuItem({
            text: 'Assembly code (.asm)',
            handler: () => app.exportASM()
          }),
          new MenuItem({
            text: 'Player program (.prg)',
            handler: () => app.exportPlayer()
          })
        ])
      }),
      new MenuItem({
        type: MenuItem.Separator
      }),
      new MenuItem({
        text: 'Close',
        shortcut: 'Ctrl+W',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Close All',
        handler: logHandler,
        disabled: true
      })
    ]);

    let editMenu = new Menu([
      new MenuItem({
        text: '&Undo',
        icon: 'fa fa-undo',
        shortcut: 'Ctrl+Z',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: '&Repeat',
        icon: 'fa fa-repeat',
        shortcut: 'Ctrl+Y',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        type: MenuItem.Separator
      }),
      new MenuItem({
        text: '&Copy',
        icon: 'fa fa-copy',
        shortcut: 'Ctrl+C',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Cu&t',
        icon: 'fa fa-cut',
        shortcut: 'Ctrl+X',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: '&Paste',
        icon: 'fa fa-paste',
        shortcut: 'Ctrl+V',
        handler: logHandler,
        disabled: true
      })
    ]);

    let findMenu = new Menu([
      new MenuItem({
        text: 'Find...',
        shortcut: 'Ctrl+F',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Find Next',
        shortcut: 'F3',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Find Previous',
        shortcut: 'Shift+F3',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        type: MenuItem.Separator
      }),
      new MenuItem({
        text: 'Replace...',
        shortcut: 'Ctrl+H',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'Replace Next',
        shortcut: 'Ctrl+Shift+H',
        handler: logHandler,
        disabled: true
      })
    ]);

    let viewMenu = new Menu([
      new MenuItem({
        type: MenuItem.Check,
        text: 'Piano Roll',
        handler: (item) => viewPianoRoll(item, app)
      }),
      new MenuItem({
        type: MenuItem.Check,
        text: 'Instrument Editor',
        handler: (item) => viewInstrumentEditor(item, app)
      }),
      new MenuItem({
        type: MenuItem.Check,
        text: 'Oscilloscope',
        handler: (item) => viewOscilloscope(item, app)
      })
    ]);

    let helpMenu = new Menu([
      new MenuItem({
        text: 'Documentation',
        handler: logHandler,
        disabled: true
      }),
      new MenuItem({
        text: 'About',
        handler: logHandler,
        disabled: true
      })
    ]);

    return new MenuBar([
      new MenuItem({
        text: 'File',
        submenu: fileMenu
      }),
      new MenuItem({
        text: 'Edit',
        submenu: editMenu
      }),
      new MenuItem({
        text: 'Find',
        submenu: findMenu
      }),
      new MenuItem({
        text: 'View',
        submenu: viewMenu
      }),
      new MenuItem({
        type: MenuItem.Separator
      }),
      new MenuItem({
        text: 'Help',
        submenu: helpMenu
      })
    ]);
  }

  /**
   * A handler which logs the item text to the log span.
   */
  function logHandler(item: MenuItem): void {
    console.log(item.text);
  }

  /**
   * Create a new file tab
   */
  function newFile(app: App): void {
    let doc = new DocumentPanel();
    app.panel.documentPanel.addChild(doc);
    app.currentDocument = doc;
  }

  /**
   * Toggle Piano Roll panel widget
   */
  function viewPianoRoll(item: MenuItem, app: App): void {
    // TODO: Show/hide panel
    let panel = createPlaceholder('Piano Roll', 'green');
    app.panel.sidePanel.insertRight(panel);
  }

  /**
   * Toggle Instrument Editor panel widget
   */
  function viewInstrumentEditor(item: MenuItem, app: App): void {
    // TODO: Show/hide panel
    let panel = createPlaceholder('Instrument Editor', 'red');
    app.panel.sidePanel.insertRight(panel);
  }

  /**
   * Toggle Oscilloscope panel widget
   */
  function viewOscilloscope(item: MenuItem, app: App): void {
    // TODO: Show/hide panel
    let panel = createPlaceholder('Oscilloscope', 'blue');
    app.panel.sidePanel.insertRight(panel);
  }

  /**
   * Create a placeholder content widget.
   */
  function createPlaceholder(title: string, color: string): Widget {
    let widget = new Widget();
    widget.addClass('content');
    widget.addClass(color);

    widget.title.text = title;
    widget.title.closable = true;

    return widget;
  }
}

namespace Util {
  /**
   * Figure out how long it takes for a method to execute.
   *
   * @param {Function} method to test
   * @param {number} iterations number of executions.
   * @param {Array} args to pass in.
   * @param {T} context the context to call the method in.
   * @return {number} the time it took, in milliseconds to execute.
   */
  export
  function bench(name: string, callback: any): any {
    let time = 0;
    let timer = (action: string) => {
      let d = Date.now();
      if (time < 1 || action === 'start') {
        time = d;
        return 0;
      } else if (action === 'stop') {
        let t = d - time;
        time = 0;
        return t;
      } else {
        return d - time;
      }
    };

    let result: any;
    timer('start');
    result = callback.apply(this);
    let execTime = timer('stop');

    console.log(`[bench] ${name} took ${execTime}ms`);

    return result;
  };
}

'use strict';

import { Menu, MenuBar, MenuItem } from 'phosphor-menus';
import { DockPanel } from 'phosphor-dockpanel';
import { Message } from 'phosphor-messaging';
import { Widget } from 'phosphor-widget';

import { DocumentEditor } from '../src/document_editor';
import { DocumentToolbar, ToolbarButton } from '../src/document_toolbar';

import { Parser } from 'gakuon';


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


/**
 * A handler which logs the item text to the log span.
 */
function logHandler(item: MenuItem): void {
  console.log(item.text);
}


/**
 * Create the example menu bar.
 */
function createMenuBar(): MenuBar {
  let fileMenu = new Menu([
    new MenuItem({
      text: 'New File',
      shortcut: 'Ctrl+N',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Open File',
      shortcut: 'Ctrl+O',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Save File',
      shortcut: 'Ctrl+S',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Save As...',
      shortcut: 'Ctrl+Shift+S',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Close File',
      shortcut: 'Ctrl+W',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Close All',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'More...',
      submenu: new Menu([
        new MenuItem({
          text: 'One',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Two',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Three',
          handler: logHandler
        }),
        new MenuItem({
          text: 'Four',
          handler: logHandler
        })
      ])
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Exit',
      handler: logHandler
    })
  ]);

  let editMenu = new Menu([
    new MenuItem({
      text: '&Undo',
      icon: 'fa fa-undo',
      shortcut: 'Ctrl+Z',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Repeat',
      icon: 'fa fa-repeat',
      shortcut: 'Ctrl+Y',
      disabled: true
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: '&Copy',
      icon: 'fa fa-copy',
      shortcut: 'Ctrl+C',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Cu&t',
      icon: 'fa fa-cut',
      shortcut: 'Ctrl+X',
      handler: logHandler
    }),
    new MenuItem({
      text: '&Paste',
      icon: 'fa fa-paste',
      shortcut: 'Ctrl+V',
      handler: logHandler
    })
  ]);

  let findMenu = new Menu([
    new MenuItem({
      text: 'Find...',
      shortcut: 'Ctrl+F',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Find Next',
      shortcut: 'F3',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Find Previous',
      shortcut: 'Shift+F3',
      handler: logHandler
    }),
    new MenuItem({
      type: MenuItem.Separator
    }),
    new MenuItem({
      text: 'Replace...',
      shortcut: 'Ctrl+H',
      handler: logHandler
    }),
    new MenuItem({
      text: 'Replace Next',
      shortcut: 'Ctrl+Shift+H',
      handler: logHandler
    })
  ]);

  let helpMenu = new Menu([
    new MenuItem({
      text: 'Documentation',
      handler: logHandler
    }),
    new MenuItem({
      text: 'About',
      handler: logHandler
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
      type: MenuItem.Submenu
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

function createPlayButton() {
  return new ToolbarButton({
    className: 'fa fa-play',
    tooltip: 'Play song',
    onClick: () => alert('not implemented')
   });
}

function createStopButton() {
  return new ToolbarButton({
    className: 'fa fa-stop',
    tooltip: 'Stop song',
    onClick: () => alert('not implemented')
   });
}


/**
 * The main application entry point.
 */
function main(): void {
  let panel = new DockPanel();
  panel.id = 'main';

  let oscWidget = createPlaceholder('Oscilloscope', 'blue');
  let contextWidget = createPlaceholder('Context', 'red');
  let pianoRollWidget = createPlaceholder('Piano Roll', 'green');

  let docEditor = new DocumentEditor();

  panel.insertRight(docEditor);
  panel.insertRight(oscWidget, docEditor);
  panel.insertBottom(contextWidget, oscWidget);
  panel.insertBottom(pianoRollWidget);

  let menuBar = createMenuBar();

  let tb = new DocumentToolbar();
  tb.add('Play', createPlayButton());
  tb.add('Stop', createStopButton());
  panel.insertRight(tb);

  // attach menu and panel to HTML body
  menuBar.attach(document.body);
  panel.attach(document.body);

  window.onresize = () => { panel.update(); };
}

window.onload = main;

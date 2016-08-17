/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  DockPanel
} from 'phosphor-dockpanel';

import {
  Message
} from 'phosphor-messaging';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

import '../src/index.css';


/**
 * A widget which hosts a CodeMirror editor.
 */
class AceWidget extends Widget {

  constructor() {
    super();
    this.addClass('AceWidget');
    this._editor = ace.edit(this.node);
  }

  get editor(): AceAjax.Editor {
    return this._editor;
  }

  loadTarget(target: string): void {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', target);
    xhr.onreadystatechange = () => this._editor.setValue(xhr.responseText);
    xhr.send();
  }

  protected onResize(msg: ResizeMessage): void {
    this._editor.resize();
  }

  private _editor: AceAjax.Editor;
}


/**
 * Create a placeholder content widget.
 */
function createContent(title: string): Widget {
  let widget = new Widget();
  widget.addClass('content');
  widget.addClass(title.toLowerCase());

  widget.title.text = title;
  widget.title.closable = true;

  return widget;
}


/**
 * The main application entry point.
 */
function main(): void {
  let r1 = createContent('Red');
  let r2 = createContent('Red');
  let r3 = createContent('Red');

  let b1 = createContent('Blue');
  let b2 = createContent('Blue');

  let g1 = createContent('Green');
  let g2 = createContent('Green');
  let g3 = createContent('Green');

  let y1 = createContent('Yellow');
  let y2 = createContent('Yellow');

  let panel = new DockPanel();
  panel.id = 'main';

  let cmSource = new AceWidget();
  cmSource.loadTarget('./bundle.js');
  cmSource.title.text = 'Source';

  panel.insertLeft(cmSource);
  panel.insertLeft(b1, cmSource);

  panel.insertBottom(y1, b1);
  panel.insertLeft(g1, y1);

  panel.insertBottom(b2);

  panel.insertTabBefore(g2, b2);
  panel.insertTabBefore(y2, g2);
  panel.insertTabBefore(g3, y2);
  panel.insertTabBefore(r2, b1);
  panel.insertTabBefore(r3, y1);

  panel.attach(document.body);

  window.onresize = () => { panel.update(); };
}


window.onload = main;

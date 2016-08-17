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
    var xhr = new XMLHttpRequest();
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
  var widget = new Widget();
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
  var r1 = createContent('Red');
  var r2 = createContent('Red');
  var r3 = createContent('Red');

  var b1 = createContent('Blue');
  var b2 = createContent('Blue');

  var g1 = createContent('Green');
  var g2 = createContent('Green');
  var g3 = createContent('Green');

  var y1 = createContent('Yellow');
  var y2 = createContent('Yellow');

  var panel = new DockPanel();
  panel.id = 'main';

  var cmSource = new AceWidget();
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

  window.onresize = () => { panel.update() };
}


window.onload = main;

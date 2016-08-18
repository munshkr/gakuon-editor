'use strict';

import { DockPanel } from 'phosphor-dockpanel';
import { Message } from 'phosphor-messaging';
import { Widget } from 'phosphor-widget';

import { AceWidget } from '../src/ace_widget';

import { Parser } from 'gakuon';

import '../src/index.css';


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
 * The main application entry point.
 */
function main(): void {
  let oscWidget = createPlaceholder('Oscilloscope', 'blue');
  let contextWidget = createPlaceholder('Context', 'red');
  let pianoRollWidget = createPlaceholder('Piano Roll', 'green');

  let panel = new DockPanel();
  panel.id = 'main';

  // temporal
  (<any>window).panel = panel;

  let docWidget = new AceWidget();
  docWidget.title.text = 'Untitled';
  //docWidget.editor.setTheme('ace/theme/solarized_dark');
  docWidget.editor.setOptions({
    fontSize: '11pt'
  });

  panel.insertRight(docWidget);
  panel.insertRight(oscWidget, docWidget);
  panel.insertBottom(contextWidget, oscWidget);
  panel.insertBottom(pianoRollWidget);

  panel.attach(document.body);

  window.onresize = () => { panel.update(); };
}

window.onload = main;

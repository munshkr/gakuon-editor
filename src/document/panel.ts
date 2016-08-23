'use strict';

import {
  Widget
} from 'phosphor-widget';

import {
  BoxLayout
} from 'phosphor-boxpanel';

import {
  DocumentEditor
} from './editor';

import {
  DocumentToolbar,
} from './toolbar';

import {
  ToolbarButton
} from '../toolbar';

const DOC_PANEL = 'DocumentPanel';

const DEFAULT_TITLE = '[Untitled]';

/**
 * Panel that contains the Document Editor and a Toolbar
 */
export
class DocumentPanel extends Widget {
  /**
   * Construct a new Document panel
   */
  constructor() {
    super();

    this.addClass(DOC_PANEL);
    this.title.text = DEFAULT_TITLE;
    this.title.closable = true;

    this._toolbar = Private.createToolbar();
    this._editor = new DocumentEditor();

    let layout = new BoxLayout();
    layout.direction = BoxLayout.TopToBottom;
    layout.spacing = 0;

    BoxLayout.setStretch(this._toolbar, 0);
    BoxLayout.setStretch(this._editor, 1);

    layout.addChild(this._toolbar);
    layout.addChild(this._editor);

    this.layout = layout;
  }

  /**
   * Get the toolbar used by this widget
   */
  get toolbar(): DocumentToolbar {
    return this._toolbar;
  }

  /**
   * Get the document editor used by this widget
   */
  get editor(): DocumentEditor {
    return this._editor;
  }

  /**
   * Dispose of the resources used by the widget
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._editor = null;
    this._toolbar = null;
    super.dispose();
  }

  private _toolbar: DocumentToolbar = null;
  private _editor: DocumentEditor = null;
}

/**
 * The namespace for the `DocumentPanel` class private data
 */
namespace Private {
  export
  function createToolbar(): DocumentToolbar {
    let tb = new DocumentToolbar();

    tb.add('Play', createPlayButton());
    tb.add('Stop', createStopButton());

    return tb;
  }

  function createPlayButton(): ToolbarButton {
    return new ToolbarButton({
      className: 'fa fa-play',
      tooltip: 'Play song',
      onClick: play
    });
  }

  function createStopButton(): ToolbarButton {
    return new ToolbarButton({
      className: 'fa fa-stop',
      tooltip: 'Stop song',
      onClick: stop
    });
  }

  function play(): void {
    (<any>window).app.play();
  }

  function stop(): void {
    (<any>window).app.stop();
  }
}

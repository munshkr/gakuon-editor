'use strict';

import {
  Panel
} from 'phosphor-panel';

import {
  DocumentEditor
} from './editor';

import {
  DocumentToolbar,
  ToolbarButton
} from './toolbar';

/**
 * Panel that contains the Document Editor and a Toolbar
 */
export
class DocumentPanel extends Panel {

  toolbar: DocumentToolbar;
  editor:  DocumentEditor;

  constructor() {
    super();

    this.title.text = '[Untitled]';

    this.editor = new DocumentEditor();
    this.toolbar = this._createToolbar();

    this.addChild(this.toolbar);
    this.addChild(this.editor);
  }

  private _createToolbar(): DocumentToolbar {
    let tb = new DocumentToolbar();

    tb.add('Play', this._createPlayButton());
    tb.add('Stop', this._createStopButton());

    return tb;
  }

  private _createPlayButton(): ToolbarButton {
    return new ToolbarButton({
      className: 'fa fa-play',
      tooltip: 'Play song',
      onClick: () => alert('not implemented')
    });
  }

  private _createStopButton(): ToolbarButton {
    return new ToolbarButton({
      className: 'fa fa-stop',
      tooltip: 'Stop song',
      onClick: () => alert('not implemented')
    });
  }
}

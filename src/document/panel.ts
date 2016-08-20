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

    this.addClass('DocumentPanel');
    this.title.text = '[Untitled]';

    this.editor = new DocumentEditor();
    this.toolbar = DocumentPanelPrivate.createToolbar();

    this.addChild(this.toolbar);
    this.addChild(this.editor);
  }

}

/**
 * The namespace for the `DocumentPanel` class private data
 */
namespace DocumentPanelPrivate {
  export
  function createToolbar(): DocumentToolbar {
    let tb = new DocumentToolbar();

    tb.add('Play', createPlayButton());
    tb.add('Stop', createStopButton());

    return tb;
  }

  export
  function createPlayButton(): ToolbarButton {
    return new ToolbarButton({
      className: 'fa fa-play',
      tooltip: 'Play song',
      onClick: () => alert('not implemented')
    });
  }

  export
  function createStopButton(): ToolbarButton {
    return new ToolbarButton({
      className: 'fa fa-stop',
      tooltip: 'Stop song',
      onClick: () => alert('not implemented')
    });
  }
}

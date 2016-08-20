'use strict';

import { AceWidget } from '../src/ace_widget';

/**
 * Widget for the MML Document editor
 */
export
class DocumentEditor extends AceWidget {

  constructor() {
    super();

    this.addClass('DocumentEditor');
    this.title.text = '[Untitled]';
    this.editor.setOptions({
      fontSize: '11pt'
    });
  }
}

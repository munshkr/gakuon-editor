'use strict';

import {
  AceWidget
} from '../ace_widget';

/**
 * Widget for the MML Document editor
 */
export
class DocumentEditor extends AceWidget {

  constructor() {
    super();
    this.addClass('DocumentEditor');
    this.editor.setOptions({
      fontSize: '11pt'
    });
  }
}

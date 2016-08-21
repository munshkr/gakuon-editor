'use strict';

import {
  AceWidget
} from '../acewidget';

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

  get content(): string {
    return this.editor.getValue();
  }

  onFocus() {
    console.log('focus');
  }
}

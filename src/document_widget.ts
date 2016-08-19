'use strict';

import { AceWidget } from '../src/ace_widget';

/**
 * Widget for the MML Document editor
 */
export
class DocumentWidget extends AceWidget {

  constructor() {
    super();
    this.addClass('DocumentWidget');
    this.title.text = 'Untitled';
    this.editor.setOptions({
      fontSize: '11pt'
    });
    // this._editor.setTheme('ace/theme/solarized_dark');
  }
}

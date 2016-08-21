'use strict';

import {
  Widget
} from 'phosphor-widget';

export
class PianoRoll extends Widget {
  /**
   * Constructs a Piano Roll widget
   */
  constructor() {
    super();
    this.addClass('PianoRoll');
    this.title.text = 'Piano Roll';
    this.title.closable = true;
  }
}

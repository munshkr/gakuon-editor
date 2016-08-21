'use strict';

import {
  Widget
} from 'phosphor-widget';

export
class InstrumentEditor extends Widget {
  /**
   * Constructs an Instrument Editor widget
   */
  constructor() {
    super();
    this.addClass('InstrumentEditor');
    this.title.text = 'Instrument Editor';
    this.title.closable = true;
  }
}

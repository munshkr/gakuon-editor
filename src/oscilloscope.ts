'use strict';

import {
  Widget
} from 'phosphor-widget';

export
class Oscilloscope extends Widget {
  /**
   * Constructs an Oscilloscope widget
   */
  constructor() {
    super();
    this.addClass('Oscilloscope');
    this.title.text = 'Oscilloscope';
    this.title.closable = true;
  }
}

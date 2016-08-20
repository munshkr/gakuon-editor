'use strict';

import {
  Toolbar
} from '../toolbar';

/**
 * The class name added to document toolbars.
 */
const DOC_TOOLBAR = 'DocumentToolbar';


/**
 * A class which provides a document toolbar widget.
 */
export
class DocumentToolbar extends Toolbar {
  /**
   * Construct a new toolbar widget.
   */
  constructor() {
    super();
    this.addClass(DOC_TOOLBAR);
  }
}

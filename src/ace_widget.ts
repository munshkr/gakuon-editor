'use strict';

import {
  ResizeMessage, Widget
} from 'phosphor-widget';

/**
 * A widget which hosts a Ace text editor.
 */
export
class AceWidget extends Widget {

  constructor() {
    super();
    this.addClass('AceWidget');
    this._editor = ace.edit(this.node);
    this._editor.$blockScrolling = Infinity;
  }

  get editor(): AceAjax.Editor {
    return this._editor;
  }

  loadTarget(target: string): void {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', target);
    xhr.onreadystatechange = () => this._editor.setValue(xhr.responseText);
    xhr.send();
  }

  protected onResize(msg: ResizeMessage): void {
    this._editor.resize();
  }

  private _editor: AceAjax.Editor;
}

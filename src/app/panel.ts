'use script';

import {
  SplitPanel
} from 'phosphor-splitpanel';

import {
  TabPanel
} from 'phosphor-tabs';

import {
  DockPanel
} from 'phosphor-dockpanel';

import {
  Widget
} from 'phosphor-widget';

import {
  DocumentPanel
} from '../document';

import {
  App
} from './index';

const PANEL_ID = 'main';


export
class AppPanel extends SplitPanel {
  /**
   * Construct a new App Panel that contains documents and docking panels
   */
  constructor(app: App) {
    super();

    let docPanel = Private.createDocumentTabPanel(app);
    let sidePanel = Private.createSidePanel(app);

    SplitPanel.setStretch(docPanel, 0);
    SplitPanel.setStretch(sidePanel, 2);

    this.id = PANEL_ID;
    this.orientation = SplitPanel.Horizontal;
    this.addChild(docPanel);
    this.addChild(sidePanel);

    this._documentPanel = docPanel;
    this._sidePanel = sidePanel;
  }

  /**
   * Get the documents tab panel
   */
  get documentPanel(): TabPanel {
    return this._documentPanel;
  }

  /**
   * Get the side docking panel
   */
  get sidePanel(): DockPanel {
    return this._sidePanel;
  }

  private _documentPanel: TabPanel;
  private _sidePanel: DockPanel;
}


/**
 * The namespace for the `AppPanel` class private data
 */
namespace Private {
  export
  function createDocumentTabPanel(app: App): TabPanel {
    let panel = new TabPanel();
    panel.tabsMovable = true;

    let docPanel = new DocumentPanel();
    panel.addChild(docPanel);

    return panel;
  }

  export
  function createSidePanel(app: App): DockPanel {
    let panel = new DockPanel();

    let oscWidget = createPlaceholder('Oscilloscope', 'blue');
    let contextWidget = createPlaceholder('Context', 'red');
    let pianoRollWidget = createPlaceholder('Piano Roll', 'green');

    panel.insertRight(oscWidget);
    panel.insertRight(contextWidget, oscWidget);
    panel.insertBottom(pianoRollWidget);

    return panel;
  }

  /**
   * Create a placeholder content widget.
   */
  function createPlaceholder(title: string, color: string): Widget {
    let widget = new Widget();
    widget.addClass('content');
    widget.addClass(color);

    widget.title.text = title;
    widget.title.closable = true;

    return widget;
  }
}

import React from 'react';
import { VERSION, Tab, MessagingCanvas } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import CustomCRM from './components/CustomCRM';

const PLUGIN_NAME = 'BedStuyStrongTicketPlugin';

export default class BedStuyStrongTicketPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }


  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.CRMContainer.Content.replace(<CustomCRM key="crm" />);

    // flex.TaskCanvasTabs.Content.add((
    //   <Tab icon="Messaging" label="Chat" key="chat">
    //     <MessagingCanvas />
    //   </Tab>
    // ), {
    //   if: () => true
    // })
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}

import React from 'react';
import localstorage from 'local-storage';
import styled from 'react-emotion';

import Frame from './Frame';
import TicketView from './TicketView';

const StyledTabs = styled('nav')`
  position: relative;
  display: flex;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: lightgray;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }

  button {
    position: relative;
    border-radius: 0;
    border: 1px solid lightgray;
    padding: 4px 8px;
    margin: 6px 4px;
    margin-bottom: 0;
    background: #eee;
    border-bottom: 0;
    z-index: 0;
  }
  button.is-selected {
    background: #f5f5f5;
    z-index: 1;
  }

  h1 {
    font-weight: bold;
    color: gray;
    margin-left: auto;
    padding-top: 4px;
  }
`;

const TabButton = ({ name, selected, children, onClick }) => (
  <button
    role="tab"
    aria-selected={selected}
    aria-controls={`tabpanel-${name}`}
    id={`tab-${name}`}
    data-name={name}
    onClick={onClick}
    className={selected ? 'is-selected' : ''}
  >
    {children}
  </button>
);

const TabPanel = ({ name, selected, children }) => (
  <div
    role="tabpanel"
    aria-labelledby={`tab-${name}`}
    id={`tabpanel-${name}`}
    style={{
      flex: 1,
      display: selected ? 'flex' : 'none',
    }}
  >
    {children}
  </div>
);
export default class CustomCRM extends React.Component {

  constructor(props) {
    super(props);

    const initialTab = localstorage.get('lastViewedTab');

    this.state = {
      tab: initialTab || 'tickets',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const tabName = event.target.dataset.name;
    this.setState({
      tab: tabName,
    });
    localstorage.set('lastViewedTab', tabName);
  }

  render() {
    const { tab } = this.state;
    return (
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <StyledTabs role="tablist">
          <TabButton name="tickets" selected={tab === 'tickets'} onClick={this.handleClick}>
            Intake Tickets
          </TabButton>
          <TabButton name="voterRegistration" selected={tab === 'voterRegistration'} onClick={this.handleClick}>
            Voter Registration Script
          </TabButton>
          <h1>
            Bed-Stuy Strong <span role="img" aria-label="heart emojis">💕</span>
          </h1>
        </StyledTabs>
        
        <TabPanel name="tickets" selected={tab === 'tickets'}>
          <TicketView />
        </TabPanel>
        <TabPanel name="voterRegistration" selected={tab === 'voterRegistration'}>
          <Frame src="https://docs.google.com/document/d/e/2PACX-1vS60-ZafmId2X6353gRb0gfF9EUu7uRhl4B7Y6orOg5nLDfNsr0iPh1q5P8JSujTmKUxJnd3yCrSeUC/pub?embedded=true#h.79w61356abp2" />
        </TabPanel>
      </div>
    );
  }
};
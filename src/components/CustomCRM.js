import React from 'react';
import localstorage from 'local-storage';
import styled from 'react-emotion';

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
            Bed-Stuy Strong 💕
          </h1>
        </StyledTabs>
        
        <TabPanel name="tickets" selected={tab === 'tickets'}>
          <TicketView />
        </TabPanel>
        <TabPanel name="voterRegistration" selected={tab === 'voterRegistration'}>
          <article>
            <h2>voter registration scripts and resources</h2>
            <p>content</p>
          </article>
        </TabPanel>
      </div>
    );
  }
};
import React from 'react';
import localstorage from 'local-storage';
import styled from 'react-emotion';

import Frame from './Frame';
import TicketView from './TicketList';

const DOCUMENT_TABS = {
  pause: {
    label: 'Food ops pause',
    url: 'https://docs.google.com/document/d/e/2PACX-1vR8e_jWLutvc3V1mn8wIvvWYHwhDo4mdpHJ76p16ubJrW3wU6R4e8qS3Cp7yPZS1TfizKbo-3hBIHk_/pub?embedded=true',
  },
  vaccines: {
    label: 'Vaccines',
    url: 'https://docs.google.com/document/d/e/2PACX-1vTtBw-v28DR9T_nNLzyM8W2Vc70ImAQPsXlx5vz2DRkY8rWG89zj7Laqr18VyNcDaLOG9JPa4dRb-bN/pub?embedded=true',
  },
};

const tabNames = ['tickets', ...Object.keys(DOCUMENT_TABS)];

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

    let initialTab = localstorage.get('lastViewedTab');
    

    if (initialTab && !tabNames.includes(initialTab)) {
      initialTab = 'tickets';
    }

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
          {Object.keys(DOCUMENT_TABS).map((key) => {
            const value = DOCUMENT_TABS[key];
            return (
              <TabButton name={key} selected={tab === key} onClick={this.handleClick} key={key}>
                {value.label}
              </TabButton>
            );
          })}
          <h1>
            Bed-Stuy Strong <span role="img" aria-label="heart emojis">💕</span>
          </h1>
        </StyledTabs>
        
        <TabPanel name="tickets" selected={tab === 'tickets'}>
          <TicketView />
        </TabPanel>
        {Object.keys(DOCUMENT_TABS).map((key) => {
          const value = DOCUMENT_TABS[key];
          return (
            <TabPanel name={key} selected={tab === key} key={key}>
              <Frame src={value.url} />
            </TabPanel>
          );
        })}
      </div>
    );
  }
};
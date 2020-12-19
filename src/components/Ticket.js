import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { namespace } from '../states';

const statuses = {
  'Seeking Volunteer': {
    backgroundColor: '#f82b60',
    color: '#fff',
  },
  'Assigned / In Progress': {
    backgroundColor: '#fcb400',
    color: '#fff',
  },
  'Complete': {
    backgroundColor: '#338a17',
    color: '#d1f7c4',
  },
  'Bulk Delivery Scheduled': {
    backgroundColor: '#ffa981',
    color: '#6b2613',
  },
  'Bulk Delivery Confirmed': {
    backgroundColor: '#d1f7c4',
    color: '#0b1d05',
  },
  'Not Bed-Stuy': {
    backgroundColor: '#ccc',
    color: '#040404',
  },
};

const mapStateToProps = (state, ownProps) => ({
  ticket: state[namespace].tickets[ownProps.id],
});

const TicketContainer = styled('div')`
  font-family: sans-serif;
  margin: 24px;
  color: #222;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  max-width: 24rem;
  position: relative;
  font-size: 1rem;

  .row {
    flex: 1 0 100%;
    display: flex;
    align-items: center;
  }

  .id {
    color: #888;
    font-weight: bold;
    margin-right: 1rem;
  }

  .status {
    font-size: 0.8rem;
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    color: #fff;
    background-color: #888;
  }

  .permalink {
    color: #555;
    font-size: 0.8rem;
    margin-left: auto;
  }

  .name {
    margin: 0.5rem 0 0.25rem;
    font-weight: bold;
  }
  .nearestIntersection {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    opacity: 0.85;
  }
  .phoneNumber {
    margin-bottom: 0;
    opacity: 0.75;
    font-size: 0.8rem;
    font-weight: bold;
  }

  .dates {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-size: 0.65rem;
    opacity: 0.5;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const tableID = process.env.NODE_ENV === 'production' ? 'tblW68BhT6VLe2cJf' : 'tbljexnPd5eBpLilw';

const Ticket = ({ ticket }) => {
  const {
    ticketID,
    recordID,
    status,
    requestName,
    nearestIntersection,
    phoneNumber,
    dateCreated,
    dateCompleted,
  } = ticket;

  const formattedDateCreated = new Date(dateCreated).toLocaleString('en-US').split(',')[0];
  const formattedDateCompleted = new Date(dateCompleted).toLocaleString('en-US').split(',')[0];
  const formattedPhoneNumber = parsePhoneNumberFromString(phoneNumber).formatNational();

  return (
    <TicketContainer>
      <div className="row">
        <div className="id">{ticketID}</div>
        <div className="status" style={statuses[status] || {}}>{status}</div>
        <a className="permalink" href={`https://airtable.com/${tableID}/${recordID}`} target="_blank">
          View in Airtable →
        </a>
      </div>
      <div>
        <h3 className="name">{requestName}</h3>
        <p className="nearestIntersection">{nearestIntersection}</p>
        <p className="phoneNumber">{formattedPhoneNumber}</p>
      </div>
      <div className="row">
        <div className="dates">
          <div className="createdAt">Created {formattedDateCreated}</div>
          {dateCompleted && (
            <div className="completedAt">Completed {formattedDateCompleted}</div>
          )}
        </div>
      </div>
    </TicketContainer>
  )
};

export default connect(mapStateToProps)(Ticket);

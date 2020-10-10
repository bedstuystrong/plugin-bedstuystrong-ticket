import React from 'react';
import { connect } from 'react-redux';
import { withTaskContext } from '@twilio/flex-ui';
import styled from 'react-emotion';

import { namespace, Actions } from '../states';
import Ticket from './Ticket';

const TicketListContainer = styled('div')`
  background-color: #f5f5f5;
`;

const mapStateToProps = (state) => ({
  tickets: state[namespace].tickets,
});

const TicketView = ({ task, tickets }) => {
  if (!task) return null;

  const filteredTickets = Object.values(tickets).filter((ticket) => (
    ticket.phoneNumber === task.attributes.name
  )).sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));

  return (
    <TicketListContainer>
      {filteredTickets.map(ticket => (
        <Ticket id={ticket.ticketID} key={ticket.ticketID} />
      ))}
    </TicketListContainer>
  );
}

export default connect(mapStateToProps)(withTaskContext(TicketView));

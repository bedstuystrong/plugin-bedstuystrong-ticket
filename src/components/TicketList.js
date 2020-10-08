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
  accountSid: state.flex.config.sso.accountSid,
  tickets: state[namespace].tickets,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (phoneNumber, accountSid) => dispatch(Actions.getTickets(phoneNumber, accountSid)),
});

class TicketView extends React.Component {
  constructor(props) {
    super(props);

    this.getTickets = this.getTickets.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { task } = this.props;
    if (task) {
      this.getTickets(task.attributes.name)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { task } = this.props;

    if (!nextProps.task) {
      return;
    }

    if (!task || task.sid !== nextProps.task.sid) {
      this.getTickets(nextProps.task.attributes.name);
    }
  }

  getTickets(phoneNumber) {
    const { accountSid } = this.props;
    this.props.getTickets(phoneNumber, accountSid);
  }

  render() {
    const { task, tickets } = this.props;

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
};

export default connect(mapStateToProps, mapDispatchToProps)(withTaskContext(TicketView));

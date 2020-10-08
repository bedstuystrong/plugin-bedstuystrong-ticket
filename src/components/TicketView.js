import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTaskContext } from '@twilio/flex-ui';

import { namespace, Actions } from '../states';
import Frame from './Frame';

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
    const { task, accountSid } = this.props;

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

    console.log('TicketView render', tickets)

    return (
      <>

      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withTaskContext(TicketView));

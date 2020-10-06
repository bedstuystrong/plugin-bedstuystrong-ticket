import React from 'react';
import { connect } from 'react-redux';
import { withTaskContext } from '@twilio/flex-ui';

const apiUrl = 'https://bedstuystrong-automation-a4b75.web.app/twilio';

const mapStateToProps = (state) => ({
  accountSid: state.flex.config.sso.accountSid,
});

class TicketView extends React.Component {
  render() {
    const { task, accountSid } = this.props;
    const url = task ? `${apiUrl}?phoneNumber=${encodeURIComponent(task.attributes.name)}&accountSid=${encodeURIComponent(accountSid)}` : apiUrl;

    return (
      <iframe src={url} style={{ width: '100%', height: '100%', flex: 1 }} />
    );
  }
};

export default connect(mapStateToProps)(withTaskContext(TicketView));

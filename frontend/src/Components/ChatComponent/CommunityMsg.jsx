import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useCallback, useEffect, useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@material-ui/core';

import useWebSocket from 'react-use-websocket';
import EmptyComponent from '../../util/EmptyComponent';

const useStyles = makeStyles((theme) => ({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: theme.spacing(2, 2),
  },
  chatContainer: {
    marginTop: '2rem',
    maxHeight: '300px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  chatBubble: {
    padding: '8px',
    wordWrap: 'break-word',
    marginBottom: '8px',
    display: 'inline-block',
  },
}));

const CommunityMsg = ({ userFullName, userID, eventID, isChecked, disabled }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const socketUrl = `ws://localhost:8087/api/v1/event/${eventID}/ws`;
  const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  const feedWebsocket = useCallback((draftMsg) => sendMessage(draftMsg), [sendMessage]);

  const handleSendMessage = () => {
    const draftMsg = {
      eventID: eventID,
      userID: userID,
      user: userFullName || 'Anonymous',
      msg: messageInput,
    };
    setMessageInput('');
    feedWebsocket(JSON.stringify(draftMsg));
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const receivedMessage = JSON.parse(lastMessage.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [lastMessage]);

  if (!isChecked) {
    return <EmptyComponent subtitle="Rsvp to chat with members." />;
  }

  if (!userFullName) {
    return <EmptyComponent subtitle="Enter profile details to enable chat" />;
  }

  return (
    <Container>
      <TextField
        label="Chat online with available team members"
        fullWidth
        multiline
        maxRows={2}
        disabled={disabled}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <div className={classes.btnContainer}>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          disabled={!messageInput.length}
          onClick={handleSendMessage}
        >
          Send Message
        </Button>
      </div>

      <div className={classes.chatContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              alignSelf: userFullName === message.user ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              className={classes.chatBubble}
              style={{
                backgroundColor: userFullName === message.user ? 'lightblue' : 'lightgray',
              }}
            >
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                {userFullName === message.user ? 'You' : message.user}
              </Typography>

              <Typography variant="body1">{message.msg}</Typography>
            </Paper>
          </div>
        ))}
      </div>
    </Container>
  );
};

CommunityMsg.defaultProps = {
  userFullName: '',
  userID: '',
  eventID: '',
  isChecked: false,
  disabled: false,
};

CommunityMsg.propTypes = {
  userFullName: PropTypes.string,
  userID: PropTypes.string,
  eventID: PropTypes.string,
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CommunityMsg;

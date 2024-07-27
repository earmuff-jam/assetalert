import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { useCallback, useEffect, useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import badWordsFilter from 'bad-words';
import useWebSocket from 'react-use-websocket';
import EmptyComponent from '../../util/EmptyComponent';
import { enqueueSnackbar } from 'notistack';
import { REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL } from '../../util/Common';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

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

  const profanityFilter = new badWordsFilter();
  const socketUrl = `${REACT_APP_LOCALHOST_URL_SOCKET_BASE_URL}/api/v1/event/${eventID}/ws`;
  const { sendMessage, lastMessage } = useWebSocket(socketUrl);

  const feedWebsocket = useCallback((draftMsg) => sendMessage(draftMsg), [sendMessage]);

  const handleSendMessage = async () => {
    const hasProfanity = profanityFilter.isProfane(messageInput);
    if (hasProfanity) {
      enqueueSnackbar('Unable to send obscene messages. Are you being safe with chat? ', {
        variant: 'error',
      });
      return;
    }

    const draftMsg = {
      eventID: eventID,
      userID: userID,
      user: userFullName || 'Anonymous',
      msg: messageInput,
      activeUsersCount: 0,
    };
    setMessageInput('');
    feedWebsocket(JSON.stringify(draftMsg));
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const receivedMessage = JSON.parse(lastMessage.data);

      // Filter out empty messages
      if (receivedMessage.msg && receivedMessage.user) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
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
      <ButtonComponent
        disableFocusRipple
        disableRipple
        buttonVariant={'standard'}
        showIcon={false}
        text={`${messages[0]?.activeUsersCount || 0} online members`}
      />
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
        {messages.length > 0 &&
          messages.map((message, index) => (
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

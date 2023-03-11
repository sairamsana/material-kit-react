import Fade from '@mui/material/Fade';
import { styled } from '@mui/system';
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import { observer } from 'mobx-react-lite';

const Styleddiv = styled('div')(({ theme }) => ({
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}))
const StyledContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  right: 0,
  top: '15vh',
  margin: theme.spacing(2),
  marginRight: theme.spacing(4),
  zIndex: 1301,
}))

const AlertTemplet = ({ messageStore }) => (
  <>
    <StyledContainer>
      <Styleddiv>
        {messageStore?.messages.map((message, i) => (
          <Fade
            key={i}
            in={!!message.status}
            timeout={{
              appear: 500,
              enter: 300,
              exit: 1500,
            }}
          >
            <Alert
              severity={message.severity}
              onClose={() => {
                if (message.canClose) messageStore?.popMessage(i);
              }}
              className={'fadeinout'}
            >
              <AlertTitle>{message.title}</AlertTitle>
              {message.message}
            </Alert>
          </Fade>
        ))}
      </Styleddiv>
    </StyledContainer>
  </>
);

export default observer(AlertTemplet);

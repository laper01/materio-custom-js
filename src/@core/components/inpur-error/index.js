
import { Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'


const InputError = ({ messages = [], className = '' }) => {
  const theme = useTheme()
  return (
    <>
      {messages.length > 0 && (
        <>
          {messages.map((message, index) => (
            <Typography
              variant='caption'
              color={theme.palette.error.light}
              key={index}>
              {message}
            </Typography>
          ))}
        </>
      )}
    </>
  );
}


export default InputError;

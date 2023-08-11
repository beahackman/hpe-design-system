import React from 'react';
import { Box, Notification, Text } from 'grommet';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
};

export const TimezoneExample = ({ bestPractice = true }) => {
  const date = new Date('2021-11-12');
  const PST = new Intl.DateTimeFormat('en-US', {
    ...options,
    timeZone: 'America/Los_Angeles',
  }).format(date);

  const AEDT = new Intl.DateTimeFormat('en-AU', {
    ...options,
    timeZone: 'Australia/Sydney',
  }).format(date);

  return (
    <Box gap="medium">
      <Box gap="small">
        <Text>
          This user is located in San Francisco, California and should see:
        </Text>
        <Notification
          message={`Servers will be under maintenance on ${PST}.`}
          status="warning"
        />
      </Box>

      <Box gap="small">
        <Text>{`This user is located in Sydney, Australia and should ${
          !bestPractice ? 'NOT' : ''
        } see:`}</Text>
        <Notification
          message={`Servers will be under maintenance on ${
            bestPractice ? AEDT : PST
          }.`}
          status="warning"
        />
      </Box>
    </Box>
  );
};

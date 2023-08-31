import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';

import { HighlightPhrase } from '../../components';
import { nameToSlug } from '../../utils';
import { useContext } from 'react';
import { ViewContext } from '../../pages/_app';
import { NotifTag } from './NotifTag';

export const SubsectionHeader = ({ children, level }) => {
  const [over, setOver] = useState(false);
  const { wholeViewHistory, currentPage } = useContext(ViewContext);
  const id = nameToSlug(children);
  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      id={id}
      margin={{ top: level === 3 ? 'medium' : 'large' }}
      onMouseOver={() => setOver(true)}
      onFocus={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onBlur={() => setOver(false)}
    >
      <Heading margin={{ vertical: 'small' }} level={level}>
        <HighlightPhrase size="inherit">{children}</HighlightPhrase>
      </Heading>

      {wholeViewHistory &&
        currentPage in wholeViewHistory &&
        wholeViewHistory[currentPage].update &&
        wholeViewHistory[currentPage].sections.includes(children) && (
          <Box pad={{ left: 'small' }}>
            <NotifTag
              size="small"
              color="teal"
              textVal="Updated"
              allyDes={`There's been updates for ${children}`}
            />
          </Box>
        )}

      <Button
        tip="Copy link to clipboard"
        a11yTitle={`Jump to section titled ${children} 
                    and copy link to clipboard`}
        icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
        onClick={() => {
          window.location.href = `#${id}`;
          navigator.clipboard.writeText(window.location.href);
        }}
      />
    </Box>
  );
};

SubsectionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  level: PropTypes.number,
};

import React from 'react';
import { Tile } from 'aries-core';
import {
  Box,
  Form,
  FormField,
  Header,
  Heading,
  RadioButtonGroup,
  Select,
} from 'grommet';

const sortFeatures = ['Featured', 'Price', 'Users'];

const FormContainer = ({ ...rest }) => {
  return (
    <Tile
      background="background-front"
      border
      pad={{ horizontal: 'medium', vertical: 'medium' }}
      {...rest}
    />
  );
};

export const SortExample = () => {
  const [formValues, setFormValues] = React.useState({
    sortBy: 'Featured',
    sortOrder: 'Descending',
  });

  const applySort = () => {
    // Mock function to demonstrate implementation
  };

  const onFormChange = value => {
    setFormValues(value);
    applySort();
  };

  return (
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Heading level={3} margin="none">
            Sort
          </Heading>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form value={formValues} onChange={onFormChange}>
            <FormField htmlFor="sortBy__input" name="sortBy" label="Sort by">
              <Select
                id="sortBy"
                name="sortBy"
                options={sortFeatures}
                placeholder="-- Select --"
              />
            </FormField>
            <FormField htmlFor="sortOrder" name="sortOrder" label="Sort order">
              <Box pad="small">
                <RadioButtonGroup
                  id="sortOrder"
                  name="sortOrder"
                  options={['Ascending', 'Descending']}
                />
              </Box>
            </FormField>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};

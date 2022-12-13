import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  MaskedInput,
  RangeInput,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { FormChildObjects } from '../../../../examples/templates/FormChildObject';

const hostTemplate = {
  name: '',
  host: '',
  cpu: '',
  memory: '',
};

const INPUT_MAP = {
  name: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`hosts[${index}].name`}
      name={`hosts[${index}].name`}
      label="Host name"
    >
      <TextInput
        id={`hosts[${index}].name`}
        name={`hosts[${index}].name`}
        {...rest}
      />
    </FormField>
  ),
  host: ({ key, index, ...rest }) => (
    <FormField
      key={key}
      htmlFor={`hosts[${index}].host`}
      name={`hosts[${index}].host`}
      label="Host address"
      // Nested required fields e.g. hosts[2].host is not being picked up by validation
      required
      aria-required="true"
    >
      <TextInput
        id={`hosts[${index}].host`}
        name={`hosts[${index}].host`}
        {...rest}
      />
    </FormField>
  ),
  cpu: ({ key, index, ...rest }) => (
    <Box key={key} width="xsmall">
      <FormField
        htmlFor={`hosts[${index}].cpu`}
        name={`hosts[${index}].cpu`}
        label="CPU cores"
        required
        aria-required="true"
      >
        {/* Make this a masked input */}
        <Select
          id={`hosts[${index}].cpu`}
          name={`hosts[${index}].cpu`}
          options={[2, 4, 6, 8]}
          {...rest}
        />
      </FormField>
    </Box>
  ),
  memory: ({ key, index, ...rest }) => (
    <Box key={key} width="xsmall">
      <FormField
        key={key}
        htmlFor={`hosts[${index}].memory`}
        name={`hosts[${index}].memory`}
        label="Memory (GB)"
        required
        aria-required="true"
      >
        {/* Make this a masked input */}
        <Select
          id={`hosts[${index}].memory`}
          name={`hosts[${index}].memory`}
          options={['32', '64', '128', '256', '512']}
          {...rest}
        />
      </FormField>
    </Box>
  ),
};

export const CreateCluster = () => {
  const [formValues, setFormValues] = useState({
    'cluster-name': '',
    'resource-manager': false,
    'automation-level': '',
    'migration-threshold': 15,
    hosts: [{ ...hostTemplate }],
  });

  const handleAdd = () => {
    const nextHosts = [...formValues.hosts, { ...hostTemplate }];
    setFormValues({ ...formValues, hosts: nextHosts });
  };

  const handleRemove = index => {
    if (formValues.hosts?.length > 0) {
      setFormValues({
        ...formValues,
        hosts: formValues.hosts.filter((value, i) => i !== index),
      });
    }
  };

  const handleRemoveAll = () => {
    setFormValues({
      ...formValues,
      hosts: [],
    });
  };

  const onChange = value => {
    setFormValues(value);
  };

  const onSubmit = event => {
    console.log(event.value);
  };

  return (
    <Box alignSelf="center" gap="medium" width="medium">
      <Heading level={2} margin="none">
        Create Cluster
      </Heading>
      <Form value={formValues} onChange={onChange} onSubmit={onSubmit}>
        <Box gap="medium">
          <>
            <FormField
              htmlFor="cluster-name"
              name="cluster-name"
              label="Cluster name"
              required
              aria-required="true"
            >
              <TextInput id="cluster-name" name="cluster-name" />
            </FormField>
            <FormField
              htmlFor="resource-manager"
              name="resource-manager"
              label="Distributed resoure manager"
            >
              <CheckBox
                id="resource-manager"
                name="resource-manager"
                label="Use manager"
              />
            </FormField>
            {formValues['resource-manager'] && (
              <>
                <FormField
                  htmlFor="automation-level"
                  name="automation-level"
                  label="Automation level"
                >
                  <Select
                    id="automation-level"
                    name="automation-level"
                    options={['Smart (recommended)', 'High', 'Medium', 'Low']}
                    placeholder="Select ..."
                  />
                </FormField>
                <FormField
                  htmlFor="migration-threshold"
                  name="migration-threshold"
                  label="Migration threshold"
                >
                  <Box
                    direction="row"
                    gap="small"
                    pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  >
                    <Text>0%</Text>
                    <RangeInput
                      id="migration-threshold"
                      name="migration-threshold"
                      min={0}
                      max={50}
                    />
                    <Text>50%</Text>
                  </Box>
                </FormField>
              </>
            )}
          </>
          <Box gap="small">
            <Heading level={3} margin="none">
              Hosts
            </Heading>
            <FormChildObjects
              collection={{
                name: 'Hosts',
                itemName: 'host',
                parentName: 'cluster',
              }}
              fields={INPUT_MAP}
              level={4}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              primaryKey="host"
              required
              summarize={['cpu', 'memory']}
              values={formValues.hosts}
            />
          </Box>
          <Box direction="row" gap="xsmall">
            <Button
              label="Create"
              a11yTitle="Create cluster"
              primary
              type="submit"
            />
            <Button
              label="Cancel"
              a11yTitle="Cancel cluster creation"
              onClick={() => {}}
            />
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

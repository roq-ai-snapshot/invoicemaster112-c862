import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createOrganisationUser } from 'apiSdk/organisation-users';
import { Error } from 'components/error';
import { organisationUserValidationSchema } from 'validationSchema/organisation-users';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganisationInterface } from 'interfaces/organisation';
import { UserInterface } from 'interfaces/user';
import { getOrganisations } from 'apiSdk/organisations';
import { getUsers } from 'apiSdk/users';
import { OrganisationUserInterface } from 'interfaces/organisation-user';

function OrganisationUserCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrganisationUserInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrganisationUser(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrganisationUserInterface>({
    initialValues: {
      organisation_id: (router.query.organisation_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: organisationUserValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Organisation User
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<OrganisationInterface>
            formik={formik}
            name={'organisation_id'}
            label={'organisation_id'}
            placeholder={'Select Organisation'}
            fetcher={getOrganisations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'user_id'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'organisation_user',
  operation: AccessOperationEnum.CREATE,
})(OrganisationUserCreatePage);

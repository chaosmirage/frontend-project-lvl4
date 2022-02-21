import React, { ReactNode } from 'react';
import type { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import type { Channel } from 'shared/api';
import { useAppSelector } from 'app';
import { getChannelsNamesSelector } from 'entities/channels';
import { makeAddingMessageSchema } from '../model';

export interface AddingChannelFormProps {
  onSubmit: (data: Pick<Channel, 'name'>) => void;
  onCancel: () => void;
}

export const AddingChannelForm: FC<AddingChannelFormProps> = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const channelsNames = useAppSelector(getChannelsNamesSelector);

  const handleSubmitForm = async (
    data: Pick<Channel, 'name'>,
    actions: FormikHelpers<{ name: Channel['name'] }>
  ) => {
    try {
      await onSubmit(data);

      actions?.resetForm();
      actions?.setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={makeAddingMessageSchema(t, channelsNames)}
      onSubmit={handleSubmitForm}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="validationFormikUsername2">
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-label={t('addingChannel.channelName')}
              placeholder={`${t('addingChannel.channelName')}...`}
              disabled={isSubmitting}
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button disabled={isSubmitting} variant="secondary" onClick={onCancel} className="me-2">
              {t('addingChannel.cancel')}
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {t('addingChannel.send')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

interface AddingChannelProps {
  onAddChannel: () => void;
  children: ReactNode;
}

export const AddingChannel: FC<AddingChannelProps> = ({ onAddChannel, children }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('messenger.channels')}</span>
      <Button
        type="button"
        variant="light"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={() => {
          onAddChannel();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="20"
          height="20"
          fill="currentColor"
        >
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <span className="visually-hidden">+</span>
      </Button>
      {children}
    </div>
  );
};

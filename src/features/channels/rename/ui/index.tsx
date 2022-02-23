/* eslint-disable no-debugger */
import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import type { Channel } from 'shared/api';
import { useAppSelector } from 'app';
import { getChannelsNamesSelector } from 'entities/channels';
import { makeRenamingMessageSchema } from '../model';

export interface RenamingChannelFormProps {
  onSubmit: (data: Pick<Channel, 'name' | 'id'>) => void;
  onCancel: () => void;
  initialValues: Pick<Channel, 'name' | 'id'>;
}

export const RenamingChannelForm: FC<RenamingChannelFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
}) => {
  const { t } = useTranslation();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const channelsNames = useAppSelector(getChannelsNamesSelector);

  useEffect(() => {
    nameInputRef?.current?.focus();
    nameInputRef?.current?.select();
  }, [nameInputRef]);

  const handleSubmitForm = async (
    data: Pick<Channel, 'name' | 'id'>,
    actions: FormikHelpers<Pick<Channel, 'name' | 'id'>>
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
      initialValues={initialValues}
      validationSchema={makeRenamingMessageSchema(t, channelsNames)}
      onSubmit={handleSubmitForm}
      validateOnBlur={false}
    >
      {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
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
              ref={nameInputRef}
              autoFocus
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

import React, { useRef } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { Message } from 'shared/api';
import { Form } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import { makeAddingMessageSchema } from '../model';

export interface AddingFormProps {
  onSubmit: (data: Pick<Message, 'body'>) => void;
}

// TODO: use Formik hook, extract disabled value to variable
export const AddingForm: FC<AddingFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const bodyInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitForm = async (
    data: { body: Message['body'] },
    actions: FormikHelpers<{ body: Message['body'] }>
  ) => {
    try {
      await onSubmit(data);

      actions?.resetForm();
      actions?.setSubmitting(false);
      bodyInputRef.current?.focus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        validationSchema={makeAddingMessageSchema(t)}
        onSubmit={handleSubmitForm}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                name="body"
                value={values.body}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-0 p-0 ps-2 form-control"
                aria-label={t('addMessages.newMessage')}
                placeholder={`${t('addMessages.newMessage')}...`}
                disabled={isSubmitting}
                ref={bodyInputRef}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-group-vertical"
                  disabled={isSubmitting || values.body === ''}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    />
                  </svg>
                  <span className="visually-hidden">{t('addMessages.send')}</span>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

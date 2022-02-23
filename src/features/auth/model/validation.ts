import * as Yup from 'yup';
import type { TFunction } from 'react-i18next';

export const makeCredentialsSchema = (t: TFunction<'translation'>) =>
  Yup.object().shape({
    username: Yup.string().required(t('errors.requiredField')),
    password: Yup.string().required(t('errors.requiredField')),
  });

export const makeSignUpSchema = (t: TFunction<'translation'>) =>
  Yup.object().shape({
    username: Yup.string()
      .required(t('errors.requiredField'))
      .min(3, t('signUpPage.errors.range'))
      .max(20, t('signUpPage.errors.range')),
    password: Yup.string().required(t('errors.requiredField')).min(6, t('signUpPage.errors.min')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], t('errors.mustBeEqualPasswords')),
  });

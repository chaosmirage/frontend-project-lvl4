import * as Yup from 'yup';
import type { TFunction } from 'react-i18next';

export const makeCredentialsSchema = (t: TFunction<'translation'>) =>
  Yup.object().shape({
    username: Yup.string().required(t('errors.requiredField')),
    password: Yup.string().required(t('errors.requiredField')),
  });

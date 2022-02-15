import * as Yup from 'yup';
import type { TFunction } from 'react-i18next';

export const makeAddingMessageSchema = (t: TFunction<'translation'>) =>
  Yup.object().shape({
    body: Yup.string(),
  });

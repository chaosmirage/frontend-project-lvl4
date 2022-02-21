import * as Yup from 'yup';
import type { TFunction } from 'react-i18next';
import { Channel } from 'shared/api';

export const makeAddingMessageSchema = (
  t: TFunction<'translation'>,
  channelsNames: Channel['name'][]
) =>
  Yup.object().shape({
    name: Yup.string()
      .required(t('errors.requiredField'))
      .notOneOf(channelsNames, t('errors.mustBeUniq')),
  });

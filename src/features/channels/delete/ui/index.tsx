import React, { useState } from 'react';
import type { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface DeletingChannelProps {
  onDeleteChannel: () => void;
  onCancel: () => void;
}

export const DeletingChannel: FC<DeletingChannelProps> = ({ onDeleteChannel, onCancel }) => {
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();

  const handleClick = async () => {
    setDisabled(true);

    try {
      await onDeleteChannel();
    } catch (error) {
      setDisabled(false);
    }
  };

  return (
    <>
      <p className="lead">{t('deletingChannel.confirmDeleting')}</p>
      <div className="d-flex justify-content-end">
        <Button disabled={disabled} variant="secondary" onClick={onCancel} className="me-2">
          {t('deletingChannel.cancel')}
        </Button>
        <Button variant="danger" disabled={disabled} onClick={handleClick}>
          {t('deletingChannel.delete')}
        </Button>
      </div>
    </>
  );
};

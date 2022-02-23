import React, { FC, ReactElement, useState } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

interface Props {
  isOpened: boolean;
  title: ReactElement | string;
  body: ReactElement;
  onClose: () => void;
}

export const Modal: FC<Props> = ({ isOpened = false, title, body, onClose }) => {
  const [isEntered, changeIsEntered] = useState(false);

  return (
    <BootstrapModal
      onEntered={() => {
        changeIsEntered(true);
      }}
      centered
      show={isOpened}
      onHide={onClose}
    >
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{isEntered && body}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

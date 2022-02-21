import React, { FC, ReactElement } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

interface Props {
  isOpened: boolean;
  title: ReactElement | string;
  body: ReactElement;
  onClose: () => void;
}

export const Modal: FC<Props> = ({ isOpened = false, title, body, onClose }) => {
  return (
    <BootstrapModal centered show={isOpened} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{body}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

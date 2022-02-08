import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { AxiosError } from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useMessengerModel } from 'entities/messenger/model';
import { useAuth } from 'features/auth';
import type { Messenger as MessengerI } from 'shared/api';
import { AddChannel } from 'features/channels/add';
import { Channels } from 'features/channels/select';
import { Messages } from 'features/messages/show';
import { AddingMessageForm } from 'features/messages/add/';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Messenger: FC<Props> = () => {
  const { t } = useTranslation();

  const {
    getData,
    getChannels,
    getCurrentChannelId,
    getCurrentChannel,
    getCurrentChannelMessages,
  } = useMessengerModel();
  const { getToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        await getData(getToken());
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const currentChannelId = getCurrentChannelId();

  const currentChannel = useMemo(() => getCurrentChannel(currentChannelId), [currentChannelId]);
  const currentChannelMessages = useMemo(
    () => getCurrentChannelMessages(currentChannelId),
    [currentChannelId]
  );

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <AddChannel />
          <Channels data={getChannels()} defaultSelected={getCurrentChannelId()} />
        </Col>
        <Col className="p-0 h-100">
          <Messages
            addingMessage={<AddingMessageForm />}
            currentChannel={currentChannel}
            currentChannelMessages={currentChannelMessages}
          />
        </Col>
      </Row>
    </Container>
  );
};

import React, { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  getChannelsSelector,
  getCurrentChannelMessagesSelector,
  getCurrentChannelSelector,
  getData,
  DEFAULT_SELECTED_CHANNEL,
} from 'entities/messenger/model';
import { useAuth } from 'features/auth';
import { AddChannel } from 'features/channels/add';
import { Channels } from 'features/channels/select';
import { Messages } from 'features/messages/show';
import { useAppDispatch, useAppSelector } from 'app';
import { Message } from 'shared/api';
import { AddingMessageForm } from 'features/messages/add/';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Messenger: FC<Props> = () => {
  const { t } = useTranslation();
  const { getToken } = useAuth();
  const dispatch = useAppDispatch();

  const channels = useAppSelector(getChannelsSelector);
  const currentChannel = useAppSelector(getCurrentChannelSelector);
  const currentChannelMessages = useAppSelector(getCurrentChannelMessagesSelector);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(getData(getToken()));
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  const handleSubmit = useCallback((data: Partial<Message>) => {
    console.log('send', data);
  }, []);

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <AddChannel />
          <Channels
            data={channels}
            defaultSelected={currentChannel?.id || DEFAULT_SELECTED_CHANNEL}
          />
        </Col>
        <Col className="p-0 h-100">
          <Messages
            addingMessage={<AddingMessageForm onSubmit={handleSubmit} />}
            currentChannel={currentChannel}
            currentChannelMessages={currentChannelMessages}
          />
        </Col>
      </Row>
    </Container>
  );
};

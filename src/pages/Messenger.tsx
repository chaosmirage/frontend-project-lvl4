import React, { useEffect, useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  getChannelsSelector,
  getCurrentChannelSelector,
  DEFAULT_SELECTED_CHANNEL,
  addChannels,
  selectChannel,
} from 'entities/channels';
import { addMessages } from 'entities/messages';
import { useAuth } from 'features/auth';
import { AddingChannel, AddingChannelForm } from 'features/channels/add';
import { Channels } from 'features/channels/select';
import { useAppDispatch, useAppSelector } from 'app';
import { Message, messengerApi, Channel } from 'shared/api';
import { AddingMessageForm } from 'features/messages/add/';
import { getCurrentChannelMessagesSelector, Messages } from 'features/messages/show';
import { makeMessagesConnection } from 'shared/api/messenger';
import { Modal } from 'shared/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

type MessengerProcess = 'addingChannel' | null;

export const Messenger: FC<Props> = () => {
  const [processName, changeProcessName] = useState<MessengerProcess>(null);

  const { t } = useTranslation();
  const { getToken } = useAuth();
  const dispatch = useAppDispatch();

  const channels = useAppSelector(getChannelsSelector);
  const currentChannel = useAppSelector(getCurrentChannelSelector);
  const currentChannelMessages = useAppSelector(getCurrentChannelMessagesSelector);

  const {
    sendMessage,
    addChannel,
    handleNewMessage,
    handleDisconnect,
    handleConnect,
    handleNewChannel,
  } = useMemo(() => makeMessagesConnection(), []);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await messengerApi.getData(getToken());
        dispatch(addMessages(data.messages));
        dispatch(addChannels(data.channels));
      } catch (error) {
        console.log(error);
      }
    };

    init();

    handleNewMessage((message) => {
      dispatch(addMessages([message]));
    });
    handleNewChannel((channel) => {
      dispatch(addChannels([channel]));
    });
    handleDisconnect((reason) => {
      console.log('disconnected', reason);
    });
    handleConnect((socket) => {
      console.log('connected', socket.id);
    });
  }, []);

  const handleSubmit = useCallback(
    ({ body }: Pick<Message, 'body'>) => {
      if (currentChannel) {
        return new Promise<void>((resolve, reject) => {
          sendMessage({ body, username: 'admin', channelId: currentChannel.id }, (response) => {
            if (response.status === 'ok') {
              resolve();
            }
          });

          setTimeout(() => {
            reject(new Error(t('errors.networkError')));
          }, 5000);
        });
      }

      return Promise.reject();
    },
    [currentChannel]
  );

  const handleChangeChannel = useCallback(
    (channel: Channel) => {
      dispatch(selectChannel(channel.id));
    },
    [selectChannel, dispatch]
  );

  const handleAddChannel = useCallback(
    ({ name }: Pick<Channel, 'name'>) => {
      return new Promise<void>((resolve, reject) => {
        addChannel({ name, removable: true }, (response) => {
          if (response.status === 'ok') {
            resolve();
            dispatch(selectChannel(response.data.id));
            changeProcessName(null);
          }
        });

        setTimeout(() => {
          reject(new Error(t('errors.networkError')));
        }, 5000);
      });
    },
    [dispatch]
  );

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <Channels
            data={channels}
            selectedChannel={currentChannel?.id || DEFAULT_SELECTED_CHANNEL}
            onChangeChannel={handleChangeChannel}
            addingChannels={
              <AddingChannel
                onAddChannel={() => {
                  changeProcessName('addingChannel');
                }}
              >
                <Modal
                  isOpened={processName === 'addingChannel'}
                  title={t(`${processName}.title`)}
                  onClose={() => {
                    changeProcessName(null);
                  }}
                  body={
                    <AddingChannelForm
                      onSubmit={handleAddChannel}
                      onCancel={() => {
                        changeProcessName(null);
                      }}
                    />
                  }
                />
              </AddingChannel>
            }
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

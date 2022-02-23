import React, { useEffect, useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  getChannelsSelector,
  getCurrentChannelSelector,
  DEFAULT_SELECTED_CHANNEL,
  addChannels as addChannelsAction,
  deleteChannel as deleteChannelAction,
  selectChannel as selectChannelAction,
  renameChannel as renameChannelAction,
} from 'entities/channels';
import {
  addMessages as addMessagesAction,
  deleteMessagesByChannel as deleteMessagesByChannelAction,
} from 'entities/messages';
import { useAuth } from 'features/auth';
import { AddingChannel, AddingChannelForm } from 'features/channels/add';
import { DeletingChannel } from 'features/channels/delete';
import { RenamingChannelForm } from 'features/channels/rename';
import { Channels } from 'features/channels/select';
import { useAppDispatch, useAppSelector } from 'app';
import { Message, messengerApi, Channel } from 'shared/api';
import { AddingMessageForm } from 'features/messages/add/';
import { getCurrentChannelMessagesSelector, Messages } from 'features/messages/show';
import { makeMessagesConnection } from 'shared/api/messenger';
import { Modal } from 'shared/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

type MessengerProcess = 'addingChannel' | 'deletingChannel' | 'renamingChannel' | null;

export const Messenger: FC<Props> = () => {
  const [processName, changeProcessName] = useState<MessengerProcess>(null);
  const [activeChannel, changeActiveChannel] = useState<Omit<Channel, 'removable'> | null>(null);

  const { t } = useTranslation();
  const { getToken } = useAuth();
  const dispatch = useAppDispatch();

  const channels = useAppSelector(getChannelsSelector);
  const currentChannel = useAppSelector(getCurrentChannelSelector);
  const currentChannelMessages = useAppSelector(getCurrentChannelMessagesSelector);

  const {
    sendMessage,
    addChannel,
    deleteChannel,
    renameChannel,
    handleNewMessage,
    handleDisconnect,
    handleConnect,
    handleNewChannel,
    handleDeletedChannel,
    handleRenamedChannel,
  } = useMemo(() => makeMessagesConnection(), []);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await messengerApi.getData(getToken());
        dispatch(addMessagesAction(data.messages));
        dispatch(addChannelsAction(data.channels));
      } catch (error) {
        console.log(error);
      }
    };

    init();

    handleNewMessage((message) => {
      dispatch(addMessagesAction([message]));
    });
    handleNewChannel((channel) => {
      dispatch(addChannelsAction([channel]));
    });
    handleDeletedChannel((channel) => {
      dispatch(deleteChannelAction(channel.id));
      dispatch(deleteMessagesByChannelAction(channel.id));
      dispatch(selectChannelAction(DEFAULT_SELECTED_CHANNEL));
    });
    handleRenamedChannel((channel) => {
      dispatch(renameChannelAction(channel));
    });
    handleDisconnect((reason) => {
      console.log('disconnected', reason);
    });
    handleConnect((socket) => {
      console.log('connected', socket.id);
    });
  }, [
    dispatch,
    getToken,
    handleConnect,
    handleDeletedChannel,
    handleDisconnect,
    handleNewChannel,
    handleNewMessage,
    handleRenamedChannel,
  ]);

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
    [currentChannel, sendMessage, t]
  );

  const handleChangeChannel = useCallback(
    (channel: Channel) => {
      dispatch(selectChannelAction(channel.id));
    },
    [dispatch]
  );

  const handleAddChannel = useCallback(
    ({ name }: Pick<Channel, 'name'>) => {
      return new Promise<void>((resolve, reject) => {
        addChannel({ name, removable: true }, (response) => {
          if (response.status === 'ok') {
            resolve();
            dispatch(selectChannelAction(response.data.id));
            changeProcessName(null);
            toast.success(t('addingChannel.channelWasAdded'));
          }
        });

        setTimeout(() => {
          reject(new Error(t('errors.networkError')));
        }, 5000);
      });
    },
    [addChannel, dispatch, t]
  );

  const handleDeleteChannel = useCallback(
    (id: Channel['id']) => {
      return new Promise<void>((resolve, reject) => {
        changeProcessName('deletingChannel');

        deleteChannel({ id }, (response) => {
          if (response.status === 'ok') {
            resolve();
            changeProcessName(null);
            changeActiveChannel(null);
            toast.success(t('deletingChannel.channelWasDeleted'));
          }
        });

        setTimeout(() => {
          reject(new Error(t('errors.networkError')));
        }, 5000);
      });
    },
    [deleteChannel, t]
  );

  const handleRenameChannel = useCallback(
    ({ name, id }: Pick<Channel, 'name' | 'id'>) => {
      return new Promise<void>((resolve, reject) => {
        renameChannel({ name, id }, (response) => {
          if (response.status === 'ok') {
            resolve();
            changeProcessName(null);
            toast.success(t('renamingChannel.channelWasRenamed'));
          }
        });

        setTimeout(() => {
          reject(new Error(t('errors.networkError')));
        }, 5000);
      });
    },
    [renameChannel, t]
  );

  return (
    <Container className="container h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <Channels
            data={channels}
            selectedChannel={currentChannel?.id || DEFAULT_SELECTED_CHANNEL}
            onChangeChannel={handleChangeChannel}
            onDeleteChannel={(id: Channel['id']) => {
              changeProcessName('deletingChannel');
              changeActiveChannel({ id, name: '' });
            }}
            onRenameChannel={({ id, name }: Pick<Channel, 'id' | 'name'>) => {
              changeProcessName('renamingChannel');
              changeActiveChannel({ id, name });
            }}
            deletingChannel={
              <Modal
                isOpened={processName === 'deletingChannel'}
                title={t(`${processName}.title`)}
                onClose={() => {
                  changeProcessName(null);
                  changeActiveChannel(null);
                }}
                body={
                  <DeletingChannel
                    onDeleteChannel={() => {
                      if (!activeChannel) {
                        return Promise.reject();
                      }

                      return handleDeleteChannel(activeChannel.id);
                    }}
                    onCancel={() => {
                      changeProcessName(null);
                      changeActiveChannel(null);
                    }}
                  />
                }
              />
            }
            addingChannel={
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
            renamingChannel={
              activeChannel && (
                <Modal
                  isOpened={processName === 'renamingChannel'}
                  title={t(`${processName}.title`)}
                  onClose={() => {
                    changeProcessName(null);
                  }}
                  body={
                    <RenamingChannelForm
                      initialValues={{ name: activeChannel.name, id: activeChannel.id }}
                      onSubmit={handleRenameChannel}
                      onCancel={() => {
                        changeProcessName(null);
                      }}
                    />
                  }
                />
              )
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

import React, { ReactChild, ReactElement, useEffect, useState, useRef } from 'react';
import type { FC } from 'react';
import { AxiosError } from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'features/auth';
import type { Channel, Message as MessageI } from 'shared/api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface StatisticsProps {
  channel: Channel;
  messages: MessageI[];
}

export const Statistics: FC<StatisticsProps> = ({ channel, messages }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b># {channel.name}</b>
      </p>
      <span className="text-muted">{t('messenger.messages', { count: messages.length })}</span>
    </div>
  );
};

interface MessageProps {
  message: MessageI;
}

export const Message: FC<MessageProps> = ({ message }) => {
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>: {message.body}
    </div>
  );
};

interface MessagesProps {
  addingMessage: ReactElement;
  currentChannel?: Channel;
  currentChannelMessages?: MessageI[];
}

export const Messages: FC<MessagesProps> = ({
  addingMessage,
  currentChannel,
  currentChannelMessages,
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [currentChannelMessages]);

  if (!currentChannelMessages || !currentChannel) {
    return null;
  }

  return (
    <div className="d-flex flex-column h-100">
      <Statistics channel={currentChannel} messages={currentChannelMessages} />
      <div
        ref={messagesContainerRef}
        id="messages-box"
        className="chat-messages overflow-auto px-5 "
      >
        {currentChannelMessages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      {addingMessage}
    </div>
  );
};

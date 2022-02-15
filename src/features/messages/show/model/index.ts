import { createSelector } from '@reduxjs/toolkit';
import { getChannels } from 'entities/channels';
import type { ChannelsState } from 'entities/channels';
import { getMessages } from 'entities/messages';
import type { MessagesState } from 'entities/messages';

export const getCurrentChannelMessagesSelector = createSelector(
  getChannels,
  getMessages,
  (channelsState: ChannelsState, messagesState: MessagesState) => {
    return messagesState.messages.filter(
      (message) => message.channelId === channelsState.currentChannelId
    );
  }
);

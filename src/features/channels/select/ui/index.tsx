import React from 'react';
import type { FC, ReactElement } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import type { Channel } from 'shared/api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  data: Channel[];
  selectedChannel: Channel['id'];
  onChangeChannel: (channel: Channel) => void;
  addingChannels: ReactElement;
}

export const Channels: FC<Props> = ({ data, selectedChannel, onChangeChannel, addingChannels }) => {
  const { t } = useTranslation();

  const handleClickChannel = (channel: Channel) => () => {
    onChangeChannel(channel);
  };

  return (
    <>
      {addingChannels}
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {data.map((channel) => {
          const isSelected = channel.id === selectedChannel;
          const variant = isSelected ? 'secondary' : 'light';

          return (
            <li className="nav-item w-100" key={channel.id}>
              <Button
                variant={variant}
                className="w-100 rounded-0 text-start btn"
                onClick={handleClickChannel(channel)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

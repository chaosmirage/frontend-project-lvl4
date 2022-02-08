import React, { useState } from 'react';
import type { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import type { Channel } from 'shared/api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  data: Channel[];
  defaultSelected: number;
}

export const Channels: FC<Props> = ({ data, defaultSelected }) => {
  const [selectedChannel, changeSelectedChannel] = useState(defaultSelected);
  const { t } = useTranslation();

  const handleClickChannel = (channel: Channel) => () => {
    changeSelectedChannel(channel.id);
  };

  return (
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
  );
};

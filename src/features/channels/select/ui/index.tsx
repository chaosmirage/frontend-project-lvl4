import React from 'react';
import type { FC, ReactElement } from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import type { Channel } from 'shared/api';

interface Props {
  data: Channel[];
  selectedChannel: Channel['id'];
  onChangeChannel: (channel: Channel) => void;
  onDeleteChannel: (id: Channel['id']) => void;
  onRenameChannel: (data: Pick<Channel, 'name' | 'id'>) => void;
  addingChannel: ReactElement;
  deletingChannel: ReactElement;
  renamingChannel: ReactElement | null;
}

export const Channels: FC<Props> = ({
  data,
  selectedChannel,
  onChangeChannel,
  addingChannel,
  onDeleteChannel,
  onRenameChannel,
  deletingChannel,
  renamingChannel,
}) => {
  const { t } = useTranslation();

  const handleClickChannel = (channel: Channel) => () => {
    onChangeChannel(channel);
  };

  return (
    <>
      {addingChannel}
      {deletingChannel}
      {renamingChannel}
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {data.map((channel) => {
          const isSelected = channel.id === selectedChannel;
          const isRemovable = channel.removable;
          const variant = isSelected ? 'secondary' : 'light';

          if (isRemovable) {
            return (
              <li className="nav-item w-100" key={channel.id}>
                <Dropdown className="d-flex" as={ButtonGroup}>
                  <Button
                    onClick={handleClickChannel(channel)}
                    variant={variant}
                    className="w-100 rounded-0 text-start "
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant={variant}
                    id="dropdown-split-basic"
                    aria-label={t('channels.channelsManaging')}
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      aria-label={t('deletingChannel.delete')}
                      onClick={() => onDeleteChannel(channel.id)}
                    >
                      {t('deletingChannel.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      aria-label={t('renamingChannel.rename')}
                      onClick={() => onRenameChannel({ id: channel.id, name: channel.name })}
                    >
                      {t('renamingChannel.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            );
          }

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

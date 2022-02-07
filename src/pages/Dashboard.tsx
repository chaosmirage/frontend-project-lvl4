import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { useChannelModel } from 'entities/channel/model';
import { useAuth } from 'features/auth';
import { App } from 'shared/api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Dashboard: FC<Props> = () => {
  const { t } = useTranslation();

  const [data, setData] = useState<App>({ channels: [], messages: [], currentChannelId: 1 });

  const { getAll } = useChannelModel();
  const { getToken } = useAuth();

  useEffect(() => {
    const init = async () => {
      const data = await getAll(getToken());
      setData(data);
    };

    init();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-sm-8 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body row p-5">Dashboard</div>
            <ul>
              {data.channels.map((channel) => (
                <li key={channel.id}>{channel.name}</li>
              ))}
            </ul>
            <ul>
              {data.messages.map((message) => (
                <li key={message.id}>{message.body}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

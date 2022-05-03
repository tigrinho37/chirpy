import Bell from '@geist-ui/react-icons/bell';
import * as React from 'react';

import { Badge } from '@chirpy/components';
import { Heading } from '@chirpy/components';
import { Menu } from '@chirpy/components';
import { Text } from '@chirpy/components';
import { useCurrentUser } from '@chirpy/contexts';
import {
  useCurrentNotificationMessagesSubscription,
  useDeleteNotificationMessageMutation,
  useHaveReadANotificationMutation,
} from '@chirpy/client-graphql/generated/notification';

import styles from './notification-hub.module.scss';
import { NotificationItem } from './notification-item';

export function NotificationHub(): JSX.Element {
  const { data: userData } = useCurrentUser();
  const [{ data }] = useCurrentNotificationMessagesSubscription({
    variables: {
      userId: userData.id || '-1',
    },
  });
  const [{}, haveReadANotification] = useHaveReadANotificationMutation();
  const [{}, deleteNotificationMessage] = useDeleteNotificationMessageMutation();
  const hasUnreadNotifications = data?.notificationMessages.some((msg) => !msg.read);
  return (
    <div className="flex flex-row justify-center items-center mr-4">
      <Menu>
        <Menu.Button className={styles.menuButton}>
          <Bell size={22} />
          {hasUnreadNotifications && <Badge className="!bg-red-900 absolute top-1 right-1" />}
        </Menu.Button>
        <Menu.Items className={styles.menuItems}>
          <Heading as="h4" className="font-bold px-5 py-3">
            Notifications
          </Heading>
          {data?.notificationMessages?.length || 0 > 0 ? (
            <div className="w-max max-h-96 overflow-y-auto">
              {data?.notificationMessages.map((msg, index) => (
                <NotificationItem
                  key={msg.id}
                  message={msg}
                  index={index}
                  length={data?.notificationMessages.length}
                  onClickCapture={(messageId) => haveReadANotification({ messageId })}
                  onClickDelete={(messageId) => deleteNotificationMessage({ messageId })}
                />
              ))}
            </div>
          ) : (
            <Text variant="secondary" className="mx-5 pb-2">
              No messages yet
            </Text>
          )}
        </Menu.Items>
      </Menu>
    </div>
  );
}

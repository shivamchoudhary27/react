import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { getData } from '../adapters';

function NotificationOverlay() {
  const useridto = localStorage.getItem('userid');
  const [message, setMessage] = useState({ totalcount: 0, list: [] });

  useEffect(() => {
    const query = {
      wsfunction: 'message_popup_get_popup_notifications',
      useridto,
    };

    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log('Something went wrong');
          } else {
            const data = [];
            res.data.notifications.map((item) => data.push(item.subject));
            const count = Object.keys(data).length;
            setMessage({
              totalcount: count,
              list: data,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      overlay={(
        <Popover id="popover-basic">
          <Popover.Header as="h3">Notifications</Popover.Header>
          {
            message.totalcount > 0
              ? message.list.map((item, index) => (
                <Popover.Body key={index}>
                  <div>
                    {' '}
                    {item}
                    {' '}
                  </div>
                  {' '}
                </Popover.Body>
              ))
              : <Popover.Body>No new notifications</Popover.Body>
          }
        </Popover>
      )}
    >
      <li variant="success">
        <i className="fa fa-bell search-icon" />
        { message.totalcount > 0 && <sup>{message.totalcount}</sup> }
      </li>
    </OverlayTrigger>
  );
}

export default NotificationOverlay;

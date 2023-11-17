import { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { getData } from '../adapters';
import alertIcon from "../assets/images/icons/bell-icon.svg";

function NotificationOverlay(props: { userid: number; }) {
  const useridto = props.userid;
  const [message, setMessage] = useState<{totalcount: number, list: any[]}>({ totalcount: 0, list: [] });

  useEffect(() => {
    const query = {
      wsfunction: 'message_popup_get_popup_notifications',
      useridto
    };
    getData(query)
      .then(res => {
        if (res.status === 200 && res.data) {
          if (res.data.errorcode) {
            console.log('Something went wrong');
          } else {
            const data: any[] = [];
            res.data.notifications.map((item: { subject: any; }) => data.push(item.subject));
            const count = Object.keys(data).length;
            setMessage({
              totalcount: count,
              list: data
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <OverlayTrigger
      trigger={'click'}
      placement="bottom"
      overlay={
        <Popover id="popover-basic" >
          <Popover.Header as="h3">Notifications</Popover.Header>
          <Popover.Body style={{overflow: "auto", height: "500px"}}>
            {message.totalcount > 0 ? (
              message.list.map((item, index) => (
                <p key={index}> {item} </p>
              ))
            ) : (
              <p>No new notifications</p>
            )}
          </Popover.Body>
        </Popover>
      }
      rootClose
    >
      <div>
        <img src={alertIcon} alt="Alert" />
        {message.totalcount > 0 && <span>{message.totalcount}</span>}
      </div>
    </OverlayTrigger>
  );
}
export default NotificationOverlay;

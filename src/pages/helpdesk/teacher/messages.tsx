import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formattedDate, timestampToDaysAgoConverter } from "../../../lib/timestampConverter";
import "./styles.scss";
type Props = {
  getAllComment: any;
  apiStatus: string;
  customClass: string;
};

const MessagesView: React.FC<Props> = (props) => {
  const sortedComments = props.getAllComment.sort((a: any, b: any) => {
    return new Date(b.date) - new Date(a.date);
  });
  const [updatedCommentData, setUpdatedCommentData] = useState<any[]>([]);
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  useEffect(() => {
    if (sortedComments.length > 0) {
      const updatedComments = sortedComments.map(
        (comment: { firstName: any; lastName: any }) => {
          const isCurrentUser =
            currentUserInfo &&
            currentUserInfo.first_name &&
            currentUserInfo.last_name &&
            comment.firstName === currentUserInfo.first_name &&
            comment.lastName === currentUserInfo.last_name;
          return {
            ...comment,
            style: isCurrentUser ? 'user-message' : 'support-message',
            nickName: isCurrentUser ? 'You' : `${comment.firstName} ${comment.lastName}`,
          };
        }
      );
      setUpdatedCommentData(updatedComments);
    }
  }, [currentUserInfo, sortedComments]);

  // console.log(updatedCommentData);

  return (
    <div className={`helpdesk-messages-container ${props.customClass || ""}`}>
      {updatedCommentData.map((item: any, index: number) => (
        <div key={index} className={`reply-message-container ${item.style}`}>
          <div 
            className={`reply-profileimg ${item.style === 'user-message' ? 'user-profile' : 'support-profile'}`}
          >
            {item.firstName.charAt(0)}
          </div>
          <div className="chat-details">
            <div 
            className={`${item.style === 'user-message' ? 'right-text' : 'left-text'}`}
            >
              <span className="reply-nickname">
                {item.nickName
                  ? item.nickName
                  : item.firstName + " " + item.lastName}
              </span>
              <span className="chat-date"> • {formattedDate(item.date)}</span>
            </div>
            <div className={`reply-message ${item.style}`}>
              <p className="m-0">{item.comment}</p>
              {/* <span className="text-muted">
                {timestampToDaysAgoConverter(item.date)}
              </span> */}
              {/* <span className="text-muted">{item.subTitle}</span> */}
            </div>
          </div>
        </div>  
      ))}
    </div>
  );
};

export default MessagesView;

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formattedDate } from "../../../lib/timestampConverter";

type Props = {
  apiStatus: string;
  getAllComment: any;
};

const MessagesView = (props: Props) => {
  const sortedComments = props.getAllComment.sort((a: any, b: any) => {
    return new Date(b.date) - new Date(a.date);
  });
  const [updatedCommentData, setUpdatedCommentData] = useState([]);
  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);

  // set comments alternate background colors with alignment === >>
  useEffect(() => {
    if (sortedComments.length > 0) {
      const updatedComments = sortedComments.map(
        (comment: { firstName: any; lastName: any }) => {
          if (
            currentUserInfo &&
            currentUserInfo.first_name &&
            currentUserInfo.last_name &&
            comment.firstName === currentUserInfo.first_name &&
            comment.lastName === currentUserInfo.last_name
          ) {
            return {
              ...comment,
              style: {
                textAlign: "left",
                border: "2px solid #DCD7C9",
                backgroundColor: "rgba(27, 96, 157, 0.05)",
              },
              nickName: "You",
            };
          }
          return {
            ...comment,
            style: {
              textAlign: "right",
              backgroundColor: "#DCDCDC",
              border: "2px solid #DDDDDD",
            },
          };
        }
      );
      setUpdatedCommentData(updatedComments);
    }
  }, [currentUserInfo, sortedComments]);

  // console.log(updatedCommentData);

  return (
    <div
      style={{
        padding: "0 10px",
        maxHeight: "400px",
        maxWidth: "600px",
        overflowY: "auto",
      }}
    >
      {updatedCommentData.map((item: any, index: number) => (
        <div
          key={index}
          className="list-group-item list-group-item-action flex-column align-items-start"
          style={{
            margin: "10px 0",
            padding: "10px 20px",
            borderRadius: "10px",
            border: item.style.border,
            textAlign: item.style.textAlign,
            backgroundColor: item.style.backgroundColor,
          }}
        >
          <p
            style={{
              textAlign: item.style.textAlign === "left" ? "right" : "left",
            }}
          >
            <small className="text-muted mb-2">3 day ago</small>
          </p>
          <p>{item.comment}</p>
          <p className="my-3">
            <span style={{ color: "#666" }}>{formattedDate(item.date)}</span>
            <span style={{ fontWeight: "550", color: "#666" }}>
              {" "}
              -{" "}
              {item.nickName
                ? item.nickName
                : item.firstName + " " + item.lastName}
            </span>
          </p>
          <small className="text-muted">{item.subTitle}</small>
        </div>
      ))}
    </div>
  );
};

export default MessagesView;

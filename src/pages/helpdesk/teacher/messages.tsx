import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import { deleteData, putData } from "../../../adapters/microservices";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import { formattedDateTime } from "../../../lib/timestampConverter";
import "./styles.scss";

type Props = {
  apiStatus: string;
  selectedTopicId: any;
  getAllComment: any;
  customClass: string;
};

const MessagesView = (props: Props) => {
  // getAllComment is always initialized as an arra
  const commentsArray = Array.isArray(props.getAllComment)
    ? props.getAllComment
    : [];

  // Sort the comments
  const sortedComments = commentsArray.sort((a: any, b: any) => {
    return new Date(b.date) - new Date(a.date);
  });

  const currentUserInfo = useSelector((state: any) => state.userInfo.userInfo);
  const [comments, setComments] = useState<any[]>([]);
  const [editingCommentId, setEditingCommentId] = useState(0);
  const [editedComment, setEditedComment] = useState<string>("");

  useEffect(() => {
    if (sortedComments.length > 0) {
      const updatedComments = sortedComments.map((comment: any) => {
        const isCurrentUser =
          currentUserInfo &&
          currentUserInfo.first_name &&
          currentUserInfo.last_name &&
          comment.firstName === currentUserInfo.first_name &&
          comment.lastName === currentUserInfo.last_name;
        return {
          ...comment,
          style: isCurrentUser ? "user-message" : "support-message",
          nickName: isCurrentUser
            ? "You"
            : `${comment.firstName} ${comment.lastName}`,
        };
      });
      setComments(updatedComments);
    }
  }, [currentUserInfo, sortedComments]);

  const handleEditSubmit = (commentId: number) => {
    putData(`/comment/${props.selectedTopicId}/${commentId}`, {
      comment: editedComment,
    })
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // Update the specific comment in the state
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === commentId
                ? { ...comment, comment: editedComment }
                : comment
            )
          );
          setEditedComment("");
          setEditingCommentId(0);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const deleteHandler = (commentId: number) => {
    deleteData(`/comment/${commentId}`, {})
      .then((result: any) => {
        if (result.data !== "" && result.status === 200) {
          // deleted comment by id
          const deleteComments = comments.filter(
            (comment) => comment.id !== commentId
          );
          setComments(deleteComments);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const editHandler = (commentId: number, currentComment: string) => {
    setEditingCommentId(commentId);
    setEditedComment(currentComment);
  };

  return (
    <div className={`helpdesk-messages-container ${props.customClass || ""}`}>
      {comments.map((item: any, index: number) => (
        <div key={index} className={`reply-message-container ${item.style}`}>
          <div
            className={`reply-profileimg ${
              item.style === "user-message" ? "user-profile" : "support-profile"
            }`}
          >
            {item.firstName.charAt(0)}
          </div>
          <div className="chat-details">
            <div
              className={`${
                item.style === "user-message" ? "right-text" : "left-text"
              }`}
            >
              <span className="reply-nickname">
                {item.nickName
                  ? item.nickName
                  : item.firstName + " " + item.lastName}
              </span>
              <span className="chat-date">
                {" "}
                • {formattedDateTime(item.date)}
              </span>
            </div>
            <div className={`reply-message ${item.style}`}>
              {editingCommentId === item.id ? (
                <div>
                  <input
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      handleEditSubmit(item.id);
                    }}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <p className="m-0">{item.comment}</p>
              )}
            </div>
            <div>
              {item.firstName === currentUserInfo.first_name &&
                item.lastName === currentUserInfo.last_name && (
                  <>
                    <button
                      className="action-icons"
                      onClick={() => deleteHandler(item.id)}
                    >
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                    <button
                      className="action-icons"
                      onClick={() => editHandler(item.id, item.comment)}
                    >
                      <img src={editIcon} alt="Edit" />
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesView;

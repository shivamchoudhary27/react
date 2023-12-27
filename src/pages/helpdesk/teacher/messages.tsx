import React from "react";

type Props = {
  getAllComment: any;
};

const MessagesView = (props: Props) => {
  // Check if there are no comments
  if (props.getAllComment.length === 0) {
    return <p>No comments available</p>;
  }

  const sortedComments = props.getAllComment.sort((a: any, b: any) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  console.log(sortedComments);
  return (
    <div className="list-group">
      {props.getAllComment.map((item: any, index: number) => (
        <a
          href="#"
          key={index}
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.title}</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">{item.comment}</p>
          <p className="mb-1">{item.date}</p>
          <p className="mb-1">{item.firstName + " " + item.lastName}</p>
          <small className="text-muted">{item.subTitle}</small>
        </a>
      ))}
    </div>
  );
};

export default MessagesView;

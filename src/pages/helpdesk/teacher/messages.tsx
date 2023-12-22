import React from "react";

type Props = {
  getAllComment: any
};

const MessagesView = (props: Props) => {
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
          <small className="text-muted">{item.subTitle}</small>
        </a>
      ))}
    </div>
  );
};

export default MessagesView;

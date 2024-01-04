import React from "react";

type Props = {
  getAllComment: any;
};

const MessagesView = (props: Props) => {
  const sortedComments = props.getAllComment.sort((a: any, b: any) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div style={{ maxHeight: "400px", maxWidth: "600px", overflowY: "auto" }}>
      {sortedComments.length === 0 ? <p>No comments available</p> : null}
      {sortedComments.map((item: any, index: number) => {
        const formattedDate = new Date(item.date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        return (
          <div
            key={index}
            className="list-group-item list-group-item-action flex-column align-items-start"
            style={{ backgroundColor: "#DCDCDC", marginTop: 15, padding: 5 }}
          >
            <div className="d-flex w-100 justify-content-between">
              <h2 className="mb-1">
                <strong className="fs-5">{item.title}</strong>
              </h2>
              <small className="text-muted">3 day ago</small>
            </div>
            <p className="mb-1">{item.comment}</p>
            <p className="mb-1">{formattedDate}</p>
            <p className="mb-1">{item.firstName + " " + item.lastName}</p>
            <small className="text-muted">{item.subTitle}</small>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesView;



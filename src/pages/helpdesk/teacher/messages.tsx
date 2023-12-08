import React from "react";

type Props = {};

const dummydata = [
  {
    title: "List group item heading",
    message:
      "Donec id elit non mi porta gravida at eget metus. Maecenas sed diameget risus varius blandit.",
    subTitle: "Donec id elit non mi porta.",
  },
  {
    title: "List group item heading",
    message:
      "Donec id elit non mi porta gravida at eget metus. Maecenas sed diameget risus varius blandit.",
    subTitle: "Donec id elit non mi porta.",
  },
  {
    title: "List group item heading",
    message:
      "Donec id elit non mi porta gravida at eget metus. Maecenas sed diameget risus varius blandit.",
    subTitle: "Donec id elit non mi porta.",
  },
];

const MessagesView = (props: Props) => {
  return (
    <div className="list-group">
      {dummydata.map((item: any, index: number) => (
        <a
          href="#"
          key={index}
          className="list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{item.title}</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className="mb-1">{item.message}</p>
          <small className="text-muted">{item.subTitle}</small>
        </a>
      ))}
    </div>
  );
};

export default MessagesView;

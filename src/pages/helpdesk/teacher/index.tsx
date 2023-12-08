import React, { useState } from "react";
import View from "./view";
import { boolean } from "yup";

type Props = {};

const TeacherHelpdesk = (props: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const [repliesModalShow, setRepliesModalShow] = useState({
    status: false,
    action: "",
  });

  // handle modal hide & show functionality === >>>
  const toggleModalShow = (status: boolean) => {
    setModalShow(status);
  };

  const toggleRepliesModalShow = ({
    status,
    action,
  }: {
    status: boolean;
    action: string;
  }) => {
    setRepliesModalShow({ status: status, action: action });
  };

  return (
    <View
      dummyData={dummyData}
      modalShow={modalShow}
      toggleModalShow={toggleModalShow}
      onHide={() => toggleModalShow(false)}
      repliesAction={repliesModalShow.action}
      repliesModalShow={repliesModalShow.status}
      toggleRepliesModalShow={toggleRepliesModalShow}
      onRepliesHide={() =>
        toggleRepliesModalShow({ status: false, action: "" })
      }
    />
  );
};

export default TeacherHelpdesk;

const dummyData = [
  {
    topic: "Video viewing",
    latestReply:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "December 19, 2023",
    status: "Open",
  },
  {
    topic: "Video viewing",
    latestReply:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "December 19, 2023",
    status: "Open",
  },
  {
    topic: "Video viewing",
    latestReply:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "December 19, 2023",
    status: "Open",
  },
];

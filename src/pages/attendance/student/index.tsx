import React from "react";
import View from "./view";

type Props = {};

const StudentAttendance = (props: Props) => {
  return <View dummyData={dummyData} />;
};

export default StudentAttendance;

const dummyData = [
  {
    date: "30/11/2023",
    sessionType: "offline",
    present: "P",
    late: "L",
    excused: "E",
    absent: "A",
    points: 2,
  },
  {
    date: "30/11/2023",
    sessionType: "offline",
    present: "P",
    late: "L",
    excused: "E",
    absent: "A",
    points: 2,
  },
  {
    date: "30/11/2023",
    sessionType: "offline",
    present: "P",
    late: "L",
    excused: "E",
    absent: "A",
    points: 2,
  },
];

import View from "./view";

type Props = {};

const TeacherAttendance = (props: Props) => {
  return <View dummyData={dummyData} />;
};

export default TeacherAttendance;

const dummyData = [
  {
    fullname: "Alok Rai",
    email: "test@gmail.com",
    sessionType: "offline",
    present: 16,
    late: 3,
    excused: 1,
    absent: 5,
    points: 86,
    percentage: "75%",
    nov30: "P",
    nov29: "P",
    nov28: "A",
    nov27: "E",
    nov25: "L",
    nov24: "P",
  },
  {
    fullname: "Alok Rai",
    email: "test@gmail.com",
    sessionType: "offline",
    present: 16,
    late: 3,
    excused: 1,
    absent: 5,
    points: 86,
    percentage: "75%",
    nov30: "P",
    nov29: "P",
    nov28: "A",
    nov27: "E",
    nov25: "L",
    nov24: "P",
  },
  {
    fullname: "Alok Rai",
    email: "test@gmail.com",
    sessionType: "offline",
    present: 16,
    late: 3,
    excused: 1,
    absent: 5,
    points: 86,
    percentage: "75%",
    nov30: "P",
    nov29: "P",
    nov28: "A",
    nov27: "E",
    nov25: "L",
    nov24: "P",
  },
];

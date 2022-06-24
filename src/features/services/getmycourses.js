import { getData } from "./../../adapters/index";

const getMyCourses = (props) => {
  const userid = localStorage.getItem("userid");
  const wstoken = localStorage.getItem("token");

  const query = {
    moodlewsrestformat: "json",
    wstoken: wstoken,
    wsfunction: "core_enrol_get_users_courses",
    userid: userid,
  };

  getData(query)
    .then((res) => {
        // console.log('mycourses response')
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getMyCourses;

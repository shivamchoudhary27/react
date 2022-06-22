import { getData } from "./../../../adapters/index";
const getUserProfile = () => {
  const wstoken = localStorage.getItem("token");
  const query = {
    wsfunction: "core_webservice_get_site_info",
    serviceshortnames: ["moodle_mobile_app"],
    wstoken: wstoken,
    moodlewsrestformat: "json",
  };
  getData(query)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
getUserProfile();
//core_enrol_get_users_courses

export { getUserProfile };

import usermanagement from '../../../assets/images/user-management.png';
import manageprogram from '../../../assets/images/program-management.png';
import programenrollment from '../../../assets/images/program-enrollment.png';
import copomanagement from '../../../assets/images/copo-management.png';
import timetablemanagement from '../../../assets/images/timetable-management.png';
import calendaermanagement from '../../../assets/images/timetable-management.png';
export const AdminRawData = [
  [
    {
      title: "Institute <br>Management",
      image: copomanagement,
      link: "/institute",
      classname: "institute-management",
      boxclassname: "",    
    },
    {
      title: "User <br>Management",
      image: usermanagement,
      link: "/usermanagement",
      classname: "user-management",
      boxclassname: "middle",
    },
    {
      title: "Program <br>Management",
      image: manageprogram,
      link: "/manageprogram",
      classname: "manage-program",
      boxclassname: "",
    }    
  ],
  [
    {
      title: "Program <br>Enrollment",
      image: programenrollment,
      link: "/programenrollment",
      classname: "program-enrollment",
      boxclassname: "row2box",
    },    
    {
      title: "Timetable <br>Management",
      image: timetablemanagement,
      link: "#",
      classname: "timetable-management",
      boxclassname: "",
    },
    {
      title: "Calendar <br>Management",
      image: calendaermanagement,
      link: "/calenderconfig",
      classname: "calender-config",
      boxclassname: "row2box",
    }
  ],
  [
    {
      title: "CO / PO <br>Management",
      image: copomanagement,
      link: "#",
      classname: "copo-management",
      boxclassname: "",    
    },    
  ]
];

import institutemanagement from '../../../assets/images/institute-management.png';
import usermanagement from '../../../assets/images/user-management.png';
import manageprogram from '../../../assets/images/program-management.png';
import programenrollment from '../../../assets/images/program-enrollment.png';
import copomanagement from '../../../assets/images/copo-management.png';
import timetablemanagement from '../../../assets/images/timetable-management.png';
export const AdminRawData = [
  [    
    {
      title: "User <br>Management",
      image: usermanagement,
      link: "/usermanagement",
      classname: "user-management",
      boxclassname: "",
      component: 'user',
      enabled: true,
    },
    {
      title: "Program <br>Management",
      image: manageprogram,
      link: "/manageprogram",
      classname: "manage-program",
      boxclassname: "middle",
      component: 'program',
      enabled: true,
    },
    {
      title: "Program <br>Enrollment",
      image: programenrollment,
      link: "/programenrollment",
      classname: "program-enrollment",
      boxclassname: "",
      component: 'enrolment',
      enabled: true,
    },
  ],
  [        
    {
      title: "Teaching Resource <br> Planner",
      image: timetablemanagement,
      link: "/timetable",
      classname: "timetable-management",
      boxclassname: "row2box",
      component: 'timetable',
      enabled: true,
    },
    {
      title: "CO / PO <br>Management",
      image: copomanagement,
      link: "/copomanagement",
      classname: "copo-management",
      boxclassname: "",  
      component: 'copo',
      enabled: true,
    },
    {
      title: "Institute <br>Management",
      image: institutemanagement,
      link: "/institute",
      classname: "institute-management",
      boxclassname: "row2box",   
      component: 'institute',
      enabled: true,
    }
  ]
];

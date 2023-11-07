import "./style.scss";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { getData } from "../../../../../adapters";
import React, { useState, useEffect } from "react";
import { isMobile, isDesktop } from "react-device-detect";
import badgesIcon from "../../../../../assets/images/icons/badges.svg"
import avGreadeIcon from "../../../../../assets/images/icons/grade.svg";
import creditsIcon from "../../../../../assets/images/icons/credits.svg";
import certificateIcon from "../../../../../assets/images/icons/certificates.svg";

type Props = {}

const PerformanceOverview: React.FC<Props> = (props) => {
  const id = localStorage.getItem("userid");
  const [dummyObj, setDummyObj] = useState({
    badges: {
      totalbadges: 0,
      userbadges: 0,
    },
    credits: 0,
    grades: {
      maxgrades: 0,
      usergrade: 0,
    },
    usercertificates: 0,
  });
  const [userPerformance, setUserPerformance] = useState(dummyObj);

  useEffect(() => {
    const query = {
      wsfunction: "block_performanceoverview_user_performance_overview",
      userid: id,
    };

    getData(query)
      .then((res: any) => {
        if (res.status === 200 && res.data !== "") {
          const dataObject = JSON.parse(res.data.info);
          setUserPerformance(dataObject);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [id]);

  const data = [
    {
      icon: avGreadeIcon,
      title: "Av. Grade",
      value:
        userPerformance.grades.usergrade !== 0
          ? (
              (userPerformance.grades.usergrade /
                userPerformance.grades.maxgrades) *
              100
            ).toFixed(2) + " %"
          : 0 + "%",
      progressValue:
        userPerformance.grades.usergrade !== 0
          ? (
              (userPerformance.grades.usergrade /
                userPerformance.grades.maxgrades) *
              100
            ).toFixed(2)
          : 0,
    },
    {
      icon: badgesIcon,
      title: "Badges",
      value: `${userPerformance.badges.userbadges} / ${userPerformance.badges.totalbadges}`,
      progressValue:
        userPerformance.badges.userbadges !== 0
          ? (userPerformance.badges.userbadges /
              userPerformance.badges.totalbadges) *
            100
          : 0,
    },
    {
      icon: certificateIcon,
      title: "Certificates",
      value: userPerformance.usercertificates,
      progressValue: userPerformance.usercertificates,
    },
    {
      icon: creditsIcon,
      title: "Credits",
      value: userPerformance.credits,
      progressValue: userPerformance.credits,
    },
  ];

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile data={data} />
      ) : isDesktop ? (
        <Browser data={data} />
      ) : (
        <Browser data={data} />
      )}
    </React.Fragment>
  );
};

export default PerformanceOverview;

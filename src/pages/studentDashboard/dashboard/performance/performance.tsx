import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import avGreadeIcon from "../../../../assets/images/icons/grade.svg";
import badgesIcon from "../../../../assets/images/icons/badges.svg";
import certificateIcon from "../../../../assets/images/icons/certificates.svg";
import creditsIcon from "../../../../assets/images/icons/credits.svg";
import "./style.scss";
import { getData } from "../../../../adapters";

const PerformanceOverview = () => {
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

  console.log(userPerformance);

  const data = [
    {
      icon: avGreadeIcon,
      title: "Av. Grade",
      value:
        (userPerformance.grades.usergrade / userPerformance.grades.maxgrades) *
          100 +
        " %",
      progressValue:
        (userPerformance.grades.usergrade / userPerformance.grades.maxgrades) *
        100,
    },
    {
      icon: badgesIcon,
      title: "Badges",
      value: `${userPerformance.badges.userbadges} / ${userPerformance.badges.totalbadges}`,
      progressValue:
        (userPerformance.badges.userbadges /
          userPerformance.badges.totalbadges) *
        100,
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
    <>
      <div className="mitblock performanceOverview-block">
        <h3 className="mitblock-title">Performance Overview</h3>
        <div className="mitblock-body">
          <Container fluid>
            <Row>
              {data.map((item, index) => (
                <Col sm={6} key={index}>
                  <div className="d-flex align-items-center pob-row">
                    <img className="pob-icon" src={item.icon} alt="Av. Grade" />
                    <div className="d-flex flex-column flex-fill">
                      <div className="d-flex justify-content-between pob-info">
                        <span>{item.title}</span>
                        <span>{item.value}</span>
                      </div>
                      <ProgressBar now={item.progressValue} />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PerformanceOverview;

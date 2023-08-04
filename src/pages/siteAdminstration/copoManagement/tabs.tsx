import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import DefineCos from "./defineCos";
import LevelThreshold from "./levelThreshold";
import LevelThreshold2 from "./levelThreshold2";
import MappingTable from "./mappingTable";
import AssessmentTable from "./assessmentTable";
import AttainmentTable from "./attainmentTable";

type Props = {};

const TabsList = (props: Props) => {
  return (
    <React.Fragment>
      <Tabs
        defaultActiveKey="define"
        id="uncontrolled-tab-example"
      >
        {tabsListData.map((item, index) => (
          <Tab key={index} eventKey={item.eventKey} title={item.title}>
            {item.contentsRender}
          </Tab>
        ))}
      </Tabs>
    </React.Fragment>
  );
};

export default TabsList;

const tabsListData = [
  {
    eventKey: "define",
    title: "Define CO's",
    contentsRender: <DefineCos />,
  },
  {
    eventKey: "setlevel1",
    title: "Set level threshold for CO's",
    contentsRender: <LevelThreshold />,
  },
  {
    eventKey: "setlevel2",
    title: "Set level threshold for CO's",
    contentsRender: <LevelThreshold2 />,
  },
  {
    eventKey: "mapping",
    title: "Mapping of CO's to PO's and PSO's",
    contentsRender: <MappingTable />,
  },
  {
    eventKey: "assessment",
    title: "Select Assessment for CO's(Direct)",
    contentsRender: <AssessmentTable />,
  },
  {
    eventKey: "attainment",
    title: "Attainment of Course Outcomes",
    contentsRender: <AttainmentTable />,
  },
];

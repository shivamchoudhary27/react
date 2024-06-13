import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DefineCos from "./defineCos/defineCos";
import LevelThreshold from "./levelThreshold";
import LevelThreshold2 from "./levelThreshold2";
import MappingCOsPOsPSOs from "./mappingCosPos";
import AssessmentForCOs from "./assessmentCos";
import ViewCOsPOsPSOs from "./attainmentProgram/index";
import AttainmentCourseOutcome from "./attainmentCourse";

type Props = {};

const TabsList = (props: Props) => {
  const [activeTab, setActiveTab] = useState<number>(0); // State to manage active tab index
  const [refreshTab, setRefreshTab] = useState(false);

  const handleNextTab = () => {
    setActiveTab((prevTab) =>
      prevTab === tabsListData.length - 1 ? 0 : prevTab + 1
    ); // Move to the next tab
  };

  const handlePrevTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 0 ? tabsListData.length - 1 : prevTab - 1
    ); // Move to the previous tab
  };

  const tabRefreshToggle = () => {
    setRefreshTab(!refreshTab);
  };

  const tabsListData = [
    {
      eventKey: "define",
      title: "Define CO's",
      contentsRender: <DefineCos setActiveTab={setActiveTab} />,
    },
    {
      eventKey: "setlevel1",
      title: "Set target level of CO's",
      contentsRender: (
        <LevelThreshold
          setActiveTab={setActiveTab}
          tabRefreshToggle={tabRefreshToggle}
          activeTab={activeTab}
          refreshTab={refreshTab}
        />
      ),
    },
    {
      eventKey: "setlevel2",
      title: "Set level threshold for CO's",
      contentsRender: (
        <LevelThreshold2
          setActiveTab={setActiveTab}
          tabRefreshToggle={tabRefreshToggle}
          refreshTab={refreshTab}
          activeTab={activeTab}
        />
      ),
    },
    {
      eventKey: "mapping",
      title: "Mapping of CO's to PO's and PSO's",
      contentsRender: (
        <MappingCOsPOsPSOs
          refreshTab={refreshTab}
          setActiveTab={setActiveTab}
          tabRefreshToggle={tabRefreshToggle}
          activeTab={activeTab}
        />
      ),
    },
    {
      eventKey: "assessment",
      title: "Select Assessment for CO's(Direct)",
      contentsRender: (
        <AssessmentForCOs
          setActiveTab={setActiveTab}
          tabRefreshToggle={tabRefreshToggle}
          refreshTab={refreshTab}
          activeTab={activeTab}
        />
      ),
    },
    {
      eventKey: "attainment",
      title: "Attainment of Course Outcomes",
      contentsRender: (
        <AttainmentCourseOutcome
          setActiveTab={setActiveTab}
          tabRefreshToggle={tabRefreshToggle}
          refreshTab={refreshTab}
          activeTab={activeTab}
        />
      ),
    },
    {
      eventKey: "view",
      title: "Attainment of Program Outcomes",
      contentsRender: (
        <ViewCOsPOsPSOs
          setActiveTab={setActiveTab}
          tabRefreshToggle={tabRefreshToggle}
          refreshTab={refreshTab}
          activeTab={activeTab}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      {/* mobile tabs  */}
      <div className="mob-copo-tabs">
        <div className="text-center d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePrevTab}
          >
            Previous
          </button>
          <span className="current-tab-title px-2">
            {tabsListData.length > 0 && tabsListData[activeTab].title}
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleNextTab}
          >
            Next
          </button>
        </div>
        <div className="current-tab-info text-center">
          {Array.from({ length: tabsListData.length }).map((_, index) => (
            <span
              key={index}
              className={`tab-circle ${activeTab === index ? "active" : ""}`}
            />
          ))}
        </div>
        {/* Display tab number */}
        {/* <span className="current-tab-info">
          {activeTab + 1}/{tabsListData.length}
        </span> */}
      </div>

      {/* Desktop tabs  */}

      <Tabs
        activeKey={activeTab}
        onSelect={(index) => setActiveTab(index as unknown as number)}
        id="uncontrolled-tab-example"
        className="tabStep-indicator desk-copo-tabs"
      >
        {tabsListData.map((item, index) => (
          <Tab key={index} eventKey={index} title={item.title}>
            {item.contentsRender}
          </Tab>
        ))}
      </Tabs>
    </React.Fragment>
  );
};

export default TabsList;

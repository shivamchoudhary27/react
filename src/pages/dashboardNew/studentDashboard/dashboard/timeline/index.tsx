import "./style.scss";
import Mobile from "./view/mobile";
import Browser from "./view/browser";
import { getData } from "../../../../../adapters";
import React, { useState, useEffect } from "react";
import { isMobile, isDesktop } from "react-device-detect";

const Timeline = () => {
  const dummyData = {
    info: "",
    status: "",
  };
  const [blTimeline, setBlTimeline] = useState(dummyData);
  const [apiStatus, setApiStatus] = useState("");
  const userId = localStorage.getItem("userid");
  console.log(userId)

  useEffect(() => {
    const query = {
      wsfunction: `block_bltimeline_get_calendarevent_sortbydate`,
      userid: userId
    };
    setApiStatus("started");
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data !== "") {
          console.log(res.data)
          setBlTimeline(res.data);
          setApiStatus("finished");
        }
      })
      .catch((err) => {
        console.log(err);
        setApiStatus("finished");
      });
  }, []);

  return (
    <React.Fragment>
      {isMobile ? (
        <Mobile blTimeline={blTimeline} apiStatus={apiStatus} />
      ) : isDesktop ? (
        <Browser blTimeline={blTimeline} apiStatus={apiStatus} />
      ) : (
        <Browser blTimeline={blTimeline} apiStatus={apiStatus} />
      )}
    </React.Fragment>
  );
};

export default Timeline;

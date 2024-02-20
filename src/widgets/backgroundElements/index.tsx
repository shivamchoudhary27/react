import React from 'react';
import "./style.scss";
import bgLeft from '../../assets/images/background/bg-admin-left.svg';
import bgRight from '../../assets/images/background/bg-admin-right.svg';
import BottomWave from "../../assets/images/background/bg-bottom.svg";
import BottomLeftWave from "../../assets/images/background/bg-bottomleft.svg";



export const BackgroundWaveLeft = () => {
  return (
    <div className="position-relative">
      <img src={bgLeft} className="bg-left" alt="bg-left" />
    </div>
  );
};

export const BackgroundWaveRight = () => {
  return (
    <div>
      <img src={bgRight} className="bg-right" alt="bg-right" />
    </div>
  );
};
export const BackgroundWaveBottomRight = () => {
  return (
    <div className="bottom-bg">
    <img src={BottomWave} alt="bottom wave" />
  </div>
  );
};
export const BackgroundWaveTopLeft = () => {
  return (
    <div className="position-relative">
    <img src={bgLeft} className="left-cicle" alt="left-cicle" />
    </div>
  );
};
export const BackgroundWaveBottomLeft = () => {
  return (
    <div className="bottomLeftWave">
        <img src={BottomLeftWave} alt="bottom wave" />
      </div>
  );
};
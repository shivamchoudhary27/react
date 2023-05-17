import React from "react";
import Header from "../newHeader";
import HeaderTabs from "../headerTabs";
import Footer from "../newFooter";
import { Container } from "react-bootstrap";
import ProgramTabs from "./programTabs";
import KeyInformation from "./keyInformation";
import Curriculum from "./curriculum";
import Instructor from "./instructor";
import Feedback from "./feedback";

const ProgramOverview = () => {
  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab=""/>
      <div className="contentarea-wrapper">
        <div
          style={{ backgroundColor: "#666", color: "#f1f1f1", padding: "2rem" }}
        >
          <h3>
            Bachelor of Arts Mass Communication and Journalism (Honours) | BA
            (MCJ) (Hons.)
          </h3>
        </div>
        <Container fluid className="administration-box">
          <div className="row" style={{ marginTop: "2rem" }}>
            <div className="col-md-9">
              <div>
                <p>
                  B.A Hons. in MCJ (Bachelor of Mass Communication and
                  Journalism) is a three year undergraduate degree programme for
                  candidates who wish to build their career in the field of
                  journalism, mass communication, advertising, film production
                  and public relation.
                </p>
                <p>
                  Candidates who successfully complete B.A. Hons. in MCJ can
                  choose to work for news channels, newspapers, publishing
                  houses, television, radio, internet, digital media,
                  advertising agencies etc. and earn a healthy remuneration.
                </p>
              </div>
              <ProgramTabs />
              <Curriculum />
              <Instructor />
              <Feedback />
            </div>
            <div className="col-md-3">
              <KeyInformation />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProgramOverview;

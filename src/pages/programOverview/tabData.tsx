import React from "react";
import { ListGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";

const checkbox = (
  <Form.Check type="checkbox" style={{ display: "inline-block" }} />
);

const TabData = () => {
  return (
    <React.Fragment>
      <ListGroup>
        <ListGroup.Item>
          {checkbox} The Communication and Media Studies prepare students for a
          wide variety of careers in business and industry, advertising, public
          relations and journalism.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} This program will empower the learners with professional
          skills essential to carve out their career in Entertainment industry,
          Cinema, Television, OTT Platforms, social media etc.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} Students would demonstrate the ability to apply these
          principles in diverse organizational, professional, creative,
          cinematic and journalistic venues.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} Students would develop a global awareness of political,
          social and corporate issues influenced by communication sensitivity
          and skills.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} Students will find mass media as an array of interrelated
          forces like historical foundations, regulatory constraints, economical
          changes, technological advancements, and ethical issues.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} This program will also give them an improved sense of
          self-confidence and self- efficacy and an awareness of their
          responsibilities as professionals in their field.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} Students will be able to design and create new media
          products, including blogs, digital audio & video, social media,
          digital photography, and multimedia.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} Students will be better equipped to grasp the complex
          relationship between communication/media theories and a diverse set of
          individual, social, and professional practices.
        </ListGroup.Item>
        <ListGroup.Item>
          {checkbox} Students will comprehend the foundations, process, and
          practices of writing for and about the media, and demonstrate
          proficiency in writing across different platform.
        </ListGroup.Item>
        <ListGroup.Item>{checkbox} Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default TabData;

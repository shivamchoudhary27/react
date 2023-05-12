import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { CategoriesType } from "../../type";

const AccordianDropdown = ({
  filterToggle,
  categories,
  handleChecked,
}: any) => {
  return (
    <React.Fragment>
      {filterToggle && (
        <div className="col-sm-3 ai-left-column">
          <div className="ai-accordian-sticky">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Categories List</Accordion.Header>
                <Accordion.Body>
                  {categories.map(
                    (el: CategoriesType, i: number) =>
                      el.coursecount !== 0 && (
                        <p className="photoshop-item" key={i}>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              handleChecked(e, el.id);
                            }}
                          />
                          <label className="photoshop-checkbox">
                            {" "}
                            {el.name}
                          </label>{" "}
                          <span>{`(${el.coursecount})`}</span>
                        </p>
                      )
                  )}
                  <p className="catalogue-show-more-btn">Show More</p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="course-level">
                <Accordion.Header>Level</Accordion.Header>
                <Accordion.Body>
                  <p>
                    <input type="checkbox" />
                    <label className="photoshop-checkbox">
                      {" "}
                      All Level (805)
                    </label>
                  </p>
                  <p>
                    <input type="checkbox" />
                    <label className="photoshop-checkbox">
                      {" "}
                      Beginner (205)
                    </label>
                  </p>
                  <p>
                    <input type="checkbox" />
                    <label className="photoshop-checkbox">
                      {" "}
                      Intermediate (375)
                    </label>
                  </p>
                  <p>
                    <input type="checkbox" />
                    <label className="photoshop-checkbox"> Expert (225)</label>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AccordianDropdown;

import React from "react";
import Swal from "sweetalert2";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import "sweetalert2/src/sweetalert2.scss";
import { Formik, Form, Field } from "formik";
import { RotatingLines } from "react-loader-spinner";
import PageTitle from "../../../../widgets/pageTitle";
import MobileHeader from "../../../newHeader/mobileHeader";
import MobileFooter from "../../../newFooter/mobileFooter";
import CkEditor from "../../../../widgets/editor/CKEditor";
import { postData } from "../../../../adapters/coreservices";
import { Container, Row, Col, Alert } from "react-bootstrap";
import BreadcrumbComponent from "../../../../widgets/breadcrumb";
import FieldLabel from "../../../../widgets/formInputFields/labels";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import {
  BackgroundWaveTopLeft,
  BackgroundWaveBottomRight,
} from "../../../../widgets/backgroundElements";

type Props = {
  commonProps: {
    tabTitles: any;
    loading: boolean;
    apiStatus: string;
    toggleRefresh: any;
    mailConfigData: any;
    setSelectedTab: any;
    initialSubject: string;
    getConfigApiStatus: string;
    initialDescription: string;
  };
};

const Mobile = (props: Props) => {
  //   handle form submit === >>
  const handleFormSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    let newValue = [
      { configKey: values.config_1, configValue: values.subject },
      {
        configKey: values.config_0,
        configValue: values.description,
      },
    ];
    setSubmitting(true);
    postData("config/save", newValue)
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          setSubmitting(false);
          Swal.fire({
            timer: 3000,
            width: "25em",
            color: "#666",
            icon: "success",
            background: "#e7eef5",
            showConfirmButton: false,
            text: "Mail has been successfully added.",
          });
          props.commonProps.toggleRefresh();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <MobileHeader />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Mail Templates Configuration", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="my-3">
          <Container fluid>
            <PageTitle
              pageTitle="Mail Templates Configuration"
              gobacklink="/dashboard"
              className="mt-2"
            />
            {props.commonProps.getConfigApiStatus === "started" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "500px",
                }}
              >
                <RotatingLines
                  visible={true}
                  height="50"
                  width="50"
                  strokeWidth="5"
                  strokeColor="#1B609D"
                  animationDuration="0.2"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  {props.commonProps.tabTitles.length > 0 &&
                    props.commonProps.tabTitles.map(
                      (tabTitle: any, index: number) => (
                        <>
                          <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                              <Nav.Item>
                                <Nav.Link
                                  eventKey={index}
                                  onClick={() =>
                                    props.commonProps.setSelectedTab(tabTitle)
                                  }
                                >
                                  {tabTitle}
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col sm={9}>
                            {props.commonProps.apiStatus === "finished" && (
                              <Tab.Content>
                                <Tab.Pane eventKey={index}>
                                  <Formik
                                    initialValues={{
                                      subject: props.commonProps.initialSubject,
                                      description:
                                        props.commonProps.initialDescription,
                                      ...props.commonProps.mailConfigData
                                        .filter(
                                          (item: { tabTitle: any }) =>
                                            item.tabTitle === tabTitle
                                        )
                                        .reduce(
                                          (
                                            acc: { [x: string]: any },
                                            item: { config: any },
                                            index: any
                                          ) => {
                                            acc[`config_${index}`] =
                                              item.config;
                                            return acc;
                                          },
                                          {}
                                        ),
                                    }}
                                    onSubmit={(values, action) => {
                                      handleFormSubmit(values, action);
                                    }}
                                  >
                                    {({ isSubmitting, handleChange }) => (
                                      <Form>
                                        <div className="d-flex flex-column">
                                          {props.commonProps.mailConfigData
                                            .filter(
                                              (item: { tabTitle: any }) =>
                                                item.tabTitle === tabTitle
                                            )
                                            .sort(
                                              (
                                                a: { type: string },
                                                b: { type: string }
                                              ) => {
                                                if (
                                                  a.type === "textfield" &&
                                                  b.type === "textarea"
                                                ) {
                                                  return -1;
                                                } else if (
                                                  a.type === "textarea" &&
                                                  b.type === "textfield"
                                                ) {
                                                  return 1;
                                                }
                                                return 0;
                                              }
                                            )
                                            .map(
                                              (
                                                item: {
                                                  availableVariables:
                                                    | string
                                                    | number
                                                    | boolean
                                                    | React.ReactElement<
                                                        any,
                                                        | string
                                                        | React.JSXElementConstructor<any>
                                                      >
                                                    | Iterable<React.ReactNode>
                                                    | React.ReactPortal
                                                    | null
                                                    | undefined;
                                                  type: string;
                                                  label: any;
                                                },
                                                index:
                                                  | React.Key
                                                  | null
                                                  | undefined
                                              ) => (
                                                <>
                                                  {index === 0 && (
                                                    <Alert
                                                      variant="primary"
                                                      className="mt-3"
                                                    >
                                                      <strong>Note: </strong>
                                                      {item.availableVariables}
                                                    </Alert>
                                                  )}
                                                  <React.Fragment key={index}>
                                                    <Field
                                                      type="text"
                                                      name={`config_${index}`}
                                                      hidden
                                                    />
                                                    {item.type ===
                                                      "textfield" && (
                                                      <>
                                                        <FieldLabel
                                                          htmlfor="subject"
                                                          labelText={item.label}
                                                          className="mb-1 mt-2"
                                                          // required="required"
                                                        />
                                                        <Field
                                                          type="text"
                                                          name="subject"
                                                          placeholder="Subject"
                                                          className="mb-2"
                                                        />
                                                      </>
                                                    )}
                                                    {item.type ===
                                                      "textarea" && (
                                                      <>
                                                        <FieldLabel
                                                          htmlfor="description"
                                                          labelText={item.label}
                                                          className="mb-1 mt-2"
                                                          // required="required"
                                                        />
                                                        <CkEditor
                                                          name="description"
                                                          handleChange={
                                                            handleChange
                                                          }
                                                        />
                                                      </>
                                                    )}
                                                  </React.Fragment>
                                                </>
                                              )
                                            )}

                                          {isSubmitting === false ? (
                                            <div className="modal-buttons my-3">
                                              <CustomButton
                                                type="submit"
                                                variant="primary"
                                                isSubmitting={isSubmitting}
                                                btnText="Submit"
                                              />
                                              {/* <CustomButton
                                                type="reset"
                                                btnText="Reset"
                                                variant="outline-secondary"
                                              /> */}
                                            </div>
                                          ) : (
                                            <LoadingButton
                                              variant="primary"
                                              btnText="Submitting..."
                                              className="modal-buttons"
                                            />
                                          )}
                                        </div>
                                      </Form>
                                    )}
                                  </Formik>
                                </Tab.Pane>
                              </Tab.Content>
                            )}
                          </Col>
                        </>
                      )
                    )}
                  {props.commonProps.loading != false && <h5>Loading...</h5>}
                </Row>
              </Tab.Container>
            )}
          </Container>
        </div>
      </div>
      <MobileFooter />
      <BackgroundWaveTopLeft />
      <BackgroundWaveBottomRight />
    </React.Fragment>
  );
};

export default Mobile;

import Header from "../newHeader";
import Footer from "../newFooter";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Formik, Form, Field } from "formik";
import HeaderTabs from "../headerTabs";
import { Container } from "react-bootstrap";
import PageTitle from "../../widgets/pageTitle";
import React, { useState, useEffect } from "react";
import CkEditor from "../../widgets/editor/CKEditor";
import BreadcrumbComponent from "../../widgets/breadcrumb";
import { getData, postData } from "../../adapters/coreservices";
import CustomButton from "../../widgets/formInputFields/buttons";

type Props = {};

const initialValues = {
  configKey: "",
  configValue: ""
};

const AdminSiteConfiguration = (props: Props) => {
  const [keyTitle, setKeyTitle] = useState({});
  const [mailConfigData, setMailConfigData] = useState([]);
  const [tabTitles, setTabTitles] = useState<any>([]);

  // call API to get config data === >>>
  useEffect(() => {
    let endPoint = `/config`;
    getData(endPoint, {}).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        setMailConfigData(res.data);
        const tabTitlesList = [
          ...new Set(res.data.map((item) => item.tabTitle)),
        ];
        setTabTitles(tabTitlesList);
      }
    });
  }, []);

  useEffect(() => {
    let x = {};
    tabTitles.forEach((item: any) => {
      let y = [];
      mailConfigData.forEach((el: any) => {
        if (el.tabTitle === item) {
          y.push(el);
        }
        x[item] = y;
      });
    });
    setKeyTitle(x);
  }, [tabTitles, mailConfigData]);

  const handleFormSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    postData('config/save', values).then((res: any) => {
      if (res.data !== "" && res.status === 200) {
        console.log(res)
      }
    });
  }

  return (
    <React.Fragment>
      <Header />
      <HeaderTabs activeTab="" />
      <BreadcrumbComponent
        routes={[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Configuration", path: "" },
        ]}
      />
      <div className="contentarea-wrapper mb-wraper">
        <div className="contentarea-wrapper mt-3 mb-5">
          <Container fluid>
            <PageTitle pageTitle="Configuration" gobacklink="/dashboard" />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                {tabTitles.length > 0 &&
                  tabTitles.map((tab: any, index: number) =>
                    Object.entries(keyTitle).map(
                      ([Key, Value]) =>
                        Key === tab && (
                          <div key={index}>
                            <Col sm={3}>
                              <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                  <Nav.Link eventKey={index}>{tab}</Nav.Link>
                                </Nav.Item>
                              </Nav>
                            </Col>
                            <Col sm={9}>
                              <Tab.Content>
                                <Tab.Pane eventKey={index}>
                                  <Formik
                                    initialValues={initialValues}
                                    // validationSchema={queryFormSchema}
                                    onSubmit={(values, action) => {
                                      handleFormSubmit(values, action);
                                      // console.log(values)
                                    }}
                                  >
                                    {({
                                      errors,
                                      touched,
                                      isSubmitting,
                                      setFieldValue,
                                      handleChange
                                    }) => (
                                      <Form>
                                        <div className="d-flex flex-column">
                                          {Value.map(
                                            (item) => item.type
                                          ).includes("textfield") && (
                                            <Field type="text" name="configKey" placeholder="Subject" />
                                          )}
                                          {Value.map(
                                            (item) => item.type
                                          ).includes("textarea") && (
                                            <CkEditor name="configValue" handleChange={handleChange} />
                                          )}
                                          <div>
                                            <CustomButton
                                              type="submit"
                                              variant="primary"
                                              btnText="Submit"
                                            />{" "}
                                            <CustomButton
                                              type="reset"
                                              btnText="Reset"
                                              variant="outline-secondary"
                                            />
                                          </div>
                                        </div>
                                      </Form>
                                    )}
                                  </Formik>
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </div>
                        )
                    )
                  )}
              </Row>
            </Tab.Container>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AdminSiteConfiguration;

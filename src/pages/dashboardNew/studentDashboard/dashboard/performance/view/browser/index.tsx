import { Container, Row, Col, ProgressBar } from "react-bootstrap";

type Props = {
    data: any[]
};

const Browser: React.FC<Props> = ({data}) => {
  return (
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
  );
};

export default Browser;

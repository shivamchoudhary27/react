import "./style.scss";
import View from "./view";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminRawData } from "./rawData";
import { useSelector } from "react-redux";
import PriceRequestModal from "../../../widgets/priceRequestModal/PriceRequestModal";

const SiteAdminHome = () => {
  const [showModal, setShowModal] = useState(false);
  
  const permissions = useSelector(
    (state: any) => state.userAuthorities.permissions
    );
    
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const renderComponent = (item: any, index: number) => {
    let componentEnabled = true;
    if (item.component === "user" && !permissions.user.canView) {
      componentEnabled = false;
    } else if (item.component === "program" && !permissions.program.canView) {
      componentEnabled = false;
    } else if (
      item.component === "enrolment" &&
      !permissions.enrolment.program.canView
    ) {
      componentEnabled = false;
    } else if (
      item.component === "institute" &&
      !permissions.institute.canView
    ) {
      componentEnabled = false;
    }

    item.enabled = !componentEnabled;
    item.link = !componentEnabled ? "#" : item.link;

    return (
      <div key={index} className={`box ${item.boxclassname}`}>
        <Link
          to={item.link}
          onClick={() => {
            if (item.component === "copo") {
              handleShowModal();
            }
          }}
          className={`default-item ${item.classname}`}
          style={
            item.enabled
              ? { opacity: 0.4, boxShadow: "none", cursor: "not-allowed" }
              : { opacity: "none" }
          }
        >
          <h4
            className="card-title"
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
          <img src={item.image} alt={item.title} className="img-fluid" />
        </Link>
      </div>
    );
  };

  return (
    <>
      <View adminRawData={AdminRawData} renderComponent={renderComponent} />
      <PriceRequestModal show={showModal} handleClose={handleCloseModal}/>
    </>
  )
};

export default SiteAdminHome;

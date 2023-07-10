import React, { useState, useEffect } from "react";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import { postData } from "../../../../adapters/coreservices";
import { useNavigate } from "react-router-dom";

const RolesDataRender = ({ assignRoles, currentInstitute, apiStatus, userId, btnHideStatus, roleContextDatas, selectedContextIds }: any) => {
  const navigate = useNavigate();
  const [roleAssignment, setRoleAssignment] = useState<any>(assignRoles);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handleContextIds, setHandleContextIds] = useState<any>(selectedContextIds);

  useEffect(() => {
    setRoleAssignment(assignRoles);
  }, [assignRoles]);

  useEffect(() => {
    setHandleContextIds(selectedContextIds);
  }, [selectedContextIds]);

  const toggleRoleAssignment = (roleId: number, contextType: any, element: any) => {
    const updatedData = roleAssignment.map((item: any) => {
      if (item.id === roleId) {
        return { ...item, assigned: !item.assigned };
      }
      return item;
    });
    setRoleAssignment(updatedData);
  };

  const savePermissions = () => {
    const newAssignedRoles = roleAssignment.filter(
      (packet: any) => packet.assigned === true
    ).map((chosenRole: any) => (
      chosenRole.contextType !== null
      ?{...chosenRole, contextIds: handleContextIds[chosenRole.contextType]}
      :{...chosenRole}
    ));
    console.log('saving role packet', newAssignedRoles)
    setIsSubmitting(true);
    postData(`/${currentInstitute}/${userId}/user-roles`, newAssignedRoles)
      .then((res: any) => {
        if (res.status === 200) {
          //handle various respponses
          navigate('/usermanagement');
        }
        setIsSubmitting(false);
      })
      .catch((err: any) => {
        console.log(err);
        //handle error reponses
        setIsSubmitting(false);
      });
  };

  const handleContextTypeIds = (context: string ,id: number, element: any) => {
    const checked = element.target.checked;

    setHandleContextIds((prevContextIds: any) => {
      const updatedContextIds = { ...prevContextIds };
      if (checked) {
        updatedContextIds[context].push(id);
      } else {
        updatedContextIds[context] = updatedContextIds[context].filter(
          (contextId: number) => contextId !== id
        );
      }
      return updatedContextIds;
    });
  }

  const getRoleContextElements = (contextType: any, roleId: number, assigned: boolean) => {
    if (contextType === null) return false;
    return (
      <div className="form-check theDivToControl" 
        style={{
          paddingLeft: "4rem", 
          display: assigned ? 'block' : 'none'
        }}>
        <p style={{fontSize:"15px"}}><i>Please set context type where this role can operate</i></p>
        <h6 style={{
          color:"#1B609D", 
          backgroundColor: "rgba(27, 96, 157, 0.05)", 
          display:"inline",
          padding:"5px",
        }}>
          {`Select ${contextType.charAt(0).toUpperCase() + contextType.slice(1)} : `}
        </h6>
        {roleContextDatas[`${contextType}s`].items.map((item: any, index: number) => (
          <div key={index} style={{color:"#2D4356", fontSize:"15px"}}>
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={handleContextIds[contextType].includes(item.id)}
              onChange={(e) => handleContextTypeIds(contextType, item.id, e)}
            />{" "}
            {item.name}
          </div>
        ))}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="mt-3">
        {roleAssignment.map((item: any, index: number) => (
          <React.Fragment>
            <div className="form-check" key={item.id} 
            style={{
              color:"#222", 
              fontSize:"18px", 
              fontWeight: "500",
            }}>
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={item.assigned}
                onChange={(e) => toggleRoleAssignment(item.id, item.contextType, e)}
              />{" "}
              {item.name}
            </div>
            {getRoleContextElements(item.contextType, item.id, item.assigned)}
          </React.Fragment>
        ))}
        {apiStatus === "finished" && roleAssignment.length > 0 && btnHideStatus === false && (
          <div style={{ textAlign: "center" }}>
            {isSubmitting === false ? (
              <CustomButton
                btnText="Save"
                type="submit"
                variant="primary"
                disabled=""
                onClick={savePermissions}
              />
            ) : (
              <LoadingButton
                variant="primary"
                btnText="Saving..."
                className="modal-buttons"
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default RolesDataRender;

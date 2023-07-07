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

  const toggleRoleAssignment = (roleId: number) => {
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

  const passContextTypeCheckStatus = (contextType: string, id: number) => {
     // if using this method, then first update setHandleContextIds with selectedContextIds
  } 

  const getRoleContextElements = (contextType: any) => {
    if (contextType === null) return false;
    return (
      <div className="form-check" style={{ paddingLeft: "4rem" }}>
        <p><i>Please set context type where this role can operate</i></p>
        <h5>{`Select ${contextType.charAt(0).toUpperCase() + contextType.slice(1)}`}</h5>
        {roleContextDatas[`${contextType}s`].items.map((item: any, index: number) => (
          <div key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={handleContextIds[contextType].includes(item.id)}
              // checked={passContextTypeCheckStatus(contextType, item.id)}
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
            <div className="form-check" key={item.id}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.assigned}
                onChange={() => toggleRoleAssignment(item.id)}
              />{" "}
              {item.name}
            </div>
            {getRoleContextElements(item.contextType)}
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

import React, { useState, useEffect } from "react";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";
import { postData } from "../../../../adapters/coreservices";

const RolesDataRender = ({ assignRoles, currentInstitute, apiStatus }: any) => {
  const [roleAssignment, setRoleAssignment] = useState<any>(assignRoles);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setRoleAssignment(assignRoles);
  }, [assignRoles]);

  const toggleRoleAssignment = (roleId : number) => {
    const updatedData = roleAssignment.map((item : any) => {
      if (item.id === roleId) {
        return { ...item, assigned: !item.assigned };
      }
      return item;
    });
    setRoleAssignment(updatedData);
  }

  const savePermissions = () => {
    setIsSubmitting(true);
    const newAssignedRoles = roleAssignment.filter(
      (packet : any) => packet.assigned === true
    );
    postData(`/${currentInstitute}/1703/user-roles`, newAssignedRoles)
      .then((res: any) => {
        if (res.status === 200) {
          //handle various respponses
        }
        setIsSubmitting(false);
      })
      .catch((err: any) => {
        console.log(err);
        //handle error reponses
        setIsSubmitting(false);
      });
  };

  return (
    <React.Fragment>
      <div className="mt-3">
        {roleAssignment.map((item: any, index: number) => (
          <div className="form-check" key={item.id}>
            <input 
             className="form-check-input" 
             type="checkbox" 
             checked={item.assigned}
             onChange={() => toggleRoleAssignment(item.id)}/> {item.name}
          </div>
        ))}
        {apiStatus === "finished" && roleAssignment.length > 0 && (
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

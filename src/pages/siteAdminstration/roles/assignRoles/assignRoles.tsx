import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { postData } from "../../../../adapters/coreservices";
import TimerAlertBox from "../../../../widgets/alert/timerAlert";
import CustomButton from "../../../../widgets/formInputFields/buttons";
import { LoadingButton } from "../../../../widgets/formInputFields/buttons";

const RolesDataRender = ({
  userId,
  apiStatus,
  assignRoles,
  btnHideStatus,
  roleContextDatas,
  currentInstitute,
  selectedContextIds,
}: any) => {
  const navigate = useNavigate();
  const [roleAssignment, setRoleAssignment] = useState<any>(assignRoles);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handleContextIds, setHandleContextIds] =
    useState<any>(selectedContextIds);
  const [errors, setErrors] = useState({
    program: false,
    department: false,
    institute: false,
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<any>({
    message: "",
    alertBoxColor: "",
  });

  useEffect(() => {
    setRoleAssignment(assignRoles);
  }, [assignRoles]);

  useEffect(() => {
    setHandleContextIds(selectedContextIds);
  }, [selectedContextIds]);

  const toggleRoleAssignment = (
    roleId: number,
    contextType: any,
    element: any
  ) => {
    const updatedData = roleAssignment.map((item: any) => {
      if (item.id === roleId) {
        return { ...item, assigned: !item.assigned };
      }
      return item;
    });
    setRoleAssignment(updatedData);
  };

  const updateError = (propertyName: string, value: boolean) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [propertyName]: value,
    }));
  };

  const savePermissions = () => {
    const newAssignedRoles = roleAssignment
      .filter((packet: any) => packet.assigned === true)
      .map((chosenRole: any) =>
        chosenRole.contextType !== null
          ? {
              ...chosenRole,
              contextIds: handleContextIds[chosenRole.contextType],
            }
          : { ...chosenRole }
      );
    let errorFound = false;
    newAssignedRoles.map((item: any, index: number) => {
      if (item.contextIds.length === 0) {
        errorFound = true;
        updateError(item.contextType, true);
      }
    });

    if (!errorFound) {
      setIsSubmitting(true);
      postData(`/${currentInstitute}/${userId}/user-roles`, newAssignedRoles)
        .then((res: any) => {
          if (res.status === 200) {
            navigate("/usermanagement");
          }
          setIsSubmitting(false);
        })
        .catch((err: any) => {
          setIsSubmitting(false);
          if (err.response.status === 400) {
            setShowAlert(true);
            setAlertMsg({
              message: "Please select user's email to assign role",
              alertBoxColor: "danger",
            });
          } else {
            setShowAlert(true);
            setAlertMsg({
              message: "Not able to assign role. Please try again!",
              alertBoxColor: "danger",
            });
          }
        });
    }
  };

  const handleContextTypeIds = (context: string, id: number, element: any) => {
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

      if (updatedContextIds[context].length !== 0) {
        updateError(context, false);
      } else {
        updateError(context, true);
      }
      return updatedContextIds;
    });
  };


  const getRoleContextElements = (
    contextType: any,
    roleId: number,
    assigned: boolean
  ) => {
    if (contextType === null) return false;
    return (
      <div
        className="theDivToControl"
        style={{
          display: assigned ? "block" : "none",
        }}
      >
        <p>
          <i>Please set context type where this role can operate</i>
        </p>
        <span className="context-legend">
          {`Select ${
            contextType.charAt(0).toUpperCase() + contextType.slice(1)
          }: `}
        </span>
        <p style={{ color: "red" }}>
          {errors[contextType] === true ? `Please select ${contextType}` : ""}
        </p>
        {roleContextDatas[`${contextType}s`].items.map(
          (item: any, index: number) => (
            // console.log(roleContextDatas)
            item.locked !== undefined && item.locked !== false &&
            <div key={index}>
              <input
                className="form-check-input me-1"
                type="checkbox"
                checked={handleContextIds[contextType].includes(item.id)}
                onChange={(e) => handleContextTypeIds(contextType, item.id, e)}
              />{" "}
              {item.name}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <TimerAlertBox
        className="mt-3"
        showAlert={showAlert}
        alertMsg={alertMsg.message}
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
      />
      <div className="assign-roles">
        {roleAssignment.map(
          (item: any, index: number) =>
            item.contextType !== "course" && (
              <React.Fragment key={item.id}>
                <h5 className="role-name" key={item.id}>
                  <input
                    className="form-check-input me-1 mt-0"
                    type="checkbox"
                    checked={item.assigned}
                    onChange={(e) =>
                      toggleRoleAssignment(item.id, item.contextType, e)
                    }
                  />{" "}
                  {item.name}
                </h5>
                {getRoleContextElements(
                  item.contextType,
                  item.id,
                  item.assigned
                )}
              </React.Fragment>
            )
        )}
        {apiStatus === "finished" &&
          roleAssignment.length > 0 &&
          btnHideStatus === false && (
            <div className="text-center">
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

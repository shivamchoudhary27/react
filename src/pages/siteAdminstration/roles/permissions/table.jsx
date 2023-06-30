import React, { useEffect, useState } from 'react';
import { postData } from '../../../../adapters/coreservices';
import CustomButton from '../../../../widgets/formInputFields/buttons';
import { LoadingButton } from '../../../../widgets/formInputFields/buttons';
import 'bootstrap/dist/css/bootstrap.min.css';

const RolePermissionTable = ({permissionData, roleId}) => {
  
  const [data, setData] = useState(permissionData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setData(permissionData)
  }, [permissionData]);

  const togglePermitted = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, permitted: !item.permitted };
      }
      return item;
    });
    setData(updatedData);
  };

  const toggleAll = (module) => {
    const categoryData = data.filter(item => item.module === module);
    const allPermitted = categoryData.every(item => item.permitted);
    const updatedData = data.map(item => {
      if (item.module === module) {
        return { ...item, permitted: !allPermitted };
      }
      return item;
    });
    setData(updatedData);
  };
  
  const isAllSelected = (module) => {
    const categoryData = data.filter(item => item.module === module);
    return categoryData.every(item => item.permitted);
  };

  const savePermissions = () => {
    setIsSubmitting(true);
    const permittedAuthorities = data.filter(packet => packet.permitted === true);
    postData(`/${roleId}/authorities`, permittedAuthorities)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        //handle various respponses 
      }
      setIsSubmitting(false)
    })
    .catch((err) => {
      console.log(err);
      //handle error reponses 
      setIsSubmitting(false)
    });
  }

  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected('user')}
                onChange={() => toggleAll('user')}
              />
              Check All
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => item.module === 'user')
            .map(item => (
              <tr key={item.id}>
                <td>{" " + item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.permitted}
                    onChange={() => togglePermitted(item.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
        <thead>
          <tr>
            <th>Program</th>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected('program')}
                onChange={() => toggleAll('program')}
                />
                Check All
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => item.module === 'program')
            .map(item => (
              <tr key={item.id}>
                <td>{" " + item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.permitted}
                    onChange={() => togglePermitted(item.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
        <thead>
          <tr>
            <th>Course</th>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected('course')}
                onChange={() => toggleAll('course')}
                />
              Check All
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(item => item.module === 'course')
            .map(item => (
              <tr key={item.id}>
                <td>{" " + item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.permitted}
                    onChange={() => togglePermitted(item.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{textAlign:"center"}}>
        { isSubmitting === false ? (
          <React.Fragment>
            <CustomButton
              btnText="Save Permissions"
              type="submit"
              variant="primary"
              disabled=""
              onClick={savePermissions}
            />{" "}
            {/* <CustomButton
              type="reset"
              btnText="Cancel"
              variant="outline-secondary"
            /> */}
          </React.Fragment>
        ) : (
          <LoadingButton
            variant="primary"
            btnText="Saving Permissions"
            className="modal-buttons"
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default RolePermissionTable;
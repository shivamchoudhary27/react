import React from "react";

const RolesDataRender = ({ rolesData }: any) => {
  return (
    <React.Fragment>
      <div className="mt-3">
        {rolesData.map((item: any, index: number) => (
          <div className="form-check" key={item.id}>
            <input className="form-check-input" type="checkbox" /> {item.name}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default RolesDataRender;

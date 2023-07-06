import React from "react";
import Select from "react-select";

const MultiSearch = () => {
    const options = [
        { value: "blues", label: "Blues" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "orchestra", label: "Orchestra" },
      ];

  return <React.Fragment>
    <div className="container">
      <div className="mt-5 m-auto w-50">
        <Select options={options} />
      </div>
    </div>
  </React.Fragment>;
};

export default MultiSearch;

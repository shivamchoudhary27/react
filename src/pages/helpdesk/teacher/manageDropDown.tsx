import { useEffect } from "react";

const ManageDropdown = ({ updateTopicFilter, selectedTopic, setSelectedValue, selectedValue } : any) => {

  useEffect(() => {
    if (selectedTopic.length > 0) {
      setSelectedValue(setSelectedValue);
    }
  }, [selectedTopic]);

  const getCurrentValue = (e : any) => {
    updateTopicFilter(e.target.value);
    setSelectedValue(e.target.value);
  }

  return (
    <>
      <select className="form-select w-250" onChange={getCurrentValue} value={selectedValue} >
        <option value="">Select Topic</option>
        {selectedTopic.map((el: any, index: number) => (
            <option key={index} value={el.id}>{el.topicName}</option>
        ))}
      </select>
    </>
  );
}

export default ManageDropdown;

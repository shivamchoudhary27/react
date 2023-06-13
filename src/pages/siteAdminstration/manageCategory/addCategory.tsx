import { Link } from "react-router-dom";

interface Props {
  latestparentweight: any 
  toggleModalShow: any 
  setFormParentValue: any
  setFormWeightValue: any
}
const Addcategory = ({ latestparentweight, toggleModalShow, setFormParentValue, setFormWeightValue }: Props) => {
  
  const toAddWeight = latestparentweight;
  const parent = 0;
  
  // handle to add new category === >>
  const addCategoryHandler = () => {
    setFormParentValue(parent);
    setFormWeightValue(toAddWeight);
    toggleModalShow(true);
  }

  return (
    <>
      <div>
        <Link to="" style={{textDecoration: 'none'}} onClick={addCategoryHandler}>
          <i className="fa-solid fa-square-plus"></i>{" "}
          <strong>Add Category</strong>{" "}
        </Link>
      </div>
    </>
  );
};

export default Addcategory;

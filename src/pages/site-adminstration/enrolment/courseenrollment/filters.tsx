import { Button } from "react-bootstrap";
import { useFormik } from "formik";
import "./style.scss";

const initialValues = {
  name: "",
  email: "",
}

const ManageFilter = ({ updateinputfilters } : any) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      updateinputfilters(values, false);
    },
    onReset: () => {
      formik.setValues({
        name: "",
        email: "",
      });
      updateinputfilters({}, true);
    }
  });

  return (
    <>
      <div className="filter-wrapper">
        <div className="filter-form">
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <input
                className="form-control"
                id="name"
                name="name"
                type="text"
                placeholder="Fullname"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <input
                className="form-control"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Button variant="outline-secondary" type="submit">Filter</Button>
              <Button variant="outline-secondary" type="reset" onClick={formik.handleReset}>Reset</Button>
            </form>
        </div>
      </div>
    </>
  );
};

export default ManageFilter;

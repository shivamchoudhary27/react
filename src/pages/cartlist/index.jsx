import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../adapters";
import Header from "../header";
import Sidebar from "../sidebar";
import "./style.scss";
import img from "../../assets/images/course_catalogue_ai_image.jpg";
import emptyCartImg from "../../assets/images/empty-cart.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Cart = () => {
  let priceCount = 0;
  let discount = 0;
  const coursesList = [];
  const navigate = useNavigate();
  const [courseStatus, setCourseStatus] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const getLocalCouseId = localStorage.getItem("courseCartId");
  const localCoursesId = JSON.parse(getLocalCouseId);

  function Course_Get_Courses() {
    const query = {
      wsfunction: "core_course_get_courses",
      ids: [],
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          if (localCoursesId.length > 0) {
            for (let i = 0; i <= res.data.length - 1; i++) {
              for (let j = 0; j <= localCoursesId.length; j++) {
                if (res.data[i].id === localCoursesId[j]) {
                  coursesList.push(res.data[i]);
                  setFilteredCourses(coursesList);
                }
              }
            }
          } else {
            setCourseStatus(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Hit get-courses API === >>
  useEffect(() => {
    Course_Get_Courses();
  }, [getLocalCouseId]);

  // Remove from cart list === >>
  const removeItemFromCart = (cartItemID) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Removed Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    const x = localCoursesId.indexOf(cartItemID);
    let removeItem = localCoursesId.splice(x, 1);
    let cartRemoveItem = localCoursesId.filter((item) => removeItem !== item);
    localStorage.setItem("courseCartId", JSON.stringify(cartRemoveItem));
    Course_Get_Courses();
  };

  // continue shopping redirect btn === >>
  const handleContinueShopping = () => {
    navigate("/catalogue");
  };

  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-container ui_cartlist">
        <div className="container contents">
          <h3 className="pt-2 heading">Shopping Cart</h3>
          <div className="row">
            {courseStatus === false ? (
              <>
                <div className="col-md-9 col-sm-12">
                  <div>
                    <table className="table table-responsive cart_item_table">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      {filteredCourses.map((elem, index) => (
                          <tbody key={index}>
                            {
                              <tr>
                                <td>
                                  <img src={img} alt="" />
                                </td>
                                <td>
                                  <h5>
                                    <strong>{elem.fullname}</strong>
                                  </h5>
                                  <p>
                                    <strong>#{elem.id}</strong> Build Complete
                                    web and hybrid mobile solution. Master front
                                    end web, hybrid mobile app and server-side
                                    development in three comprehensive
                                  </p>
                                  <p className="rating_content">
                                    <span className="review-txt">4.2</span>{" "}
                                    <span
                                      className="fa fa-star checked"
                                      style={{ color: "orange" }}
                                    ></span>
                                    <span
                                      className="fa fa-star checked"
                                      style={{ color: "orange" }}
                                    ></span>
                                    <span
                                      className="fa fa-star checked"
                                      style={{ color: "orange" }}
                                    ></span>
                                    <span
                                      className="fa fa-star"
                                      style={{ color: "#999" }}
                                    ></span>
                                    <span
                                      className="fa fa-star"
                                      style={{ color: "#999" }}
                                    ></span>{" "}
                                    <span className="review-txt">(2,151)</span>
                                  </p>
                                  <p
                                    className="pt-1 remove_item_link"
                                    onClick={() => removeItemFromCart(elem.id)}
                                  >
                                    Remove from Cart
                                  </p>
                                </td>
                                <td>{499}</td>
                              </tr>
                            }
                            <tr style={{ display: "none" }}>
                              <td>{(priceCount += 499)}</td>
                              <td>{(discount += 199)}</td>
                            </tr>
                          </tbody>
                      ))}
                    </table>
                  </div>

                  <div className="row text-end subtotal">
                    <div className="col-sm-9"></div>
                    <div className="col-sm-3">
                      <div className="subtotal_price">
                        <h5>
                          Subtotal :
                          <span className="fa-solid fa-indian-rupee-sign"></span>
                          <span>{priceCount}</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 col-sm-12 cart_price_details">
                  <div className="price_card">
                    <h5>Price Details</h5>
                    <hr />
                    <div className="price_card_content">
                      <div>
                        <p>Subtotal</p>
                        <p>Discount</p>
                        <p style={{ fontSize: "18px" }}>
                          <strong>Gross Total</strong>
                        </p>
                      </div>
                      <div>
                        <p>:</p>
                        <p>:</p>
                        <p style={{ fontSize: "18px" }}>
                          <strong>:</strong>
                        </p>
                      </div>
                      <div>
                        <p>{priceCount}</p>
                        <p>{discount}</p>
                        <p style={{ fontSize: "18px" }}>
                          <span className="fa-solid fa-indian-rupee-sign"></span>
                          <strong> {priceCount - discount + " /-"}</strong>
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="text-center">
                      <button className="btn btn-warning">
                        <span className="fa-solid fa-bag-shopping"></span>{" "}
                        Proceed to Pay
                      </button>
                    </div>
                    {/* <hr/> */}
                    <div className="text-center mt-2">
                      <p style={{ marginBottom: "5px" }}>
                        You will save {discount} on this order!
                      </p>
                    </div>
                    <div className="text-center">
                      <Link to="/catalogue" className="btn btn-dark">
                        <span className="fa-solid fa-basket-shopping"></span>{" "}
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{ border: "1px solid #ececec", position: "relative" }}
                >
                  <h5
                    style={{
                      color: "rgb(153, 153, 153)",
                      position: "absolute",
                      left: "37%",
                      top: "2%",
                    }}
                  >
                    <strong>No Courses Available in Your Cart</strong>
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img src={emptyCartImg} alt="image" width="700px" />
                  </div>
                  <div className="text-center pb-4">
                    <p>Your cart is empty. Keep shopping to find a course!</p>
                    <button
                      className="btn btn-warning"
                      onClick={handleContinueShopping}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

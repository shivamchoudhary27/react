import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../../adapters";
import Header from "../header";
import Sidebar from "../sidebar";
import "./style.scss";
import img from "../../assets/images/course_catalogue_ai_image.jpg";
import emptyCartImg from "../../assets/images/empty-cart.jpg";
import { useNavigate } from "react-router-dom";
import SkeletonMimic from "./Skeleton";

const Cart = () => {
  let priceCount = 0;
  let discount = 0;
  const [loadSkeleton, setLoadSkeleton] = useState(true);
  const [courseIdArr, setCourseIdArr]  = useState([]);
  const navigate = useNavigate();
  const [courseStatus, setCourseStatus] = useState(false);
  const [courseId, setCourseId] = useState([]);
  const getLocalCouseId = localStorage.getItem("courseCartId");
  const cartCourseId = JSON.parse(getLocalCouseId);

  // Hit get-courses API === >>
  useEffect(() => {
    const query = {
      wsfunction: "core_course_get_courses",
      ids: [],
    };
    getData(query)
      .then((res) => {
        if (res.status === 200 && res.data) {
          res.data.map((data) => {
            courseIdArr.push(data);
          });
          setCourseId(courseIdArr);
          setLoadSkeleton(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  // filter courses added in cart === >> 
  useEffect(()=>{
    if(cartCourseId.length > 0){
      let courseItems = [];
      for(let i = 0; i < cartCourseId.length; i++){
        for(let j = 0; j < courseId.length; j++){
          if(cartCourseId[i] == courseId[j].id){
            courseItems.push(courseId[j]);
          }
        } 
      }
      setCourseIdArr(courseItems);
    } else {
      setCourseStatus(true);
    }
  }, [courseId])

  // continue shopping btn redirect === >>
  const handleContinueShopping = () => {
    navigate("/catalogue");
  }
  
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-container">
        <div className="container contents">
          <h3 className="pt-2" style={{color: 'rgb(153, 153, 153)'}}>Shopping Cart</h3>
          <div className="row">
            {courseStatus === false ?
            <>
            <div className="col-md-9 col-sm-12">
            
              <div>
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseIdArr.map((el, i) => (
                      <>
                        {
                          <tr key={i}>
                            <td>
                              <img src={img} alt={el.fullname} />
                            </td>
                            <td>
                              <h5>
                                <strong>{el.fullname}</strong>
                              </h5>
                              <p>
                                <strong>#{el.id}</strong> Build Complete web and
                                hybrid mobile solution. Master front end web,
                                hybrid mobile app and server-side development in
                                three comprehensive
                              </p>
                              <p style={{ marginBottom: "0px" }}>
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
                                <p
                                  className="pt-1"
                                  style={{ marginBottom: "0px", color: "#999", cursor: 'pointer' }}
                                  // onClick={}
                                >
                                  Remove from Cart
                                </p>
                              </p>
                            </td>
                            <td>{499}</td>
                          </tr>
                        }
                        <p style={{display: 'none'}}>
                          {priceCount += 499}
                          {discount += 199}
                        </p>
                      </>
                    ))
                  }
                  </tbody>
                </table>
              </div>

              <div className="row text-end">
                <div className="col-sm-9"></div>
                <div className="col-sm-3">
                  <div>
                    <h5>
                      Subtotal :
                      <span
                        className="fa-solid fa-indian-rupee-sign"
                        style={{ fontSize: "14px", margin: "0px 3px" }}
                      ></span>
                      <span>{priceCount}</span>
                    </h5>
                  </div>
                </div>
              </div>

            </div>

            <div className="col-md-3 col-sm-12" style={{position: 'relative'}}>
              <div
                style={{
                  border: "1px solid #f2f2f2",
                  padding: "1rem",
                  position: 'fixed',
                }}
              >
                <h5 style={{color: '#999'}}>Price Details</h5>
                <hr/>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div>
                    <p>Subtotal</p>
                    <p>Discount</p>
                    <p style={{fontSize: '18px'}}><strong>Gross Total</strong></p>
                  </div>
                  <div>
                    <p>:</p>
                    <p>:</p>
                    <p style={{fontSize: '18px'}}><strong>:</strong></p>
                  </div>
                  <div>
                    <p>{priceCount}</p>
                    <p>{discount}</p>
                    <p style={{fontSize: '18px'}}><span className="fa-solid fa-indian-rupee-sign"></span>
                      <strong>{" "}{priceCount - discount + " /-"}</strong></p>
                  </div>
                </div>
                <hr/>
                <div className="text-center">
                  <button className="btn btn-warning"><span className="fa-solid fa-bag-shopping"></span> Proceed to Pay</button>
                </div>
                {/* <hr/> */}
                <div className="text-center mt-2">
                  <p style={{marginBottom: '5px'}}>You will save {discount} on this order!</p>
                </div>
                <div className="text-center">
                  <Link to="/catalogue" className="btn btn-dark"><span className="fa-solid fa-basket-shopping"></span> Continue Shopping</Link>
                </div>
              </div>
            </div>
            </>
            :
            <>
              <div style={{border: '1px solid #ececec', position: 'relative'}}>
                  <h5 style={{color: 'rgb(153, 153, 153)', position: 'absolute', left: '37%', top: '2%'}}>
                    <strong>No Courses Available in Your Cart</strong>
                  </h5>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                      loadSkeleton === true ? <SkeletonMimic /> :
                      <img src={emptyCartImg} alt="image" width="700px" />
                    }
                  </div>
                  <div className="text-center pb-4">
                    <p>Your cart is empty. Keep shopping to find a course!</p>
                    <button className="btn btn-warning" onClick={handleContinueShopping}>Continue Shopping</button>
                  </div>
                </div>
            </>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

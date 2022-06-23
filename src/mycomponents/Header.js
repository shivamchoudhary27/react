import React from 'react';
function Header(props) {

  return (
    <>
      <header className={`header ${props.currentState ?? null}`}>
        <div className="header-toggle" onClick={props.toggleFun}>
          <h2 className="bi bi-list bg-secondary"></h2>
        </div>
      </header>
      {/* <header className={`header ${props.currentState ? "space-toggle" : null}`} >
        <div className='row p-3'>
          <div className='col-md-5'>
            <img className='header-toggle' src={img} id='img' onClick={props.toggleFun} /><span style={{ color: "orange" }}><b>Moodle</b></span>
          </div>
          <div className='col-md-7' ></div>
        </div>
      </header> */}
    </>
  );
}


export default Header;
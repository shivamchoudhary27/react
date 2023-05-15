import React from "react";
import NewLoader from "../../../widgets/loader";
function QuestionsPageNav(prop: any) {
  const props = prop;
  const changePage = (e: { target: { value: number; }; }) => {
    props.changePage(e.target.value - 1);
  };
  if (props.quizPages.totalPages === 0) {
    return (
      <div>
        <NewLoader />
      </div>
    );
  }
  function generateButtons(totalPages: number, currentPage: number, changePage: React.MouseEventHandler<HTMLButtonElement> | undefined) {
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      if (props.btnNav) {
        if (i === currentPage + 1) {
          buttons.push(
            <button type="button" key={i} value={i} className="quiz-navigation-btn active">
              {i}
            </button>
          );
        } else {
          buttons.push(
            <button type="button" key={i} value={i} className="quiz-navigation-btn" disabled>
              {i}
            </button>
          );
        }
      } else {
        if (i === currentPage + 1) {
          buttons.push(
            <button type="button" key={i} value={i} className="quiz-navigation-btn active" onClick={changePage}>
              {i}
            </button>
          );
        } else {
          buttons.push(
            <button type="button" key={i} value={i} className="quiz-navigation-btn" onClick={changePage}>
              {i}
            </button>
          );
        }
      }
    }
    return buttons;
  }
  return (
    <div className="quiz-navigation-content">
      <h4 className="mb-3 quiz-page-heading">Quiz navigation</h4>
      {generateButtons(props.quizPages.totalPages, props.quizPages.currentPage, changePage)}
      <p className="finish-attempt-btn mt-2" />
      <button type="button" className="quiz-preview-btn" onClick={props.finisAttempt}>
        Finish attempt..
      </button>
    </div>
  );
}
export default QuestionsPageNav;

import { RotatingLines } from "react-loader-spinner";

type Props = {};

const RouterLadyLoader = (props: Props) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor:"#f3f6fa"
    }}>
      <RotatingLines
        visible={true}
        height="50"
        width="50"
        strokeWidth="5"
        strokeColor="#1B609D"
        animationDuration="0.2"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      {" "}Loading ...
    </div>
  );
};

export default RouterLadyLoader;

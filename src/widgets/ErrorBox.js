export default function ErrorBox(props) {
  return (
    <div className="error-alert" role="alert">
      {props.msg}
    </div>
  );
}

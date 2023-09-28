import MyButton from "./Button";

const RefreshToken = () => {
  return (
    <div className="token-warning">
      <h2>Still here?</h2>
      <MyButton className="myButton outlinedButton">Yup!</MyButton>
      <MyButton className="myButton textButton">nope.</MyButton>
    </div>
  );
};

export default RefreshToken;

import MyInput from "../../../components/MyInput";
import MyButton from "../../../components/MyButton";
import InfoMessage from "../../../components/InfoMessage";
import { FormErrors, FormFocus, UserData, InfoMsg } from "../../../utils/types";

interface Props {
  userData: UserData;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formFocus: FormFocus;
  formErrors: FormErrors;
  toPrevStep: () => void;
  toNextStep: () => void;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  infoMsg: InfoMsg;
}

const Step2 = ({
  userData,
  handleInput,
  handleFocus,
  handleBlur,
  formFocus,
  formErrors,
  toPrevStep,
  toNextStep,
  handleSelect,
  infoMsg,
}: Props) => {
  return (
    <form style={{ width: "100%" }}>
      <div className="reg-fields">
        {/* USERNAME */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="username">Username</label>
            <MyInput
              className="my-input"
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              value={userData.username}
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formFocus.username &&
              (formErrors.username.lenMsg || formErrors.username.validMsg) && (
                <ul>
                  {formErrors.username.lenMsg && (
                    <li>{formErrors.username.lenMsg}</li>
                  )}
                  {formErrors.username.validMsg && (
                    <li>{formErrors.username.validMsg}</li>
                  )}
                </ul>
              )}
          </div>
        </div>

        {/* AGE */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="age">Age</label>
            <MyInput
              className="my-input"
              type="text"
              name="age"
              id="age"
              autoComplete="off"
              value={userData.age}
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formFocus.age &&
              (formErrors.age.validMsg ||
                formErrors.age.youngMsg ||
                formErrors.age.oldMsg) && (
                <ul>
                  {formErrors.age.validMsg && (
                    <li>{formErrors.age.validMsg}</li>
                  )}
                  {formErrors.age.youngMsg && (
                    <li>{formErrors.age.youngMsg}</li>
                  )}
                  {formErrors.age.oldMsg && <li>{formErrors.age.oldMsg}</li>}
                </ul>
              )}
          </div>
        </div>

        {/* GENDER */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="gender">Gender</label>
            <select
              value={userData.gender}
              onChange={handleSelect}
              className="my-input"
              name="gender"
              id="gender"
            >
              <option value="Select">Select gender:</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <InfoMessage {...infoMsg} />

        {/* BUTTONS */}

        <div className="input-block">
          <div className="label-input" style={{ flexDirection: "row" }}>
            <MyButton
              className="my-button outlined-button"
              type="button"
              style={{
                width: "50%",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
              }}
              onClick={toPrevStep}
            >
              Back
            </MyButton>
            <MyButton
              className="my-button filled-button"
              type="button"
              style={{
                width: "50%",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
              }}
              onClick={toNextStep}
            >
              Next
            </MyButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step2;

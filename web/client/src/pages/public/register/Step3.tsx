import MyInput from "../../../components/MyInput";
import MyButton from "../../../components/MyButton";
import { FormErrors, UserData } from "../../../utils/types";
import { FormEvent } from "react";

interface Props {
  userData: UserData;
  formErrors: FormErrors;
  toPrevStep: () => void;
  lastStep: boolean;
  finishRegister: (event: FormEvent) => void;
}

const Step3 = ({
  userData,
  formErrors,
  toPrevStep,
  lastStep,
  finishRegister,
}: Props) => {
  return (
    <form style={{ width: "100%" }} onSubmit={finishRegister}>
      <div className="reg-fields">
        <h2>Everything correct?</h2>

        {/* EMAIL */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <MyInput
              className="my-input"
              type="text"
              name="email"
              id="email"
              value={userData.email}
              readOnly
              autoComplete="off"
              onFocus={() => true}
            />
            {lastStep &&
              (formErrors.email.lenMsg || formErrors.email.validMsg) && (
                <ul>
                  {formErrors.email.lenMsg && (
                    <li>{formErrors.email.lenMsg}</li>
                  )}
                  {formErrors.email.validMsg && (
                    <li>{formErrors.email.validMsg}</li>
                  )}
                </ul>
              )}
          </div>
        </div>

        {/* USERNAME */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="username">Username</label>
            <MyInput
              className="my-input"
              type="text"
              name="username"
              id="username"
              value={userData.username}
              readOnly
              autoComplete="off"
            />
            {lastStep &&
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
              value={userData.age}
              readOnly
              autoComplete="off"
            />
            {lastStep &&
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
            <MyInput
              className="my-input"
              type="text"
              name="gender"
              id="gender"
              value={userData.gender}
              readOnly
              autoComplete="off"
            />
          </div>
        </div>
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
              style={{
                width: "50%",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
              }}
              type="submit"
            >
              Finish
            </MyButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step3;

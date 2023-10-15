import MyInput from "../../../components/MyInput";
import MyButton from "../../../components/MyButton";
import { FormErrors, FormFocus, UserData } from "../../../utils/types";

interface Props {
  userData: UserData;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formFocus: FormFocus;
  formErrors: FormErrors;
  toPrevStep: () => void;
  toNextStep: () => void;
}

const Step1 = ({
  userData,
  handleInput,
  handleFocus,
  handleBlur,
  formFocus,
  formErrors,
  toPrevStep,
  toNextStep,
}: Props) => {
  return (
    <form style={{ width: "100%" }}>
      <div className="reg-fields">
        {/* EMAIL */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="email">Email</label>
            <MyInput
              className="my-input"
              type="email"
              name="email"
              id="email"
              value={userData.email}
              autoComplete="off"
              required
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formFocus.email &&
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

        {/* PASSWORD */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="passwd">Password</label>
            <MyInput
              className="my-input"
              type="password"
              name="passwd"
              id="passwd"
              autoComplete="off"
              value={userData.passwd}
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {formFocus.passwd &&
              (formErrors.passwd.lenMsg ||
                formErrors.passwd.specialMsg ||
                formErrors.passwd.capitalMsg ||
                formErrors.passwd.numMsg) && (
                <ul>
                  {formErrors.passwd.lenMsg && (
                    <li>{formErrors.passwd.lenMsg}</li>
                  )}
                  {formErrors.passwd.specialMsg && (
                    <li>{formErrors.passwd.specialMsg}</li>
                  )}
                  {formErrors.passwd.capitalMsg && (
                    <li>{formErrors.passwd.capitalMsg}</li>
                  )}
                  {formErrors.passwd.numMsg && (
                    <li>{formErrors.passwd.numMsg}</li>
                  )}
                </ul>
              )}
          </div>
        </div>

        {/* PASSWORD 2 */}

        <div className="input-block">
          <div className="label-input">
            <label htmlFor="passwd2">Confirm Password</label>
            <MyInput
              className="my-input"
              type="password"
              name="passwd2"
              id="passwd2"
              onChange={handleInput}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="off"
              value={userData.passwd2}
            />
            {formFocus.passwd2 && formErrors.passwd2 && (
              <ul>
                {formErrors.passwd2.pw2Msg && (
                  <li>{formErrors.passwd2.pw2Msg}</li>
                )}
              </ul>
            )}
          </div>
        </div>

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

export default Step1;

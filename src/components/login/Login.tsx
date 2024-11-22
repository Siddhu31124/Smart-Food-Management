import Input from "../commonComponents/Input";
import Loader from "../loader/Loader";
import {
  errorInput,
  heading,
  input,
  loginContainer,
  loginPage,
  logo,
} from "./styles";
import {
  USERNAME,
  PASSWORD,
  GLOBAL_LOGO_URL,
  GLOBAL_LOGO_ALT,
  USERNAME_LABEL,
  USERNAME_ID,
  PASSWORD_LABEL,
} from "../../constants";
import Button from "../commonComponents/Button";
import React from "react";

interface LoginTypes {
  userNameError: boolean;
  usernameDetails: string;
  handleUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: boolean;
  passwordDetails: string;
  handelPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  loginLoading: boolean;
}

const Login: React.FC<LoginTypes> = (props) => {
  const {
    userNameError,
    usernameDetails,
    handleUsername,
    passwordError,
    passwordDetails,
    handelPassword,
    handleLogin,
    loginLoading,
  } = props;

  const headerSection = () => (
    <div>
      <img src={GLOBAL_LOGO_URL} className={logo} alt={GLOBAL_LOGO_ALT} />
      <h1 className={heading}>
        Hi there, <br />
        login
      </h1>
    </div>
  );

  const inputsSection = () => (
    <>
      <Input
        label={USERNAME_LABEL}
        id={USERNAME}
        style={userNameError ? errorInput : input}
        inputType={USERNAME_ID}
        value={usernameDetails}
        onChangeFunction={handleUsername}
        isError={userNameError}
      />
      <Input
        label={PASSWORD_LABEL}
        id={PASSWORD}
        style={passwordError ? errorInput : input}
        inputType={PASSWORD}
        value={passwordDetails}
        isError={passwordError}
        onChangeFunction={handelPassword}
      />
    </>
  );

  return (
    <form onSubmit={handleLogin} className={loginPage}>
      <div className={loginContainer}>
        {headerSection()}
        {inputsSection()}
        <Button type="submit" disable={loginLoading}>
          {loginLoading ? <Loader /> : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default Login;

import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "./base.js";

import styled from "styled-components";

const LoginWrapper = styled.div`
  margin-top: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormFlex = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextStyles = styled.p`
  font-size: 16px;
  font-family: arial;
`;

const InputStyles = styled.input`
  font-size: 14px;
  margin-top: 6px;
`;

const ButtonStyles = styled.button`
  font-size: 12px;
  padding: 10px;
  background-color: #01408C;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;

  :hover{
    background-color: #53749C;
  }
`;

const ErrorStatus = styled.p`
  color: red;
  margin-bottom: 6px;
`;

const Login = ({ history }) => {

  const [PWStatus, setPWStatus] = useState("true");

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword('management@lichtenliefde.com', password.value);
        history.push("/");
      } catch (error) {
        setPWStatus("false");
      }
    },
    [history]
  );

  return (
    <LoginWrapper>
      <FormFlex onSubmit={handleLogin}>
        {
          PWStatus === "false" ? <ErrorStatus>Uw wachtwoord is verkeerd.</ErrorStatus> : <></>
        }
        <label>
          <TextStyles>Wachtwoord</TextStyles>
          <InputStyles name="password" type="password" />
        </label>
        <br />
        <ButtonStyles type="submit">Meld je aan</ButtonStyles>
      </FormFlex>
    </LoginWrapper>
  )
}

export default withRouter(Login);
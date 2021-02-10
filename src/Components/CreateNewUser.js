import React, { useState } from "react";
import firebase from "../Auth/base";
import styled from "styled-components"

const TitleStyles = styled.h1`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const ButtonStyles = styled.button`
  margin-top: 15px;
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

const InputStyles = styled.input`
  width: 200px;
`;

const GoodStatus = styled.div`
  color: white;
  background-color: green;
  display: flex;
  justify-content: center;
  margin-right: 20px;
  align-items: center;
  height: 40px;
  margin-bottom: 30px;
`;

const ErrorStatus = styled.div`
  background-color: red;
  display: flex;
  justify-content: center;
  margin-right: 20px;
  align-items: center;
  height: 40px;
  margin-bottom: 30px;
`;

const StatusButton = styled.button`
  border: 1px solid black;
  background-color: white;
  margin-left: 10px;
  cursor: pointer;

  :hover{
    background-color: lightgrey;
  }
`;

const CreateNewUser = () => {

  const [newUserEmail, setNewUserEmail] = useState();
  const [newUserPassword, setNewUserPassword] = useState();

  const [statusNewUser, setStatusNewUser] = useState(false);

  const createNewUser = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword)
      .then(() => setStatusNewUser(true))
      .catch(error => setStatusNewUser(error.code));
    setNewUserEmail("")
    setNewUserPassword("")
  }

  return (
    <>
      {
        statusNewUser === true ? (
          <GoodStatus>
            <p>Nieuwe gebruiker is succesvol toegevoegd!</p>
            <StatusButton onClick={() => setStatusNewUser(false)}>Sluit</StatusButton>
          </GoodStatus>
        ) : statusNewUser === "auth/email-already-in-use" ? (
          <ErrorStatus>
            <p>Dit emailadres is al in gebruik!</p>
            <StatusButton onClick={() => setStatusNewUser(false)}>Sluit</StatusButton>
          </ErrorStatus>
        ) : (
          <></>
        )
      }
      <form onSubmit={createNewUser}>
        <TitleStyles>Maak nieuwe gebruiker aan</TitleStyles>
        <LabelStyles>
          <p>Emailadres</p>
          <InputStyles
            type="email"
            required
            value={newUserEmail}
            onChange={e => setNewUserEmail(e.currentTarget.value)}
          />
        </LabelStyles>

        <LabelStyles>
          <p>Wachtwoord</p>
          <InputStyles
            value={newUserPassword}
            required
            onChange={e => setNewUserPassword(e.currentTarget.value)}
            minlength="6"
          />
        </LabelStyles>

        <ButtonStyles type="submit">Voeg gebruiker toe</ButtonStyles>
      </form>
    </>
  )
}

export default CreateNewUser;
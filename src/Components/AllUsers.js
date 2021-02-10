import React, { useState } from "react";
import styled from 'styled-components'
import firebase from "../Auth/base";

import users from "../assets/users.svg"
import mail from "../assets/mail.svg"
import soort from "../assets/soort.svg"


const CardStyles = styled.div`
  margin: 15px 20px 0 0;
  border: 1px darkgrey solid;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Flex = styled.div`
  display: flex;
  margin: 10px 0;
`;

const Text = styled.p`
  margin-left: 10px;
`;

const TitleStyles = styled.h1`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const MainWrapper = styled.div`
  margin-bottom: 50px;
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
  fill: white;

  :hover{
    background-color: #53749C;
  }
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



const StatusButton = styled.button`
  border: 1px solid black;
  background-color: white;
  margin-left: 10px;
  cursor: pointer;

  :hover{
    background-color: lightgrey;
  }
`;

const AllUsers = () => {

  const [allUsers, setAllUsers] = useState([])
  const [completion, setCompletion] = useState(false);

  const getAllUsers = async() => {
    const db = firebase.firestore()
    const data = await db.collection("Users").get()
    setAllUsers(data.docs.map(doc => doc.data()))
  }

  return (
    <MainWrapper>
      {
        completion === true ? (
          <GoodStatus>
            <p>Succesvol verwijderd!</p>
            <StatusButton onClick={() => setCompletion(false)}>Sluit</StatusButton>
          </GoodStatus>
        ) : (
          <>
          </>
        )
      }
      <TitleStyles>Haal alle gebruikers op</TitleStyles>
      <ButtonStyles onClick={getAllUsers}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
      </ButtonStyles>

      {

        allUsers.map(user => (
          <CardStyles key={user.id}>
            <div>
              <Flex>
                <img src={users} alt="Naam" />
                <Text>{user.volledige_naam}</Text>
              </Flex>
              <Flex>
                <img src={mail} alt="Mail icoon" />
                <Text>{user.email}</Text>
              </Flex>
              <Flex>
                <img src={soort} alt="Soort gebruiker" />
                <Text>{user.soort_gebruiker}</Text>
              </Flex>
            </div>

          </CardStyles>
        ))
        
      }
    </MainWrapper>
  )
}

export default AllUsers;
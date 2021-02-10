import React from "react";
import styled from "styled-components";

import AddUser from "../assets/HomeComponent/AddUser.svg";
import Expert from "../assets/HomeComponent/Expert.svg"
import Agenda from "../assets/HomeComponent/Agenda.svg";
import AllUsers from "../assets/HomeComponent/AllUsers.svg";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: 150px 150px;
  grid-gap: 50px;
`;

const CardStyles = styled.div`
  width: 150px;
  height: 150px; 
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 2px solid #01408C;
`;

const TitleStyles = styled.div`
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 40px;
`;

const TextStyles = styled.div`
  margin-top: 8px;
`;

const HomeComponent = () => {
  return (
    <>
      <TitleStyles>Welkom op het Licht en Liefde: Blended hulp portaal. <br /> Op deze webpagina kun je gemakkelijk alle gebruikers raadplagen, <br/> gebruikers verwijderen en linken aan elkaar.</TitleStyles>
      <CardGrid>
        <CardStyles>
          <img src={AddUser} alt="Voeg gebruiker toe" />
          <TextStyles>Voeg gebruiker toe</TextStyles>
        </CardStyles>
        <CardStyles>
          <img src={Expert} alt="Voeg expert toe" />
          <TextStyles>Voeg expert toe</TextStyles>
        </CardStyles>
        <CardStyles>
          <img src={Agenda} alt="Voeg agendaitem toe" />
          <TextStyles>Bekijk agenda items</TextStyles>
        </CardStyles>
        <CardStyles>
          <img src={AllUsers} alt="Bekijk alle gebruikers" />
          <TextStyles>Bekijk alle gebruikers</TextStyles>
        </CardStyles>
      </CardGrid>
    </>
  )
}

export default HomeComponent;
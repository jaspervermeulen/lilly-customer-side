import React, { useState } from "react"
import firebase from "./Auth/base";
import styled from "styled-components"

import logo from "./assets/logonl.png"

import users from "./assets/users.svg"
import home from "./assets/home.svg"
import expert from "./assets/expert.svg"

import AllUsers from "./Components/AllUsers";
import Users from "./Components/Users"
import Volunteers from "./Components/Volunteers"
import Experts from "./Components/Experts"
import CreateNewUser from "./Components/CreateNewUser";
import Agenda from "./Components/Agenda";
import News from "./Components/News";

import AddUserHome from "./assets/HomeComponent/AddUser.svg";
import Expert from "./assets/HomeComponent/Expert.svg"
import AgendaHome from "./assets/HomeComponent/Agenda.svg";
import AllUsersHome from "./assets/HomeComponent/AllUsers.svg";

import AgendaSideBar from "./assets/SideBar/Agenda.svg";
import NieuwsSideBar from "./assets/SideBar/Nieuws.svg";
import LogoutSideBar from "./assets/SideBar/Logout.svg";
import AddUserSideBar from "./assets/SideBar/AddUser.svg";

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 330px 1fr;
  height: 100vh;
`;

const SideBar = styled.div`
  z-index: 999;
  background-color: white;
  box-shadow: 0 0 10px #D0D0D0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 30px;
  padding-top: 30px;
  font-family: Helvetica, arial
`;

const LineStyles = styled.div`
  width: 95%;
  opacity: 0.1;
  margin: 30px 0;
  height: 2px;
  background-color: #01408C;
`;

const Content = styled.div`
  background-color: #FAFAFD;
  padding-top: 60px;
  padding-left: 30px;
  font-family: Helvetica, arial;
  overflow: scroll;
`;

const NavigationItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 5px;
  margin-left: 12px;
  outline: none;
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 10px;
`;

const TextStyles = styled.p`
  margin-bottom: -3px;
  margin-left: 7.5px;
  font-size: 16px;
`;

const TextStylesActive = styled.p`
  margin-bottom: -3px;
  margin-left: 7.5px;
  font-size: 16px;
  text-decoration: underline;
  font-weight: bold;
`;

const Img = styled.img`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Navigation = styled.div`
  margin-bottom: 350px;
`;

const WrapperMan = styled.div`
  margin-bottom: 60px;
`;

const LogOutButton = styled.button`
  font-size: 12px;
  padding: 15px;
  background-color: red;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 21px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  

  :hover{
    background-color: #F08080;
  }
`;

const LogOutImg = styled.img`
  margin-right: 10px;
`;

const AddUser = styled.div`
  margin-left: 20px;
`;

const AddUserButton = styled.button`
  font-size: 12px;
  padding: 15px;
  background-color: #01408C;
  outline: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;

  :hover{
    background-color: #53749C;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: 150px 150px;
  grid-gap: 50px;
`;

const CardStyles = styled.button`
  width: 170px;
  height: 170px; 
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 2px solid #01408C;
  font-size: 16px;
  cursor: pointer;

  :hover{
    border: 4px solid #01408C;
  }
`;

const TitleStyles = styled.div`
  font-size: 18px;
  line-height: 1.2;
  margin-bottom: 40px;
`;

const TextStylesHome = styled.div`
  margin-top: 8px;
`;

const Home = () => {

  const [currentMenuItem, setCurrentMenuItem] = useState("Home");

  return (
    <MainWrapper>
      <SideBar>
        <Img src={logo} width="200" />

        <Navigation>
          <NavigationItem onClick={() => setCurrentMenuItem("Home")}>
            <img src={home} alt="Home" />
            {
              currentMenuItem === "Home" ?  <TextStylesActive>Home</TextStylesActive> : <TextStyles>Home</TextStyles>
            }
          </NavigationItem>
          
          <NavigationItem onClick={() => setCurrentMenuItem("Users")} > 
            <img src={users} alt="Gebruikers" />
            {
              currentMenuItem === "Users" ?  <TextStylesActive>Alle gebruikers</TextStylesActive> : <TextStyles>Alle gebruikers</TextStyles>
            }
          </NavigationItem>

          <NavigationItem onClick={() => setCurrentMenuItem("Blind")}>
            <img src={users} alt="Blinden en slechtzienden" />
            {
              currentMenuItem === "Blind" ?  <TextStylesActive>Alle blinden en slechtzienden</TextStylesActive> : <TextStyles>Alle blinden en slechtzienden</TextStyles>
            }
          </NavigationItem>

          <NavigationItem onClick={() => setCurrentMenuItem("Volunteer")}>
            <img src={users} alt="Vrijwilligers" />
            {
              currentMenuItem === "Volunteer" ?  <TextStylesActive>Alle vrijwilligers</TextStylesActive> : <TextStyles>Alle vrijwilligers</TextStyles>
            }
          </NavigationItem>

          <NavigationItem onClick={() => setCurrentMenuItem("Expert")}>
            <img src={expert} alt="Experts" />
            {
              currentMenuItem === "Expert" ?  <TextStylesActive>De experten</TextStylesActive> : <TextStyles>De experten</TextStyles>
            }
          </NavigationItem>
          <LineStyles></LineStyles>
          <NavigationItem onClick={() => setCurrentMenuItem("Agenda")}>
            <img src={AgendaSideBar} alt="Agenda" />
            {
              currentMenuItem === "Agenda" ?  <TextStylesActive>Agenda</TextStylesActive> : <TextStyles>Agenda</TextStyles>
            }
          </NavigationItem>
          <NavigationItem onClick={() => setCurrentMenuItem("Nieuws")}>
            <img src={NieuwsSideBar} alt="Nieuws" />
            {
              currentMenuItem === "Nieuws" ?  <TextStylesActive>Nieuws</TextStylesActive> : <TextStyles>Nieuws</TextStyles>
            }
          </NavigationItem>
        </Navigation>


        <WrapperMan>
          <AddUser onClick={() => setCurrentMenuItem("New")}>
            
            <AddUserButton>
              <LogOutImg src={AddUserSideBar} alt="voeg gebruiker toe" />
              <p>Voeg nieuwe gebruiker toe</p>
            </AddUserButton>
          </AddUser>

          
          <LogOutButton onClick={() => firebase.auth().signOut()}>
            <LogOutImg src={LogoutSideBar} alt="Log uit" />
            <p>Log uit</p>
          </LogOutButton>
        </WrapperMan>
        
      </SideBar>
      <Content>

        {
          currentMenuItem === "Home" ? (
            <>
              <TitleStyles>Welkom op het Licht en Liefde: Blended hulp portaal. <br /> Op deze webpagina kun je gemakkelijk alle gebruikers raadplagen, <br/> gebruikers verwijderen en linken aan elkaar.</TitleStyles>
              <CardGrid>
                <CardStyles onClick={() => setCurrentMenuItem("New")}>
                  <img src={AddUserHome} alt="Voeg gebruiker toe" />
                  <TextStylesHome>Voeg gebruiker toe</TextStylesHome>
                </CardStyles>
                <CardStyles onClick={() => setCurrentMenuItem("Expert")}>
                  <img src={Expert} alt="Voeg expert toe" />
                  <TextStylesHome>Voeg expert toe</TextStylesHome>
                </CardStyles>
                <CardStyles onClick={() => setCurrentMenuItem("Agenda")}>
                  <img src={AgendaHome} alt="Voeg agendaitem toe" />
                  <TextStylesHome>Bekijk agenda items</TextStylesHome>
                </CardStyles>
                <CardStyles onClick={() => setCurrentMenuItem("Users")}>
                  <img src={AllUsersHome} alt="Bekijk alle gebruikers" />
                  <TextStylesHome>Bekijk alle gebruikers</TextStylesHome>
                </CardStyles>
              </CardGrid>
            </>
          ) : currentMenuItem === "Users" ? (
            <AllUsers />
          ) : currentMenuItem === "Blind" ? (
            <Users />
          ) : currentMenuItem === "Volunteer" ? (
            <Volunteers />
          ) : currentMenuItem === "Expert" ? (
            <Experts />          
          ) : currentMenuItem === "New" ? (
            <CreateNewUser />
          ) : currentMenuItem === "Agenda" ? (
            <Agenda />
          ) : currentMenuItem === "Nieuws" ? (
            <News />
          ) : (
            <CreateNewUser />
          )
        }
      </Content>
    </MainWrapper>
  )
}

export default Home;
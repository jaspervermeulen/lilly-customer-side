import React, { useState } from "react";
import styled from "styled-components";
import firebase from "../Auth/base";

import trash from "../assets/trash.svg"
import AgendaIcon from "../assets/Agenda/Agenda.svg";
import NaamIcon from "../assets/Agenda/Naam.svg";

const MainWrapper = styled.div`
  margin-bottom: 50px;
`;

const TitleStyles = styled.h1`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const CardStyles = styled.div`
  margin: 10px 20px 0 0;
  border: 1px darkgrey solid;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputStyles = styled.input`
  width: 200px;
  cursor: pointer;
`;

const ButtonStyles = styled.button`
  fill: white;
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

const TitleStylesSpecial = styled.h2`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Flex = styled.div`
  display: flex;
  margin: 10px 0;
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

const ImgIconWrap = styled.img`
  margin-right: 6px;
`;

const Agenda = () => {

  const [agendaItemNaam, setAgendaItemNaam] = useState()
  const [agendaItemDate, setAgendaItemDate] = useState()

  const [allAgendaItems, setAllAgendaItems]= useState([])

  const [completion, setCompletion] = useState(false);
  const [deletedSuccesfull, setDeletedSuccesfull] = useState(false);

  const addAgendaItem = (e) => {
    e.preventDefault();

    firebase.firestore().collection("Agenda").doc(agendaItemNaam).set({
      Naam: agendaItemNaam,
      Datum: agendaItemDate
    }).then(() => setCompletion(true)).catch(error => console.log(error))

    setAgendaItemNaam("");
    setAgendaItemDate("");
    
    getAgendaItems();
  }

  const getAgendaItems = async () => {
    const db = firebase.firestore()
    const data = await db.collection("Agenda").orderBy("Datum", "desc").get()
    setAllAgendaItems(data.docs.map(doc => doc.data()))
  }

  const deleteAgendaItem = (item) => {
    const db = firebase.firestore();
    db.collection("Agenda").doc(item.Naam).delete().then(function(){
      getAgendaItems();
    })
    setDeletedSuccesfull(true);
  }


  return (
    <MainWrapper>
      {
        completion === true ? (
          <GoodStatus>
            <p>Agendapunt succesvol toegevoegd!</p>
            <StatusButton onClick={() => setCompletion(false)}>Sluit</StatusButton>
          </GoodStatus>
        ) : (
          <>
          </>
        )
      }
      {
        deletedSuccesfull === true ? (
          <GoodStatus>
            <p>Agendapunt verwijderd!</p>
            <StatusButton onClick={() => setDeletedSuccesfull(false)}>Sluit</StatusButton>
          </GoodStatus>
        ) : (
          <>
          </>
        )
      }
      <TitleStyles>Nieuw agendapunt toevoegen</TitleStyles>
      <form onSubmit={addAgendaItem}>
        <LabelStyles>
          <p>Titel</p>
          <InputStyles
            type="text"
            required
            value={agendaItemNaam}
            onChange={e => setAgendaItemNaam(e.currentTarget.value)}
          />
        </LabelStyles>
        <LabelStyles>
          <p>Datum</p>
          <InputStyles
            type="date"
            required
            value={agendaItemDate}
            onChange={e => setAgendaItemDate(e.currentTarget.value)}
          />
        </LabelStyles>
        <ButtonStyles>Voeg agendapunt toe</ButtonStyles>
      </form>
      <TitleStylesSpecial>Alle agenda punten</TitleStylesSpecial>
      <ButtonStyles onClick={getAgendaItems}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
      </ButtonStyles>
      {
        allAgendaItems.map(item => (
          <CardStyles>
              <div>
              <Flex>
                <ImgIconWrap src={NaamIcon} alt="Naam" />
                <p> {item.Naam}</p>
              </Flex>
              <Flex>
                <ImgIconWrap src={AgendaIcon} alt="Agenda" />
                <p> {item.Datum}</p>
              </Flex>
            </div>
            <button onClick={() => deleteAgendaItem(item)}>
              <img src={trash} alt="vuilbakje" />
            </button>
          </CardStyles>
        ))
      }
    </MainWrapper>
  )
}

export default Agenda;
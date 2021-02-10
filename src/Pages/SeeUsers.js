import React, { useState } from "react";

import firebase from "../Auth/base";
import styled from 'styled-components'

const CardStyles = styled.div`
  margin: 10px;
  border: 1px black solid;
  padding: 10px;
`;

const SeeUsers = () => {

  const [allUsers, setAllUsers] = useState([])
  const [allVolunteers, setAllVolunteers] = useState([])
  const [allNormal, setAllNormal] = useState([])

  const [current, setCurrent] = useState("leeg")

  const [chosenOne, setChosenOne] = useState()

  const getAllUsers = async() =>{
    const db = firebase.firestore()
    const data = await db.collection("Users").get()
    setAllUsers(data.docs.map(doc => doc.data()))
    setCurrent("allUsers")
  }

  const getAllVolunteers = async() =>{
    const db = firebase.firestore()
    const data = await db.collection("Users").where("soort_gebruiker", "==", "Vrijwilliger").get()
    setAllVolunteers(data.docs.map(doc => doc.data()))
    const db2 = firebase.firestore()
    const data2 = await db2.collection("Users").where("soort_gebruiker", "==", "Gebruiker").get()
    setAllNormal(data2.docs.map(doc => doc.data()))
    setCurrent("allVolunteers")
  }

  const getAllNormal = async() =>{
    const db = firebase.firestore()
    const data = await db.collection("Users").where("soort_gebruiker", "==", "Gebruiker").get()
    setAllNormal(data.docs.map(doc => doc.data()))
    setCurrent("allNormal")
  }

  const updateLinksVolunteer = (idUser, idVol) => {
    firebase.firestore().collection("Users").doc(idVol).update({
      links: {
        idUser
      }
    })
    firebase.firestore().collection("Users").doc(idUser).update({
      links: {
        idVol
      }
    })
    setCurrent("allVolunteers")
  }

  return (
    <>
      <button onClick={getAllUsers}>Haal alle gebruikers op</button>
      <button onClick={getAllVolunteers}>Haal alle vrijwilligers op</button>
      <button onClick={getAllNormal}>Haal alle blinden of slechtzienden op</button>

      {
        current === "allUsers" ? (
          <h1>Alle gebruikers</h1>
        ) : current === "allVolunteers" ? (
          <>
          <h1>Alle vrijwilligers</h1>
          </>
        ) : current === "allNormal" ? (
          <h1>Alle blinden/slechtzienden</h1>
        ) : (
          <></>
        )
      }
      <div>
        {
          current === "allUsers" ? (
            allUsers.map(user => (
              <CardStyles key={user.id}>
                <p>Naam: {user.volledige_naam}</p>
                <p>Emailadres: {user.email}</p>
                <p>Soort gebruiker: {user.soort_gebruiker}</p>
              </CardStyles>
            ))
          ) : current === "allVolunteers" ? (
            allVolunteers.map(user => (
              <CardStyles key={user.id}>
                <p>Naam: {user.volledige_naam}</p>
                <p>Emailadres: {user.email}</p>

                <p>Link new user</p>
                <select name="normal" id="normal" onChange={e => setChosenOne(e.currentTarget.value)}>
                  <option selected disabled>-----</option>
                  {
                    allNormal.map(chosen => (
                      
                      <option key={chosen.id} value={chosen.id}>{chosen.email}</option>
                    ))
                  }
                </select>
                <button onClick={() => updateLinksVolunteer(chosenOne, user.id)}></button>
              </CardStyles>
            ))
          ) : (
            allNormal.map(user => (
              <CardStyles key={user.id}>
                <p>Naam: {user.volledige_naam}</p>
                <p>Emailadres: {user.email}</p>
              </CardStyles>
            ))
          )
        }
      </div>
    </>
  )
}

export default SeeUsers;
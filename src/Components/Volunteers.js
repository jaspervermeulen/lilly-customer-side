import React, { useState } from "react"
import firebase from "../Auth/base";
import styled from 'styled-components'

import users from "../assets/users.svg"
import mail from "../assets/mail.svg"
import trash from "../assets/trash.svg"
import add from "../assets/add.svg"


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
  align-items: center;
`;

const FlexListItem = styled.li`
  display: flex;
  margin: 14px;
  align-items: center;

  ::before{
    content: "•"
  }
`;

const Text = styled.p`
  margin-left: 10px;
`;

const Select = styled.select`
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

const FlexList = styled.ul`
  margin: 7px;
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

const MarginRight = styled.p`
  margin-right: 10px;
`;

const Volunteers = () => {
  
  const [allVolunteers, setAllVolunteers] = useState([])
  const [allNormal, setAllNormal] = useState([])
  const [chosenOne, setChosenOne] = useState()

  const [linkers, setLinkers] = useState()
  const [completion, setCompletion] = useState(false);


  const getAllVolunteers = async () => {
    const db = firebase.firestore()
    const data = await db.collection("Users").where("soort_gebruiker", "==", "Vrijwilliger").get()
    setAllVolunteers(data.docs.map(doc => doc.data()))
    const db2 = firebase.firestore()
    const data2 = await db2.collection("Users").where("soort_gebruiker", "==", "Gebruiker").get()
    setAllNormal(data2.docs.map(doc => doc.data()))
  }


  const updateLinksVolunteer = (GebruikerId, User) => {


    let docRef = firebase.firestore().collection("Users").doc(GebruikerId);
    docRef.get().then((doc) => {


      firebase.firestore().collection("Users").doc(User.id).update({
        links: firebase.firestore.FieldValue.arrayUnion(doc.data().volledige_naam)
      }, { merge: true })

      firebase.firestore().collection("Users").doc(GebruikerId).update({
        links: firebase.firestore.FieldValue.arrayUnion(User.volledige_naam)
      }, { merge: true })

      

    }).then(function () {
      getAllVolunteers();
    }).catch((error) => {
      console.log(error)
    })

    

  }

  const deleteUser = (user) => {

    let jobskill_query = firebase.firestore().collection('Users').where('links', "array-contains", user.volledige_naam);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.ref.delete();

        doc.ref.update({
          links: firebase.firestore.FieldValue.arrayRemove(user.volledige_naam)
        })
      });
      
    });

    const db = firebase.firestore()
    db.collection("Users").doc(user.id).delete().then(function () {
      getAllVolunteers();
      setCompletion(true)
    })
  }

  const deleteCertainLink = (link, user) => {
    
    let jobskill_query = firebase.firestore().collection('Users').where('volledige_naam', "==", link);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.ref.delete();

        doc.ref.update({
          links: firebase.firestore.FieldValue.arrayRemove(user.volledige_naam)
        })
      });
      
    });

    let ref = firebase.firestore().collection("Users").doc(user.id);
    ref.get().then(function (doc) {
      doc.ref.update({
        links: firebase.firestore.FieldValue.arrayRemove(link)
      })
    }).then(function () {
      getAllVolunteers();
    })
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
      <TitleStyles>Haal alle vrijwilligers op</TitleStyles>
      <ButtonStyles onClick={getAllVolunteers}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
      </ButtonStyles>
      {

        allVolunteers.map(user => (
          <CardStyles key={user.id}>
            <div>
            <Flex>
              <img src={users} alt="Naam" />
              <Text>{user.volledige_naam}</Text>
            </Flex>
            <Flex>
              <img src={mail} alt="Email" />
              <Text>{user.email}</Text>
            </Flex>

              

            <Flex>
              <img src={add} alt="Voeg toe" />
              <Select name="normal" id="normal" onChange={e => setChosenOne(e.currentTarget.value)}>
                <option selected disabled>-----</option>
                {
                  allNormal.map(chosen => (
                    <>
                    <option key={chosen.id} value={chosen.id}>{chosen.email}</option>
                    
                    </>
                  ))
                }
              </Select>
              <button onClick={() => updateLinksVolunteer(chosenOne, user)}>Voeg toe</button>
            </Flex>

            <div>
                <p>Gelinkte blinden of slechtzienden</p>
                <FlexList>
                  {
                    user.links.map(link => {
                      return <FlexListItem>
                        <MarginRight>{link}</MarginRight>
                        <button onClick={() => deleteCertainLink(link, user)}>Verwijder link</button>
                      </FlexListItem>
                    })
                  }
                </FlexList>
            </div>
            </div>
            <button onClick={() => deleteUser(user)}>
              <img src={trash} alt="Vuilbakje" />
            </button>
        </CardStyles>
      ))
        
      }

    </MainWrapper>
  )
}

export default Volunteers;

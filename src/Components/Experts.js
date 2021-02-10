import React, { useState } from "react";
import firebase from "../Auth/base";
import styled from "styled-components";

import users from "../assets/users.svg"
import trash from "../assets/trash.svg"
import phone from "../assets/phone.svg"
import work from "../assets/work.svg"
import add from "../assets/add.svg"

const CardStyles = styled.div`
  margin: 10px 20px 0 0;
  border: 1px darkgrey solid;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Select = styled.select`
  margin-left: 10px;
`;

const LabelStyles = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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

const FlexList = styled.ul`
  margin: 7px;
`;

const FlexListItem = styled.li`
  display: flex;
  margin: 14px;
  align-items: center;

  ::before{
    content: "•"
  }
`;

const MarginRight = styled.p`
  margin-right: 10px;
`;

const InputStyles = styled.input`
  width: 200px;
`;

const TitleStyles = styled.h1`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const TitleStylesSpecial = styled.h2`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
  margin-top: 30px;
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

const Flex = styled.div`
  display: flex;
  margin: 10px 0;
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

const Text = styled.p`
  margin-left: 10px;
`;

const Experts = () => {

  const [naam, setNaam] = useState()
  const [beroep, setBeroep] = useState()
  const [nummer, setNummer] = useState()
  const [completion, setCompletion] = useState(false);
  const [allExperts, setAllExperts] = useState([])
  const [chosenOne, setChosenOne] = useState()
  const [deletedSuccesfull, setDeletedSuccesfull] = useState(false);
  const [allNormal, setAllNormal] = useState([])

  const addNewExpert = e => {
    e.preventDefault();

    firebase.firestore().collection("Experts").doc(nummer).set({
      naam: naam,
      beroep: beroep,
      nummer: nummer,
      links: []
    }).then(() => setCompletion(true)).catch(error => console.log(error))

    setNaam("");
    setBeroep("");
    setNummer("");
    getAllExperts();
  }

  

  
  const getAllExperts = async () => {
    const db = firebase.firestore()
    const data = await db.collection("Experts").get()
    setAllExperts(data.docs.map(doc => doc.data()))
    const db2 = firebase.firestore()
    const data2 = await db2.collection("Users").where("soort_gebruiker", "==", "Gebruiker").get()
    setAllNormal(data2.docs.map(doc => doc.data()))
  }

  const updateLinksVolunteer = (GebruikerId, Expert) => {
    let docRef = firebase.firestore().collection("Users").doc(GebruikerId);
    docRef.get().then((doc) => {


      firebase.firestore().collection("Experts").doc(Expert.nummer).update({
        links: firebase.firestore.FieldValue.arrayUnion(doc.data().volledige_naam)
      }, { merge: true }).then(function () {
        getAllExperts();
      })

      firebase.firestore().collection("Users").doc(GebruikerId).update({
        linksExp: firebase.firestore.FieldValue.arrayUnion(Expert.naam)
      }, { merge: true })

      

    }).then(function () {
      getAllExperts();
    }).catch((error) => {
      console.log(error)
    })
  }


  const deleteExpert = expert => {

    let jobskill_query = firebase.firestore().collection('Users').where('linksExp', "array-contains", expert.naam);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.ref.delete();

        doc.ref.update({
          linksExp: firebase.firestore.FieldValue.arrayRemove(expert.naam)
        })
      });
      
    });

    const db = firebase.firestore();
    db.collection("Experts").doc(expert.nummer).delete().then(function(){
      getAllExperts();
    })
    setDeletedSuccesfull(true);
    
  }
  
  const deleteCertainLink = (link, expert) => {
    let jobskill_query = firebase.firestore().collection('Users').where('volledige_naam', "==", link);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.ref.delete();

        doc.ref.update({
          linksExp: firebase.firestore.FieldValue.arrayRemove(expert.naam)
        })
      });
      
    });

    let ref = firebase.firestore().collection("Experts").doc(expert.nummer);
    ref.get().then(function (doc) {
      doc.ref.update({
        links: firebase.firestore.FieldValue.arrayRemove(link)
      })
    }).then(function () {
      getAllExperts();
    })
  }

  return (
    <>
      {
        completion === true ? (
          <GoodStatus>
            <p>Expert succesvol toegevoegd!</p>
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
            <p>Expert succesvol verwijderd!</p>
            <StatusButton onClick={() => setDeletedSuccesfull(false)}>Sluit</StatusButton>
          </GoodStatus>
        ) : (
          <>
          </>
        )
      }
      <TitleStyles>Nieuwe expert toevoegen</TitleStyles>
      <form onSubmit={addNewExpert}>
        <LabelStyles>
          <p>Naam</p>
          <InputStyles
            type="text"
            required
            value={naam}
            onChange={e => setNaam(e.currentTarget.value)}
          />
        </LabelStyles>
        <LabelStyles>
          <p>Profession</p>
          <InputStyles
            type="text"
            required
            value={beroep}
            onChange={e => setBeroep(e.currentTarget.value)}
          />
        </LabelStyles>
        <LabelStyles>
          <p>Telefoonnummer</p>
          <InputStyles
            type="tel"
            pattern="04[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
            required
            value={nummer}
            onChange={e => setNummer(e.currentTarget.value)}
          />
        </LabelStyles>
        <ButtonStyles>Voeg expert toe</ButtonStyles>
      </form>
      <TitleStylesSpecial>Alle experten</TitleStylesSpecial>
      <ButtonStyles onClick={getAllExperts}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
      </ButtonStyles>
      {
        allExperts.map(expert => (
          <CardStyles key={expert.nummer}>
            <div>
              <Flex>
                <img src={users} alt="Naam" />
                <Text>{expert.naam}</Text>
              </Flex>
              
              <Flex>
                <img src={work} alt="Beroep" />
                <Text>{expert.beroep}</Text>
              </Flex>

              <Flex>
                <img src={phone} alt="Nummer" />
                <Text>{expert.nummer}</Text>
              </Flex>

              <Flex>
                <img src={add} alt="Voeg toe" />
                <Select name="normal" id="normal" onChange={e => setChosenOne(e.currentTarget.value)}>
                  <option selected disabled>-----</option>
                  {
                    allNormal.map(chosen => (
                      <>
                      <option key={chosen.id} value={chosen.id}>{chosen.volledige_naam}</option>
                      
                      </>
                    ))
                  }
                </Select>
                <button onClick={() => updateLinksVolunteer(chosenOne, expert)}>Voeg toe</button>
              </Flex>

              <div>
                <p>Gelinkte blinden of slechtzienden</p>
                <FlexList>
                  {
                    expert.links.map(link => {
                      return <FlexListItem>
                        <MarginRight>{link}</MarginRight>
                        <button onClick={() => deleteCertainLink(link, expert)}>Verwijder link</button>
                      </FlexListItem>
                    })
                  }
                </FlexList>
              </div>
              
            </div>
            <button onClick={() => deleteExpert(expert)}>
              <img src={trash} alt="vuilbakje" />
            </button>
          </CardStyles>
        ))
      }
    </>
  )
}

export default Experts;
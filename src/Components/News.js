import React, { useState } from "react";
import firebase from "../Auth/base";
import styled from "styled-components"
import trash from "../assets/trash.svg"

const CardStyles = styled.div`
  margin: 10px 20px 0 0;
  border: 1px darkgrey solid;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
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

const StatusButton = styled.button`
  border: 1px solid black;
  background-color: white;
  margin-left: 10px;
  cursor: pointer;

  :hover{
    background-color: lightgrey;
  }
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

const InputStylesSpecial = styled.textarea`
  width: 400px;
  height: 200px;
  cursor: pointer;
`;

const TitleStyles = styled.h1`
  font-size: 18px;
  text-decoration: underline;
  margin-bottom: 20px;
`;

const NewsTitle = styled.p`
  margin-bottom: 6px;
  font-weight: bold;
`;

const NewsDescription = styled.p`
  margin-bottom: 6px;
`;

const News = () => {
  const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [naam, setNaam] = useState()
  const [completion, setCompletion] = useState(false);
  const [allNewsItems, setAllNewsItems] = useState([])
  const [description, setDescription] = useState();
  const [deletedSuccesfull, setDeletedSuccesfull] = useState(false);

  const getNewsItems = async () => {
    const db = firebase.firestore()
    const data = await db.collection("News").get()
    setAllNewsItems(data.docs.map(doc => doc.data()))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(imageAsFile === '') {
      alert(`Dit is geen foto, dit is een ${typeof(imageAsFile)}`)
    }
    const uploadTask = firebase.storage().ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    
    uploadTask.on('state_changed', 
    (snapShot) => {
      
      console.log(snapShot)
    }, (err) => {
      
      console.log(err)
    }, () => {
      
      firebase.storage().ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
         firebase.firestore().collection("News").doc().set({
          Naam: naam,
          Img: fireBaseUrl,
          Omschrijving: description
         }).then(function () {
           setCompletion(true)
           setNaam("")
        setDescription("")
        getNewsItems();
        }).catch(error => console.log(error))
       })
       
    })

    
  }

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }

  const deleteNewsItem = (item) => {
    let jobskill_query = firebase.firestore().collection('News').where('Omschrijving','==',item.Omschrijving);
    jobskill_query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
      getNewsItems();
    });
    getNewsItems();
    setDeletedSuccesfull(true);
  }

  return (
    <>
      {
        completion === true ? (
          <GoodStatus>
            <p>Nieuws artikel succesvol toegevoegd!</p>
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
            <p>Nieuws artikel verwijderd!</p>
            <StatusButton onClick={() => setDeletedSuccesfull(false)}>Sluit</StatusButton>
          </GoodStatus>
        ) : (
          <>
          </>
        )
      }
      <TitleStyles>Nieuws artikel toevoegen</TitleStyles>
      <form onSubmit={handleSubmit}>
        <LabelStyles>
          <p>Titel</p>
          <InputStyles type="text" value={naam} required onChange={e => setNaam(e.currentTarget.value)} />
        </LabelStyles>
        <LabelStyles>
          <p>Korte omschrijving</p>
          <InputStylesSpecial value={description} required onChange={e => setDescription(e.currentTarget.value)} />
        </LabelStyles>
        <LabelStyles>
          <p>Afbeelding</p>
          <InputStyles type="file" required onChange={handleImageAsFile} />
        </LabelStyles>
        
        <ButtonStyles>Voeg nieuws item toe</ButtonStyles>
      </form>
      <TitleStylesSpecial>Alle nieuws artikelen</TitleStylesSpecial>
      <ButtonStyles onClick={getNewsItems}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"/></svg>
      </ButtonStyles>
      {
        allNewsItems.map(item => (
          <CardStyles key={item.naam}>
            <div>
              <NewsTitle>{item.Naam}</NewsTitle>
              <NewsDescription>{item.Omschrijving}</NewsDescription>
              <img src={item.Img} alt={item.Naam} height="100" />
            </div>
            <button onClick={() => deleteNewsItem(item)}>
              <img src={trash} alt="vuilbakje" />
            </button>
          </CardStyles>
        ))
      }
    </>
  )
}

export default News;
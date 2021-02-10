import React from "react";
import firebase from "../Auth/base";

const Logout = () => {
  return (
    <>
      <button onClick={() => firebase.auth().signOut()}>Log uit</button>
    </>
  )
}

export default Logout;
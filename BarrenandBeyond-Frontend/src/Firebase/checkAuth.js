import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

export default function CheckAuth() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true)
            setUserData(user)
        } else {
            setLoggedIn(false)
        }
    });
    return (`${loggedIn}, ${userData}`);
}
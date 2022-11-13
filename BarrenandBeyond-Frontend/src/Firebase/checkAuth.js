import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

export default function CheckAuth() {
    const [loggedIn, setLoggedIn] = useState(false)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    });
    return loggedIn;
}
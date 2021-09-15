import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

export default function ResolveAuthScreen({ navigation }) {
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
}

import { initializeApp } from "firebase/app";

import firebaseConfig from "./config";

const defaultApp = initializeApp(firebaseConfig);

export default defaultApp;

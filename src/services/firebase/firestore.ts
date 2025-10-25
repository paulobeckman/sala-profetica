import type { FirestoreSettings } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";

import defaultApp from ".";

const setting: FirestoreSettings = {};
const firestore = initializeFirestore(defaultApp, setting);

export default firestore;

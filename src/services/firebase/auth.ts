import { getAuth } from "firebase/auth";

import defaultApp from ".";

const auth = getAuth(defaultApp);

export default auth;

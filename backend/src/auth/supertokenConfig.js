// supertokensConfig.js
import supertokens from "supertokens-node";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";

export function configureSupertokens() {
  supertokens.init({
    framework: "express",
    supertokens: {
      connectionURI: "http://localhost:3567",
    },
    appInfo: {
      appName: "TillDate",
      apiDomain: "http://localhost:3000", // your backend
      websiteDomain: "http://localhost:5173", // your frontend
    },
    recipeList: [
      EmailPassword.init(), // initializes signin / sign up features
      Session.init(), // initializes session features
    ],
  });
}

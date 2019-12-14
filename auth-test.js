var firebaseConfig = {
  apiKey: "AIzaSyBd21986LaBMF3il0TkLSucG4H9s9TtVEg",
  authDomain: "auth-test-e9668.firebaseapp.com",
  databaseURL: "https://auth-test-e9668.firebaseio.com",
  projectId: "auth-test-e9668",
  storageBucket: "auth-test-e9668.appspot.com",
  messagingSenderId: "691591129176",
  appId: "1:691591129176:web:440a65e27a7124c5c2022d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start("#firebaseui-auth-container", {
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
  // Other config options...
});
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "https://moon-mnny.github.io/project-one/search.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  //   tosUrl: "<your-tos-url>",
  // Privacy policy url.
  //   privacyPolicyUrl: "<your-privacy-policy-url>"
};
//Finally, render the FirebaseUI Auth interface:
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

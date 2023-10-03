# TODO

- move login from userservice -> authservice
- oauths server side??
- images backend
- link fb / google accounts to profile

  - select field for normal / google / fb
  - public/friends/hidden tick

- on logout remove google/fb stuff also

## Facebook SDK

https://developers.facebook.com/docs/facebook-login/web/

- install types
  `npm install --save-dev @types/facebook-js-sdk`

- Make script in the frontend/public folder

```js
// <!-- Add the Facebook SDK for Javascript -->

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

window.fbAsyncInit = function () {
  // <!-- Initialize the SDK with your app and the Graph API version for your app -->
  // eslint-disable-next-line no-undef
  FB.init({
    appId: "YOURAPPID",
    xfbml: true,
    version: "v18.0",
    // version: "{the-graph-api-version-for-your-app}",
  });
  // <!-- If you are logged in, automatically get your name and email adress, your public profile information -->
  // FB.login(function (response) {
  //   if (response.authResponse) {
  //     console.log("Welcome!  Fetching your information.... ");
  //     FB.api("/me", { fields: "name, email" }, function (response) {
  //       // document.getElementById("profile").innerHTML =
  //       //   "Good to see you, " +
  //       //   response.name +
  //       //   ". i see your email address is " +
  //       //   response.email;
  //       console.log("FB RESPONSE", response);
  //     });
  //   } else {
  //     //  <!-- If you are not logged in, the login dialog will open for you to login asking for permission to get your public profile and email -->
  //     console.log("User cancelled login or did not fully authorize.");
  //   }
  // });
};
```

- add the script to index.html file

```html
<script src="%PUBLIC_URL%/fb-sdk.js"></script>
```

## GOOGLE OAUTH

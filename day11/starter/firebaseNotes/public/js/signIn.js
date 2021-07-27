const signIn = () => {
    console.log('signIn function called!');

    // Creates a new authentication provider for use with google accnts.
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            // Do smth with the result
            console.log(`Result is: ${result}`);

            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;

            console.log(user.uid);
            window.location = 'writeNote.html';
        })
        .catch(error => {
            // Handle the error
            console.log(error);
        })
};
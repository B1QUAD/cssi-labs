let googleUser, userId;

window.onload = () => {
    const noteField = document.querySelector('#noteText');
    const titleField = document.querySelector('#noteTitle');
    firebase.auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as: ${user.displayName}`);

                googleUser = user;
                userId = googleUser.uid;
            } else {
                window.location = 'index.html';
            }
        }); // Will be called if user is signed in
}

const submitNote = () => {
    var note = document.querySelector('#noteText').value;
    var title = document.querySelector('#noteTitle').value;

    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            note: note, 
        }
    );
}
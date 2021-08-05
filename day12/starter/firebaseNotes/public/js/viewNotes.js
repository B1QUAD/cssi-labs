/**
 * Pseudocode:
 * When the page loads check user login state
 *  If not logged in, redirect to log in page
 *  If logged in, get user's notes from DB and display them
 */

window.onload = () => {
    const ideaTitle = document.querySelector('#ideaTitle');
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Logged in
            const googleUid = user.uid;
            getNotes(googleUid);
            ideaTitle.innerHTML = `Some of ${user.displayName}'s Greatest Ideas Started Here`
        } else {
            // Not logged in
            window.location = 'index.html'
        }
    });
}

const getNotes = (userId) => {
    console.log(userId);
    
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
        writeNotesToHtml(snapshot.val());
    });
}

const writeNotesToHtml = (data) => {
    const noteRenderArea = document.querySelector('#app');
    
    for (let noteKey in data) {
        noteRenderArea.appendChild(createHtmlForNote(data[noteKey]))
    }
}

const color = [
    'has-background-success-dark',
    'has-background-warning-dark',
    'has-background-danger-dark'
];

function getColor() {
    return color[Math.floor(Math.random() * color.length)];
}

const createHtmlForNote = (note) => {
    // Create the element and put in the note data
    let columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    columnDiv.classList.add('is-one-quarter');

    let cardDiv = document.createElement('div');
    cardDiv.classList.add(`card`);
    cardDiv.classList.add(`${getColor()}`);
    columnDiv.appendChild(cardDiv);

    let header = document.createElement('header');
    header.classList.add('card-header');

    let p = document.createElement('p');
    p.classList.add('card-header-title');
    p.innerHTML = `Title:<br>${note.title}`;
    header.appendChild(p);
    cardDiv.appendChild(header);

    let cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardDiv.appendChild(cardContent);

    let content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = `Note:<br>${note.text.length > 0 ? note.text : 'Empty note. (ಥ﹏ಥ)'}`;
    cardContent.appendChild(content);

    return columnDiv;
}
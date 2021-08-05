let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);

  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    
    let array = data ? Object.entries(data).sort((pair, pair2) => {
        /**
         * Array.prototype.sort() has a parameter called compareFunction which is a first class function passed in 
         * that returns a -1, 0, 1 depending on the comparison in order to sort the array.
         */
        console.log(pair[1].title);
        console.log(pair2[1].title);
        return (pair[1].title).localeCompare(pair2[1].title);
    }) : []; // Make array empty if the object is null (empty)

    renderDataAsHtml(array);
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;

  for(const noteItem in data) {
    const note = data[noteItem][1];
    
    // For each note create an HTML card
    cards += createCard(note, data[noteItem][0]);
  };

  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note, noteId) => {
    return `<div class="column is-one-quarter">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">${note.title}</p>
                    </header>
                    <div class="card-content">
                        <div class="content">${note.text}</div>
                    </div>
                    <footer class="card-footer">
                        <a id="${noteId}" href="#" class="card-footer-item"
                            onclick="deleteNote('${noteId}')">
                            Delete
                        </a>
                        <a href="#" class="card-footer-item"
                            onclick="editNote('${noteId}')">
                            Edit
                        </a>
                        </footer>
                    </div>
                </div>`;
}

const deleteNote = (noteId) => {
    console.log(`Deleting note: ${noteId}`);
    firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
}

const editNote = (noteId) => {
    console.log(`Editing note: ${noteId}`);

    // Show the modal dialog
    const editNoteModal = document.querySelector('#editNoteModal');
    const titleInput = document.querySelector('#editTitleInput');
    const noteInput = document.querySelector('#editTextInput');

    const notesRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);
    notesRef.on('value', snapshot => {
        // Get the text from the note in the database
        const data = snapshot.val();
        console.log(data);
        titleInput.value = data.title;
        noteInput.value = data.text;
        // const noteDetails = data[noteId];
    })

    editNoteModal.classList.add('is-active'); // Actually makes it visible

    const saveButton = document.querySelector('#saveButton');
    saveButton.onclick = function() {
        saveEditedNote(noteId);
    };
    // Show the text in the modal

    // Put text in an input

    // Push changes
}

const closeEditModal = () => {
    const editNoteModal = document.querySelector('#editNoteModal');
    editNoteModal.classList.toggle('is-active');
}

const saveEditedNote = (noteId) => {
    console.log(`Saving: ${noteId}`);

    const newTitle = document.querySelector('#editTitleInput').value;
    const newNote = document.querySelector('#editTextInput').value;

    firebase.database().ref(`users/${googleUserId}/${noteId}`)
        .update({
            title: newTitle,
            text: newNote
    });

    closeEditModal();
}
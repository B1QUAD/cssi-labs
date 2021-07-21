var messageLoaded = false, attemptCounter = 0;
const passCodeInput = document.querySelector('#passcode');
const messageDisplay = document.querySelector('#message');

const getMessages = () => {
    messageLoaded = false;

    if (attemptCounter > 10) {
        messageDisplay.innerHTML = 'Lol nope';
        return;
    }

    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const passcodeAttempt = document.querySelector('#passcode').value;

        for (const key in data) {
            const record = data[key];
            const storedPasscode = record.passcode;

            if (passcodeAttempt === storedPasscode) {
                messageLoaded = true;
                console.log(`Message is: ${record.message}`);
                renderMessageAsHtml(record.message);
            }
        }

        if (!messageLoaded) {
            messageDisplay.innerHTML = 'Error no message found';
            attemptCounter++;
        }
    });
}

const renderMessageAsHtml = (message) => {
    passCodeInput.value = '';

    messageDisplay.innerHTML = message;
}
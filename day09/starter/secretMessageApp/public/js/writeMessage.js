const passcodeInput = document.querySelector('#passcode');
const msgInput = document.querySelector('#message');

const submitMessage = () => {
    console.log('Running');
    
    const passcodeValue = passcodeInput.value;
    const msgValue = msgInput.value;

    
    // Submit to firebase
    firebase.database().ref().push({
        message: msgValue,
        passcode: passcodeValue
    });

    passcodeInput.value = '';
    msgInput.value = '';
}

const sendMessageButton = document.querySelector('#button');
sendMessageButton.addEventListener('click', submitMessage);


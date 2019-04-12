var SESSION_KEY = "dx-demo-collaborative-editing-session-id";
var sessionId;
function getSessionId() {
    if (sessionId) {
        return sessionId;
    }
    var value = localStorage.getItem(SESSION_KEY) || generateRandomNumber();
    setSessionId(value);
    return value;
}
function setSessionId(value) {
    sessionId = value;
    localStorage.setItem(SESSION_KEY, value);
}
function generateRandomNumber() {
    var max = 1000000,
        min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
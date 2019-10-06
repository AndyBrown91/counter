import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";
import asap_companion from "./asap_companion"
import { localStorage } from "local-storage";

let INCREMENT_AMOUNT = "incrementAmount";
let SYNCED_KEY = "synced";
let stateKey = "state";

let state = {};

try {
    let jsonObject = JSON.parse(localStorage.getItem(stateKey));
    
    if (jsonObject)
        state = jsonObject
}
catch(error) {
    state = {};
}

// Settings have been changed
settingsStorage.onchange = function(evt) {
    sendValue(evt.key, evt.newValue);
}

// Settings were changed while the companion was not running
if (me.launchReasons.settingsChanged) {
    // Send the value of the setting
    sendValue(INCREMENT_AMOUNT, settingsStorage.getItem(INCREMENT_AMOUNT));
}

asap_companion.onmessage = message => {
    console.log(message);

    for (let key in message) {
        if (key != SYNCED_KEY) {
            if (! (key in state))
                state[key] = [];

            state[key].push(...message[key]["list"]);
        }
    }

    localStorage.setItem(stateKey, JSON.stringify(state));
}

function sendValue(key, val) {
    if (val) {
        sendSettingData({
            key: "Settings_" + key,
            value: JSON.parse(val)
        });
    }
}
function sendSettingData(data) {
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}

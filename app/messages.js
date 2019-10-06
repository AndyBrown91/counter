import * as messaging from "messaging";
import { inbox } from "file-transfer";
import * as fs from "fs";

export function Messages() {
    // this.settingsPrefix = "Settings_";

    // Messages.prototype.messages = function(controller) {
    //     messaging.peerSocket.onopen = function() {
    //         controller.onOpen();
    //     }

        // messaging.peerSocket.onmessage = function(evt) {
        //     let event = JSON.stringify(evt);
        //     console.log(event);
        //     let data = event["data"];
        //     console.log(data);
        //     if (data && data["key"] && data["key"].startsWith(this.settingsPrefix))
        //     {
        //         let value = data["value"];
        //         console.log(value);
        //         controller.onSettings(data["key"].replace(this.settingsPrefix, ""), value["name"]);
        //     }
        // }

    //     messaging.peerSocket.onerror = function(err) {
    //         controller.onDisconnected();
    //     }
    // }

    // Messages.prototype.getSocket = function() {
    //     return new Promise(function(resolve, reject) {
    //         if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    //             resolve(messaging.peerSocket);
    //         } else {
    //             reject();
    //         }
    //     });
    // }
}
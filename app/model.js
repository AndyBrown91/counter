import * as fs from "fs";
import utils from "./utils"; 
import asap from './asap_app';

export class Model {
    constructor() {
        this.addAmount = 0;
        this.stateFile = "state.txt";
        this.syncedKey = "synced";

        this.loadState();
        
        asap.onmessage = message => {
            console.log(message);
            this.acknowledgeSync();
        }
    }

    saveActivity(name, amount) {
        let newAmount = this.getCurrentAmount(name);
        newAmount += amount;

        // Don't save activity that will take the value below 0
        if (newAmount >= 0) {
            let newActivity = { "time": new Date().getTime(), "amount": amount };
            this.state[name]["list"].push(newActivity);

            this.saveState();
        }
    }

    getCurrentAmount(name) {
        let amount = this.getSyncedAmount(name);
        let today = utils.getToday().getTime();

        this.state[name]["list"].forEach(element => {
            if (element["time"] > today)
                amount += element["amount"];
        });

        return amount;
    }

    getSyncedAmount(name) {
        if (this.syncedKey in this.state[name])
            return this.state[name][this.syncedKey];

        return 0;
    }

    getGoalAmount(name) {
        return this.state[name]["goal"];
    }

    getActivities() { 
        let keys = Object.keys(this.state);
        let index = keys.indexOf(this.syncedKey);

        if (index != -1)
            keys.splice(index, 1);

        return keys;
    }

    startNewTransaction(name) {
        this.addAmount = 0;
        this.increment(name);
    }

    increment(name) {
        this.addAmount += this.getIncrementAmount(name);

        if (this.addAmount == 0)
            this.addAmount = this.getIncrementAmount(name);
    }

    decrement(name) {
        this.addAmount -= this.getIncrementAmount(name);

        if (this.addAmount == 0)
            this.addAmount = -this.getIncrementAmount(name);
    }

    getAddAmount() {
        return this.addAmount;
    }

    setIncrementAmount(name, newInc) {
        if (newInc && newInc > 0)
            this.state[name]["incrementAmount"] = newInc;
    }

    getIncrementAmount(name) {
        return this.state[name]["incrementAmount"];
    }

    loadState() {
        try {
            let jsonObject = fs.readFileSync(this.stateFile, "cbor");
            this.state = jsonObject

            // Clear yesterdays state
            if (this.state[this.syncedKey] < utils.getToday().getTime()) {
                console.log("Clearing old synced");
                let keys = this.getActivities();

                keys.forEach(element => {
                    this.state[element][this.syncedKey] = 0;
                }); 
            }
        }
        catch(error) {
            console.log(error);
            console.log("Creating default state");

            this.state = {
                "synced": 0,
                "Weight": {
                    "incrementAmount": 2,
                    "goal": 20,
                    "list": []
                },
                "Pull": {
                    "incrementAmount": 2,
                    "goal": 20,
                    "list": []
                },
                "Press": {
                    "incrementAmount": 5,
                    "goal": 100,
                    "list": []
                }
            };
        }
    }

    saveState() {
        this.sync();
        fs.writeFileSync(this.stateFile, this.state, "cbor");
    }

    sync() {
        asap.send(this.state);

        this.state[this.syncedKey] = utils.getToday().getTime();

        for (let key in this.state) {
            if (key != this.syncedKey) {
                this.state[key][this.syncedKey] = this.getCurrentAmount(key);
                this.state[key]["list"] = [];
            }
        }

        console.log("POST SYNC");
        console.log(JSON.stringify(this.state));
    }
}









import document from "document";

export class Controller {
    constructor(ui, messages, model) {
        this.ui = ui;
        this.messages = messages;
        this.model = model;

        this.updateStats();

        ui.hideStatus(false);
        this.changePage(true);

        for (let index in ui.typeElements) {
            const element = ui.typeElements[index];
            element.onactivate = () => {
                let pageName = element.id;
                pageName = pageName.replace("plus", "");

                model.startNewTransaction(pageName);

                ui.setNewAmount(model.getAddAmount());

                ui.setCurrentAmount(model.getCurrentAmount(pageName), model.getGoalAmount(pageName));
                this.changePage(false, pageName);
            };
        }

        ui.plus.onactivate = () => {
            this.increment();
        };

        ui.minus.onactivate = () => {
            this.decrement();
        };

        ui.save.onactivate = () => {
            model.saveActivity(ui.getCurrentPageName(), model.getAddAmount());
            
            this.updateStats();
            this.changePage(true);
        };

        let THIS = this;
        document.onkeypress = function (evt) {
            if (evt.key === "back") {
                if (! ui.isShowingTypePage()) {
                    evt.preventDefault();
                    THIS.changePage(true);
                }
            }
        };
    }

    increment() {
        this.model.increment(this.ui.getCurrentPageName());
        this.ui.setNewAmount(this.model.getAddAmount());
    }

    decrement() {
        this.model.decrement(this.ui.getCurrentPageName());
        this.ui.setNewAmount(this.model.getAddAmount());
    }

    updateStats() {
        let keys = this.model.getActivities();

        keys.forEach(element => {
            this.ui.setStat(element, this.model.getCurrentAmount(element));
        }); 
    }

    changePage(isTypePage, pageName) {
        let backgroundType = "normal";

        if (! isTypePage)
        {
            let current = this.model.getCurrentAmount(pageName);
            let goal = this.model.getGoalAmount(pageName);

            if (current < goal)
                backgroundType = "under";
            else if (current > goal) 
                backgroundType = "over";
        }

        this.ui.changePage(isTypePage, pageName);
        this.ui.changeBackground(backgroundType);
    }

    // Messaging
    onSettings(key, value) {
        console.log(key + " : " + value);
    }

    onOpen() {
        this.ui.changeSpinner(false);
        this.model.sync();
    }

    onDisconnected() {
        this.ui.changeSpinner(true);
        clearTimeout();
    }
}




import document from "document";
import utils from "./utils";

export class UI {
    constructor() {
        this.status = utils.getElemById("status");
        this.statusText = this.status.getElementById("text");

        this.background = utils.getElemById("background")

        this.spinner = utils.getElemById("spinner");

        // UI Elements
        this.typeNameElement = utils.getElemById("typeName");
        this.amountElement = utils.getElemById("amount");
        this.newAmountElement = utils.getElemById("newAmount");
        this.stats_we = utils.getElemById("stats-we");
        this.stats_pu = utils.getElemById("stats-pu");
        this.stats_pr = utils.getElemById("stats-pr");

        // Buttons
        this.save = utils.getElemById("save");
        this.plus = utils.getElemById("plus");
        this.minus = utils.getElemById("minus");
        this.plusPress = utils.getElemById("plusPress");
        this.plusPull = utils.getElemById("plusPull");
        this.plusWeight = utils.getElemById("plusWeight");

        this.showingTypePage = false;
        this.currentPage = "";

        this.typeElements = [
            this.plusPress, this.plusPull, this.plusWeight,
            this.stats_we, this.stats_pu, this.stats_pr
        ];

        this.addElements = [
            this.save, this.plus, this.minus, this.typeNameElement,
            this.amountElement, this.newAmountElement
        ];
    }

    showStatus(text) {
        this.statusText.text = text;
        this.status.animate("enable");
        this.status.style.display = "inline";
    }

    hideStatus(shouldAnimate) {
        if (shouldAnimate) {
            this.status.animate("disable");
            setTimeout(() => this.status.style.display = "none", 500);
        }
        else
            this.status.style.display = "none";
    }

    changePage(isTypePage, typeName) {
        for (let index in this.typeElements) {
            const element = this.typeElements[index];
            element.style.display = isTypePage ? "inline" : "none";
        }

        for (let index in this.addElements) {
            const element = this.addElements[index];
            element.style.display = isTypePage ? "none" : "inline";
        }

        typeName = isTypePage ? "" : typeName;

        this.showingTypePage = isTypePage;
        this.currentPage = typeName;
        this.typeNameElement.text = typeName.toUpperCase();
    }

    isShowingTypePage() {
        return this.showingTypePage;
    }

    getCurrentPageName() {
        return this.currentPage;
    }

    setNewAmount(newAmount) {
        let fillColour = "greenyellow";
        let sign = "+";

        if (newAmount < 0) {
            fillColour = "red";
            sign = "";
        }

        this.newAmountElement.text = `${sign}${newAmount}`;
        this.newAmountElement.style.fill = fillColour;
    }

    setCurrentAmount(currentAmount, targetAmount) {
        this.amountElement.text = `${currentAmount} / ${targetAmount}`;
    }

    setStat(key, value) {
        let keyString = key.substring(0, 2);
        let elem = utils.getElemById("stats-" + keyString.toLowerCase());

        elem.text = keyString.toUpperCase() + ": " + value;
    }

    changeSpinner(isLoading) {
        this.spinner.state = isLoading ? "enabled" : "disabled";
    }

    changeBackground(type) {
        if (this.background.style)
        {
            let backgrounds = {
                "normal" : {
                    "gradient-color1": "#0084be",
                    "gradient-color2": "#083a4f"
                },
                "over" : {
                    "gradient-color1": "#00be09",
                    "gradient-color2": "#104f08"
                },
                "under" : {
                    "gradient-color1": "#bfbfbf",
                    "gradient-color2": "#4f4f4f"
                }
            };

            let background = backgrounds[type];

            for (let key in background) {
                this.background.style[key] = background[key];
            }
        }
    }
}









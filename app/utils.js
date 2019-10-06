import document from "document";

export default class utils 
{
    static getElemById(id) {
        const elem = document.getElementById(id);

        if (! elem)
            console.log("Unable to get Element: " + id);

        return elem;
    }

    static getToday() {
        let today = new Date();
        today.setHours (0);
        today.setMinutes (0);
        today.setSeconds(0);
        today.setMilliseconds(1);

        return today;
    }
}
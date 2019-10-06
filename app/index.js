import { Model } from "./model"
import { UI } from "./ui";
import { Messages } from "./messages";
import { Controller } from "./controller.js";

let model = new Model();
let messages = new Messages();
let ui = new UI();
let controller = new Controller(ui, messages, model);

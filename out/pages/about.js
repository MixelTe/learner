import { themes } from "../themes.js";
import { switchPage } from "./switchPage.js";
export function showAbout(onSwitch = () => { }) {
    switchPage("about", { title: " | About", display: "" }, themes.common, onSwitch);
}

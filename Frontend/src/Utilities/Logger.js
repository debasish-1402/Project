import appConfig from "../config.json";
const date = () => {
    const dataTime = new Date();
    const year = dataTime.getFullYear();
    const month = dataTime.getMonth();
    const day = dataTime.getDay();
    const hours = dataTime.getHours();
    const minutes = dataTime.getMinutes();
    const seconds = dataTime.getSeconds();
    return (year.toString().substring(2, 4) +
        "/" +
        month.toString().padStart(2, "0") +
        "/" +
        day.toString().padStart(2, "0") +
        " " +
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0"));
};
export default class Logger {
    static infoOn = appConfig.infoOn;
    static errorOn = appConfig.errorOn;
    static warnOn = appConfig.warnOn;
    static traceOn = appConfig.traceOn;
    static log(message) {
        console.log(date() + " > " + message);
    }
    static info(message) {
        Logger.infoOn && Logger.log("[INFO]: " + message);
    }
    static warn(message) {
        Logger.warnOn && Logger.log("[WARN]: " + message);
    }
    static error(message) {
        Logger.errorOn && Logger.log("[ERROR]: " + message);
    }
    static trace(message) {
        Logger.traceOn && Logger.log("[TRACE]: " + message);
    }
}
export const trace = (target, property, descriptors) => {
    const original = descriptors.value;
    descriptors.value = async function (...args) {
        const result = await original.apply(this, args);
        Logger.trace(target.constructor.name +
            "::" +
            property +
            "(" +
            args.join() +
            ") --> " +
            JSON.stringify(result));
        return result;
    };
};

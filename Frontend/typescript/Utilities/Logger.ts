import appConfig from "../config.json";

const date = () => {
  const dataTime = new Date();
  const year = dataTime.getFullYear();
  const month = dataTime.getMonth();
  const day = dataTime.getDay();
  const hours = dataTime.getHours();
  const minutes = dataTime.getMinutes();
  const seconds = dataTime.getSeconds();

  return (
    year.toString().substring(2, 4) +
    "/" +
    month.toString().padStart(2, "0") +
    "/" +
    day.toString().padStart(2, "0") +
    " " +
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};

export default class Logger {
  public static infoOn: boolean = appConfig.infoOn;
  public static errorOn: boolean = appConfig.errorOn;
  public static warnOn: boolean = appConfig.warnOn;
  public static traceOn: boolean = appConfig.traceOn;

  public static log(message: string) {
    console.log(date() + " > " + message);
  }

  public static info(message: string) {
    Logger.infoOn && Logger.log("[INFO]: " + message);
  }

  public static warn(message: string) {
    Logger.warnOn && Logger.log("[WARN]: " + message);
  }

  public static error(message: string) {
    Logger.errorOn && Logger.log("[ERROR]: " + message);
  }

  public static trace(message: string) {
    Logger.traceOn && Logger.log("[TRACE]: " + message);
  }
}

export const trace = (
  target: any,
  property: string,
  descriptors: PropertyDescriptor
) => {
  const original = descriptors.value;
  descriptors.value = async function (...args: any[]) {
    const result = await original.apply(this, args);
    Logger.trace(
      target.constructor.name +
        "::" +
        property +
        "(" +
        args.join() +
        ") --> " +
        JSON.stringify(result)
    );
    return result;
  };
};

import type ITodoStorageService from "../Services/ITodoService.js";
import todoConfig from "../config.json" with { "type": "json"}
type ServiceType = { [key:string]: any};
export default class AppConfig {

  public static async getView() {
    const ViewClass = (await import(`/src/Views/${todoConfig.view}.js`)).default;
    return new ViewClass();
  }

  public static async getService(serviceName: string)  : Promise<ITodoStorageService>{
    const services : ServiceType = todoConfig.services;
    const foundService = services.find( ((service:ServiceType)=>service.name.toLowerCase() == serviceName.toLowerCase()));
    const ServiceClass = (await import(`/src/Services/${foundService.class}.js`)).default;
    const args = foundService.arguments;

    return new ServiceClass(args);
  }

  public static  getAllServiceNames() : string[] {

    const services : ServiceType = todoConfig.services;
    const serviceNames = services.map( (service:ServiceType) => service.name);
    return serviceNames;
  }
}

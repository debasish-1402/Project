import todoConfig from "../config.json" with { "type": "json" };
export default class AppConfig {
    static async getView() {
        const ViewClass = (await import(`/src/Views/${todoConfig.view}.js`)).default;
        return new ViewClass();
    }
    static async getService(serviceName) {
        const services = todoConfig.services;
        const foundService = services.find(((service) => service.name.toLowerCase() == serviceName.toLowerCase()));
        const ServiceClass = (await import(`/src/Services/${foundService.class}.js`)).default;
        const args = foundService.arguments;
        return new ServiceClass(args);
    }
    static getAllServiceNames() {
        const services = todoConfig.services;
        const serviceNames = services.map((service) => service.name);
        return serviceNames;
    }
}

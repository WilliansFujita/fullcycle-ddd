import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";

export default class SendConsoleWhenCustomerIsCreatedHandler1 implements EventHandlerInterface{

    handler(event: eventInterface): void {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated')
    }

}
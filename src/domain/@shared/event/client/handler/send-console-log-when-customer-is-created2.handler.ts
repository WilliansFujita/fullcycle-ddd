import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";

export default class SendConsoleWhenCustomerIsCreatedHandler2 implements EventHandlerInterface{

    handler(event: eventInterface): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated')
    }

}
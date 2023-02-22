import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleWhenCustomerIsCreatedHandler2 implements EventHandlerInterface{

    handler(event: CustomerCreatedEvent): void {
        console.log('Esse é o segundo console.log do evento: CustomerCreated')
    }

}
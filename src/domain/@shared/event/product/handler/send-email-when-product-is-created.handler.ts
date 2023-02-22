import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface{
    handler(event: ProductCreatedEvent): void {
        console.log('Sendind email to....')
    }

}
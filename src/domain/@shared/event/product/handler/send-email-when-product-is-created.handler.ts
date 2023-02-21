import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface{
    handler(event: eventInterface): void {
        console.log('Sendind email to....')
    }

}
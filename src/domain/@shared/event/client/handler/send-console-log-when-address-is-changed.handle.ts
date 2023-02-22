import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";

export default class SendConsoleWhenAddressIsChangedHandler implements EventHandlerInterface{

    handler(event: eventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.endereco}`)
    }

}
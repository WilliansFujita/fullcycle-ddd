import EventHandlerInterface from "../../event-handler.interface";
import eventInterface from "../../event.interface";
import AddressChangedEvent from "../address-changed.event";

export default class SendConsoleWhenAddressIsChangedHandler implements EventHandlerInterface{

    handler(event: AddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.endereco}`)
    }

}
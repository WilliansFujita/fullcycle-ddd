import EventDispatcher from "../event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleWhenAddressIsChangedHandler from "./handler/send-console-log-when-address-is-changed.handle";
import SendConsoleWhenCustomerIsCreatedHandler1 from "./handler/send-console-log-when-customer-is-created1.handler.";
import SendConsoleWhenCustomerIsCreatedHandler2 from "./handler/send-console-log-when-customer-is-created2.handler";

describe('Test send console log handler',()=>{


    it('should send console log handle when customer is created',()=>{
        const eventDispactcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleWhenCustomerIsCreatedHandler1();
        const eventHandler2 = new SendConsoleWhenCustomerIsCreatedHandler2();
        const spyEventHandler1 = jest.spyOn(eventHandler1,"handler")
        const spyEventHandler2 = jest.spyOn(eventHandler2,"handler")

        eventDispactcher.register("CustomerCreatedEvent",eventHandler1)
        eventDispactcher.register("CustomerCreatedEvent",eventHandler2)

        expect(eventDispactcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispactcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name:'Customer 1',
        }) 

        eventDispactcher.notify(customerCreatedEvent)

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

    it('should send console log handle when customer address is changed',()=>{
        const eventDispactcher = new EventDispatcher();
        const eventHandler = new SendConsoleWhenAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler,"handler")

        eventDispactcher.register("CustomerCreatedEvent",eventHandler)

        expect(eventDispactcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id:'c1',
            name:'Customer 1',
            endereco:'Rua Alterada'
        }) 

        eventDispactcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
    })
})
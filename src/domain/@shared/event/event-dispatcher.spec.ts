import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./product/product-created.event";

describe("Domain Events test",() => {


    it("Should register an event handler",()=>{
        const eventDispactcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispactcher.register("ProductCreatedEvent",eventHandler)

        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    })

    it("Should unregister an event handler",()=>{
        const eventDispactcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispactcher.register("ProductCreatedEvent",eventHandler)

        eventDispactcher.unregister("ProductCreatedEvent",eventHandler)

        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    })

    it("Should notify all event handlers",()=>{
        const eventDispactcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler,"handler")

        eventDispactcher.register("ProductCreatedEvent",eventHandler)
        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name:'Product 1',
            description:'Product 1 Description',
            price: 10.0
        }) 

        eventDispactcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled();
    })

    it("Should unregister all event handler",()=>{
        const eventDispactcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispactcher.register("ProductCreatedEvent",eventHandler)

        eventDispactcher.unregisterAll()

        expect(eventDispactcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    })
})
import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
    subject: Subjects;
    data: any;
}

abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], message: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000; //5sec

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionsOptions() {
        return this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }

    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionsOptions());

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );

            const data = this.parseMessage(msg);
            this.onMessage(data, msg);
        });
    }

    parseMessage(message: Message) {
        const data = message.getData();

        return typeof (data) === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }
}

export default Listener;
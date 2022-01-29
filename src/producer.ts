import { Kafka } from 'kafkajs';
import { GLOBAL_VARIABLES } from './global';

const kafka = new Kafka({
  clientId: 'chat-app',
  brokers: [GLOBAL_VARIABLES.KAFKA_ENDPOINT],
});

const producer = kafka.producer();

export function getConnection(user: string) {
  return producer.connect().then(() => {
    return (message: string) => {
      return producer.send({
        topic: 'chat-room', // the topic created before
        messages: [
          //we send the message and the user who sent it
          { value: JSON.stringify({ message, user }) },
        ],
      });
    };
  });
}

export function disconnect() {
  return producer.disconnect();
}

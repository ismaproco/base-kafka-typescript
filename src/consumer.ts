// src/consumer.ts
import { v4 as uuidv4 } from 'uuid';
import { Kafka } from 'kafkajs';
import { GLOBAL_VARIABLES } from './global';

const kafka = new Kafka({
  clientId: 'chat-app',
  brokers: [GLOBAL_VARIABLES.KAFKA_ENDPOINT],
});

const consumer = kafka.consumer({ groupId: uuidv4() }); // we need a unique groupId I'll explain down

export function connect() {
  return consumer.connect().then(() =>
    consumer.subscribe({ topic: 'chat-room' }).then(() =>
      consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const formattedValue = JSON.parse(
            (message.value as Buffer).toString()
          ); // everything comes as a buffer
          console.log(`${formattedValue.user}: ${formattedValue.message}`); // print the message
        },
      })
    )
  );
}

export function disconnect() {
  consumer.disconnect();
}

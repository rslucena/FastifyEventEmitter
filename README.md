# Fastify Event Emitter

This is a plugin for Fastify that adds event-based internal messaging functionality to your application. It uses the Node.js EventEmitter module to allow microservices to publish and listen to events within the microservice itself.

### Installation

To install the plugin, just clone this file and import it into your project.

### Use

To use the plugin, register it in your Fastify app:

```typescript
const fastify = require('fastify')()

fastify.register(require('fastify-internal-messages'), {
  queues: [
    {
      topic: 'NewTopic',
      onMessage: async (message) => {
        // Processar mensagem aqui...
      },'
    },
  ],
})
```

The `queues` property is an array of objects, where each object represents an internal message queue that the microservice can publish and listen to. Each object must have the following properties:

- `topic`: the name of the internal message queue.
- `onMessage`: an asynchronous function that will be called whenever a message is published in the queue.

### Post a message

After registering the plugin, you can `publish` a message to a queue using the publish method of the internalMessages object:

```typescript
fastify.internalMessages.publish('NewQuotasToBeCreated', {
  // Dados da mensagem aqui...
})
```

### License

MIT


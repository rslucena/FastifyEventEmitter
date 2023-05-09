import EventEmitter from 'events'
import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

export enum InternalMessagesQueues {
  NewTopic = 'NewTopic'
}

export interface InternalMessagesOptions {
  queues?: {
    topic: InternalMessagesQueues
    onMessage: (msg: any) => Promise<void>
  }[]
}

declare module 'fastify' {
  interface FastifyInstance {
    internalMessages: {
      connection: EventEmitter
      publish: (topic: InternalMessagesQueues, message: any) => Promise<void>
    }
  }
}

const fastifyInternalMessages: FastifyPluginAsync<
  InternalMessagesOptions
> = async (fastify: FastifyInstance, options: InternalMessagesOptions) => {
  const { queues } = options

  if (!queues) return

  const eventEmitter = new EventEmitter()

  // Registre cada ouvinte para cada tópico de evento.
  queues.forEach(({ topic, onMessage }) => {
    eventEmitter.on(topic, onMessage)
  })

  fastify.decorate('internalMessages', {
    connection: eventEmitter,
    publish: (topic: InternalMessagesQueues, message: any) => {
      eventEmitter.emit(topic, message)
    }
  })
}

export default fastifyPlugin(
  fastifyInternalMessages
) as FastifyPluginAsync<InternalMessagesOptions>

'use strict';

const amqp = require('fluent-amqp');
const queueName = 'loyalty-crawler-queue';
const exchange = 'order-status';
const exchangeType = 'topic';

console.log('payment service worker started', process.pid);

amqp('amqp://localhost')
  .exchange(exchange, exchangeType, { durable: true })
  .queue(queueName, { durable: true, messageTtl: 5000 })
  .subscribe(['status.local.*.*.*'])
  .each(msg => {
    console.log(`Loyalty crawler [${process.pid}] received [${msg.fields.routingKey}] '${msg.string()}'`);
    msg.ack();
  });

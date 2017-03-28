'use strict';

const amqp = require('fluent-amqp');
const queueName = 'payment-service-queue';
const exchange = 'order-status';
const exchangeType = 'topic';

console.log('payment service worker started', process.pid);

amqp('amqp://localhost')
  .exchange(exchange, exchangeType, { durable: true })
  .queue(queueName, { durable: true })
  .subscribe(['status.local.510.*.*'])
  .each(msg => {
    console.log(`Payment service [${process.pid}] received [${msg.fields.routingKey}] '${msg.string()}'`);
    msg.ack();
  });

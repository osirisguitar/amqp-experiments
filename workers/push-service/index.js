'use strict';

const amqp = require('fluent-amqp');
const queueName = 'push-service-queue';
const exchange = 'order-status';
const exchangeType = 'topic';

console.log('payment service worker started', process.pid);

amqp('amqp://localhost')
  .exchange(exchange, exchangeType, { durable: true })
  .queue(queueName, { durable: true, messageTtl: 1000 * 60 * 60 * 2 /* 2 hours */ })
  .subscribe(['status.*.120.*.*', 'status.*.130.*.*', 'status.*.220.*.*', 'status.*.310.*.*', 'status.*.320.*.*', 'status.*.410.*.*', 'status.*.510.*.*', 'status.*.610.*.*', 'status.*.620.*.*'])
  .each(msg => {
    console.log(`Push service [${process.pid}] received [${msg.fields.routingKey}] '${msg.string()}'`);
    msg.ack();
  });

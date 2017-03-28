'use strict';

const amqp = require('fluent-amqp');
const exchangeName = 'order-status';
const exchangeType = 'topic';

let order = {
  id: 123,
  passenger: {
    name: 'foo'
  }
};

const types = ['local', 'local', 'suti'];
const statuses = [{
  code: 110,
  name: 'New'
}, {
  code: 120,
  name: 'Confirmed'
}, {
  code: 121,
  name: 'ConfirmedWithChanges'
}, {
  code: 130,
  name: 'Rejected'
}, {
  code: 210,
  name: 'CancellationRequested'
}, {
  code: 220,
  name: 'Cancelled'
}, {
  code: 230,
  name: 'cancellationAcceptedWithConsequence'
}, {
  code: 240,
  name: 'cancellationRejected'
}, {
  code: 310,
  name: 'Dispatched'
}, {
  code: 320,
  name: 'AtPickup'
}, {
  code: 410,
  name: 'EnRoute'
}, {
  code: 510,
  name: 'Done'
}, {
  code: 610,
  name: 'Terminated'
}, {
  code: 620,
  name: 'TerminatedNoShow'
}, {
  code: 630,
  name: 'Annulled'
}];

// send
function sendRandomOrderStatus () {
  let topic = getRandomTopic();
  order.id = Math.floor(Math.random() * (19999999 - 10000000) + 10000000);

  topic += '.' + order.id;

  amqp('amqp://localhost')
    .exchange(exchangeName, exchangeType, { durable: true })
    .publish(JSON.stringify(order), topic)
    /*.then(() => console.log(`Sent '${order.id}' with topic ${topic}`));*/
}

function getRandomTopic () {
  let type = getRandomArrayItem(types);
  let status = getRandomArrayItem(statuses);

  return `status.${type}.${status.code}.${status.name}`;
}

function getRandomArrayItem (anArray) {
  return anArray[Math.floor(Math.random() * anArray.length)];
}

setInterval(sendRandomOrderStatus, 1);

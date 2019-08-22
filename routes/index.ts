import Router from 'next-routes';

export default new Router()
  .add('room', '/room/:id')
  .add('preview-room', '/preview-room/:id')
  .add('not-found-resource', '/not-found-resource')
  .add('user', '/user/:id')
  .add('booking-cancel', '/booking-cancel/:id')
  .add('reviews', '/reviews/:id')
  .add('promotion', '/promotion/:id')
  .add('collection', '/collection/:id')
  .add('/payment/invoice/:uuid', 'payment/invoice')
  .add('/payment/direct/:uuid', 'payment/direct');

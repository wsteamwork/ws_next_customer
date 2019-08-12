import Router from 'next-routes';

export default new Router()
  .add('room', '/room/:id')
  .add('user', '/user/:id')
  .add('/payment/invoice/:uuid', 'payment/invoice')
  .add('/payment/direct/:uuid', 'payment/direct');

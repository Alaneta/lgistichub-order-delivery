import {
  createReq,
  deleteReq,
  findAllByCarrierReq,
  getOneReq,
  updateReqBody,
  updateReqParams,
} from './orderDelivery.validator'

export const SchemaValidators: any = {
  '/orders': {
    GET: [
      {
        name: findAllByCarrierReq,
        type: 'query',
      },
    ],
    POST: [
      {
        name: createReq,
        type: 'body',
      },
    ],
  },
  '/orders/:id': {
    GET: [
      {
        name: getOneReq,
        type: 'params',
      },
    ],
    PATCH: [
      {
        name: updateReqBody,
        type: 'body',
      },
      {
        name: updateReqParams,
        type: 'params',
      },
    ],
    DELETE: [
      {
        name: deleteReq,
        type: 'params',
      },
    ],
  },
}

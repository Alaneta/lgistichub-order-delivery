import Joi from 'joi'
import {
  ORDER_STATUS_APPROVED,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PREP_INPROGRESS,
  ORDER_STATUS_SENT,
} from '../constants'

export const findAllByCarrierReq = Joi.object({
  idCarrier: Joi.string().when('$isCarrier', {
    is: Joi.valid(true),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  size: Joi.number().optional(),
  page: Joi.number().optional(),
}).with('page', 'size')

export const getOneReq = Joi.object({
  id: Joi.number().required(),
})

export const createReq = Joi.object({
  idStore: Joi.string().required(),
  idOrder: Joi.number().required(),
  idSeller: Joi.number().required(),
  sellerName: Joi.string().required(),
  idCarrier: Joi.string().required(),
  idDeliveryType: Joi.number().required(),
  deliveryTypeName: Joi.string().required(),
  idContract: Joi.number().required().allow(null),
  status: Joi.number().required(),
  totalShippingTaxExcl: Joi.number().required(),
  totalShippingTaxIncl: Joi.number().required(),
  carrierTaxRate: [Joi.string().optional(), Joi.allow(null)],
  totalShipping: Joi.number().required(),
  customer: Joi.object().required(),
  products: Joi.array().required(),
  addressDelivery: Joi.object().required(),
  addressPickup: Joi.object().required(),
})

export const deleteReq = Joi.object({
  id: Joi.number().required(),
})

export const updateReqBody = Joi.object({
  status: Joi.number().when('$isCarrier', {
    is: Joi.valid(true),
    then: Joi.valid(Number(ORDER_STATUS_SENT), Number(ORDER_STATUS_DELIVERED)),
    otherwise: Joi.when('$isStore', {
      is: Joi.valid(true),
      then: Joi.valid(
        Number(ORDER_STATUS_APPROVED),
        Number(ORDER_STATUS_CANCELLED),
        Number(ORDER_STATUS_PREP_INPROGRESS)
      ),
    }),
  }),
  trackingCode: Joi.string().when('$isCarrier', {
    is: Joi.valid(true),
    then: Joi.optional(),
    otherwise: Joi.when('$isStore', {
      is: Joi.valid(true),
      then: Joi.forbidden(),
    }),
  }),
  trackingLink: Joi.string()
    .uri()
    .when('$isCarrier', {
      is: Joi.valid(true),
      then: Joi.optional(),
      otherwise: Joi.when('$isStore', {
        is: Joi.valid(true),
        then: Joi.forbidden(),
      }),
    }),
})
  .or('status', 'trackingCode')
  .with('trackingCode', 'trackingLink')
  .with('trackingLink', 'trackingCode')

export const updateReqParams = Joi.object({
  id: Joi.number().required(),
})

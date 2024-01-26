import Logger from '../logger'
import { OK } from 'http-status'
import { Messages } from '../global'
import { NextFunction, Request, Response, Router } from 'express'
import schemaValidator from '../server/middleware/schemaValidator'
import OrderDeliveryService from '../services/OrderDeliveryService'
import {
  fcheckScope,
  checkScope,
  SCOPE_ALLCARRIER_READ,
  SCOPE_ALLCARRIER_WRITE,
  SCOPE_CARRIER_READ,
  SCOPE_CARRIER_WRITE,
  SCOPE_STORE_READ,
  SCOPE_STORE_WRITE,
} from '../server/middleware/scopeHandler'
import checkItsMe from '../server/middleware/checkItsMe'

async function findAllByCarrier(req: Request, res: Response, next: NextFunction) {
  try {
    const idCarrier = fcheckScope(req.scopes, [SCOPE_CARRIER_READ]) ? req.clientID : (req.query.idCarrier as string)
    const page = Number(req.query.page)
    const size = Number(req.query.size)
    res.status(OK).json(await OrderDeliveryService.findAllByCarrier(idCarrier, page, size))
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newIdOrderDelivery = await OrderDeliveryService.create(req.body, req.headers.authorization as string)
    res.status(OK).json({ message: Messages[req.route.path][req.method].success, idOrderDelivery: newIdOrderDelivery })
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const idOrderDelivery = Number(req.params.id)
    const result = await OrderDeliveryService.destroy(idOrderDelivery)

    res.status(result).json({ message: Messages[req.route.path][req.method].success })
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const idOrderDelivery = Number(req.params.id)
    const result = await OrderDeliveryService.update(idOrderDelivery, req.body, req.headers.authorization as string)

    res.status(result).json({ message: Messages[req.route.path][req.method].success })
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const idOrderDelivery = Number(req.params.id)
    const orderDelivery = await OrderDeliveryService.getOne(idOrderDelivery)
    res.status(OK).json(orderDelivery)
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}

const router = Router()

router.get(
  '/orders',
  checkScope([SCOPE_ALLCARRIER_READ, SCOPE_STORE_READ, SCOPE_CARRIER_READ]),
  schemaValidator,
  checkItsMe,
  findAllByCarrier
)

router.get(
  '/orders/:id',
  checkScope([SCOPE_ALLCARRIER_READ, SCOPE_STORE_READ, SCOPE_CARRIER_READ]),
  schemaValidator,
  checkItsMe,
  getOne
)

router.post('/orders', checkScope([SCOPE_ALLCARRIER_WRITE, SCOPE_STORE_WRITE]), schemaValidator, create)

router.delete('/orders/:id', checkScope([SCOPE_ALLCARRIER_WRITE]), schemaValidator, destroy)

router.patch(
  '/orders/:id',
  checkScope([SCOPE_ALLCARRIER_WRITE, SCOPE_STORE_WRITE, SCOPE_CARRIER_WRITE]),
  schemaValidator,
  checkItsMe,
  update
)

export const OrderDelivery = router

/**
 * @swagger
 * components:
 *  schemas:
 *    OrderDelivery:
 *       type: object
 *       properties:
 *         idStore:
 *           type: integer
 *         idOrder:
 *           type: integer
 *         idSeller:
 *           type: integer
 *         sellerName:
 *           type: string
 *         idCarrier:
 *           type: integer
 *         idDeliveryType:
 *           type: integer
 *         deliveryTypeName:
 *           type: string
 *         totalShippingTaxExcl:
 *           type: decimal
 *         totalShippingTaxIncl:
 *           type: decimal
 *         customer:
 *           type: json
 *         products:
 *           type: json
 *         addressDelivery:
 *           type: json
 *         addressPickup:
 *           type: json
 *       required:
 *         - idStore
 *         - idOrder
 *         - idSeller
 *         - sellerName
 *         - idCarrier
 *         - idDeliveryType
 *         - deliveryTypeName
 *         - totalShippingTaxExcl
 *         - totalShippingTaxIncl
 *         - customer
 *         - products
 *         - addressDelivery
 *         - addressPickup
 *       example:
 *        {
 *         idStore: 12,
 *         idOrder: 34426,
 *         idSeller: 95,
 *         sellerName: Fravega,
 *         idCarrier: 32,
 *         idDeliveryType: 5,
 *         deliveryTypeName: Envío Express,
 *         totalShippingTaxExcl: 1500.00,
 *         totalShippingTaxIncl: 1815.00,
 *         customer: {
 *            id: 1080,
 *            firstname: Gabriel,
 *            lastname: Tonelli,
 *            email: gabrieltonelli@gmail.com,
 *            doc_type: DNI,
 *            doc_number: 27460965,
 *            phone: 2352-440495
 *          },
 *          products: [{}],
 *          addressDelivery: {
 *            country: Argentina,
 *            state: Buenos Aires,
 *            city: Chacabuco,
 *            postcode: 6740,
 *            street: Dean Funes,
 *            number: 218,
 *            floor: 5,
 *            department: D,
 *            other: red door
 *          },
 *          addressPickup: {
 *            country: Argentina,
 *            state: Buenos Aires,
 *            city: Cordoba,
 *            postcode: 7556,
 *            street: Las Rosas,
 *            number: 20,
 *            floor: 1,
 *            department: A,
 *            other: Gate
 *          }
 *         }
 *    OrderDeliveryUpdate:
 *       type: object
 *       properties:
 *         idStatus:
 *           type: integer
 *         trackingCode:
 *           type: string
 *         trackingLink:
 *           type: string
 *       required:
 *         - idStatus
 *         - trackingCode
 *         - trackingLink
 *       example:
 *        {
 *         idStatus: 5,
 *         trackingCode: "887326ABC",
 *         trackingLink: "https://carrierlink.com?tracking=",
 *        }
 * tags:
 *  name: OrderDelivery
 *  description: All OrderDelivery endpoints
 *
 * /api/orders:
 *  get:
 *    summary: Get Order Deliveries by idCarrier
 *    tags: [OrderDelivery]
 *    parameters:
 *       - in: query
 *         name: idCarrier
 *         schema:
 *           type: number
 *    responses:
 *      200:
 *        description: Object with the data of the Order Delivery created
 *        content:
 *          array:
 *            example:
 *              [{
 *                idOrderDelivery: 1,
 *                idStore: 12,
 *                idOrder: 34426,
 *                idSeller: 95,
 *                sellerName: Fravega,
 *                idCarrier: 32,
 *                idDeliveryType: 5,
 *                deliveryTypeName: Envío Express,
 *                totalShippingTaxExcl: 1500.00,
 *                totalShippingTaxIncl: 1815.00,
 *                customer: {
 *                  id: 1080,
 *                  firstname: Gabriel,
 *                  lastname: Tonelli,
 *                  email: gabrieltonelli@gmail.com,
 *                  doc_type: DNI,
 *                  doc_number: 27460965,
 *                  phone: 2352-440495
 *                },
 *                products: [{}],
 *                addressDelivery: {
 *                  country: Argentina,
 *                  state: Buenos Aires,
 *                  city: Chacabuco,
 *                  postcode: 6740,
 *                  street: Dean Funes,
 *                  number: 218,
 *                  floor: 5,
 *                  department: D,
 *                  other: red door
 *                },
 *                addressPickup: {
 *                  country: Argentina,
 *                  state: Buenos Aires,
 *                  city: Cordoba,
 *                  postcode: 7556,
 *                  street: Las Rosas,
 *                  number: 20,
 *                  floor: 1,
 *                  department: A,
 *                  other: Gate
 *                }
 *              }]
 *      400:
 *        description: Failure Message
 *
 *  post:
 *    summary: Create a Order Delivery
 *    tags: [OrderDelivery]
 *    requestBody:
 *      description: idStore, idOrder, idSeller, sellerName, idCarrier, idDeliveryType, deliveryTypeName, totalShippingTaxExcl, totalShippingTaxIncl, customer, products, addressDelivery, addressPickup
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderDelivery'
 *    responses:
 *      200:
 *        description: Success Message and id of the Order Delivery created
 *        content:
 *          application/json:
 *            example:
 *              message: Order Delivery created succesfully
 *              idOrderDelivery: 5
 *      400:
 *        description: Order Delivery could not be created
 *
 * /api/orders/{id}:
 *  get:
 *    summary: Get Order Deliveries by id
 *    tags: [OrderDelivery]
 *    parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: number
 *    responses:
 *      200:
 *        description: Object with the data of the Order Delivery requested
 *        content:
 *          application/json:
 *            example:
 *              {
 *                idOrderDelivery: 1,
 *                idStore: 12,
 *                idOrder: 34426,
 *                idSeller: 95,
 *                sellerName: Fravega,
 *                idCarrier: 32,
 *                idDeliveryType: 5,
 *                deliveryTypeName: Envío Express,
 *                totalShippingTaxExcl: 1500.00,
 *                totalShippingTaxIncl: 1815.00,
 *                customer: {
 *                  id: 1080,
 *                  firstname: Gabriel,
 *                  lastname: Tonelli,
 *                  email: gabrieltonelli@gmail.com,
 *                  doc_type: DNI,
 *                  doc_number: 27460965,
 *                  phone: 2352-440495
 *                },
 *                products: [{}],
 *                addressDelivery: {
 *                  country: Argentina,
 *                  state: Buenos Aires,
 *                  city: Chacabuco,
 *                  postcode: 6740,
 *                  street: Dean Funes,
 *                  number: 218,
 *                  floor: 5,
 *                  department: D,
 *                  other: red door
 *                },
 *                addressPickup: {
 *                  country: Argentina,
 *                  state: Buenos Aires,
 *                  city: Cordoba,
 *                  postcode: 7556,
 *                  street: Las Rosas,
 *                  number: 20,
 *                  floor: 1,
 *                  department: A,
 *                  other: Gate
 *                }
 *              }
 *      400:
 *        description: Failure Message
 *
 *  delete:
 *    summary: Delete a OrderDelivery by id
 *    tags: [OrderDelivery]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: id of a order delivery
 *    responses:
 *      204
 *  patch:
 *    summary: Update status of the OrderDelivery or set Tracking Code and Tracking Link fields
 *    tags: [OrderDelivery]
 *    requestBody:
 *      description: status, trackingCode, trackingLink
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderDeliveryUpdate'
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: id of a OrderDelivery
 *    responses:
 *      200:
 *        description: Success message
 *        content:
 *          application/json:
 *            example:
 *              message: OrderDelivery updated succesfully
 *      400:
 *        description: Order Delivery could not be updated
 */

export const Messages = {
  '/orders': {
    GET: {
      fail: 'Failed to retrieve orders',
    },
    POST: {
      success: 'Order Delivery created succesfully',
      fail: 'Order Delivery could not be created',
    },
  },
  '/orders/:id': {
    GET: {
      fail: 'Failed to retrieve order',
    },
    PATCH: {
      success: 'Order Delivery updated succesfully',
      fail: 'Order Delivery could not be updated',
    },
    DELETE: {
      success: 'Order Delivery deleted succesfully',
      fail: 'Order Delivery could not be deleted',
    },
  },
  notFound: 'Could not find a Order Delivery with that id',
  fileNotExists: 'File does not exist',
  databaseExistanceVerificationError: 'An error ocurred during the database and tables existance verification',
  unprocessableEntity: 'Request could not be processed',
  unauthorized: 'Not authorized',
  statusCantBeUpdated: 'Order Delivery cannot be updated',
  trackingDataCantBeUpdated:
    'Tracking data can only be updated when order status is approved or preparation in progress',
  trackingDataExists: 'Tracking data has already been updated and notified, this data can no longer be changed',
  storeUuidNotFound: 'The store UUID was not found in the tenants.json',
  noCredentials: 'No Credentials',
}

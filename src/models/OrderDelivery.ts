import { Table, Column, Model, AllowNull, NotEmpty, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({
  underscored: true,
  timestamps: true,
  indexes: [
    {
      unique: false,
      fields: ['id_carrier'],
    },
    {
      unique: true,
      fields: ['id_order', 'id_store'],
    },
  ],
})
export default class OrderDelivery extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    field: 'id_order_delivery',
  })
  idOrderDelivery: number

  @AllowNull(false)
  @Column
  idOrder: number

  @AllowNull(false)
  @Column({
    type: 'binary(16)',
  })
  idStore

  @AllowNull(false)
  @Column
  idSeller: number

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING(60))
  sellerName: string

  @AllowNull(false)
  @Column(DataType.CHAR(32))
  idCarrier: string

  @AllowNull(false)
  @Column
  idDeliveryType: number

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.STRING(60))
  deliveryTypeName: string

  @AllowNull(true)
  @Column
  idContract: number

  @AllowNull(true)
  @Column
  status: number

  @AllowNull(true)
  @Column(DataType.DECIMAL(20, 6))
  totalShippingTaxExcl: number

  @AllowNull(true)
  @Column(DataType.DECIMAL(20, 6))
  totalShippingTaxIncl: number

  @AllowNull(true)
  @Column(DataType.DECIMAL(20, 6))
  totalShipping: number

  @AllowNull(true)
  @Column(DataType.STRING(64))
  trackingCode: string

  @AllowNull(true)
  @Column(DataType.STRING(255))
  trackingLink: string

  @AllowNull(false)
  @Column(DataType.JSON)
  customer: JSON

  @AllowNull(false)
  @Column(DataType.JSON)
  products: JSON

  @AllowNull(false)
  @Column(DataType.JSON)
  addressDelivery: JSON

  @AllowNull(false)
  @Column(DataType.JSON)
  addressPickup: JSON
}

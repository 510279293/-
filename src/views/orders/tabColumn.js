const column0 = [
  {
    prop: 'orderNo',
    width: '',
    minWidth: 140,
    label: '订单编号',
  },
  {
    prop: 'orderTime',
    width: '',
    minWidth: 160,
    label: '下单时间',
  },
  {
    prop: 'ordererName',
    width: '',
    minWidth: 88,
    label: '下单人',
  },
  {
    prop: 'phone',
    width: '',
    minWidth: 130,
    label: '手机号',
  },
  {
    prop: 'useIntegral',
    width: '',
    label: '使用积分',
  },
  {
    prop: 'status',
    width: '',
    label: '订单状态',
  },
  {
    prop: 'sendWay',
    width: '',
    label: '配送方式',
  },
];

const tabDetailColumn = [
  {
    prop: 'productCode',
    width: '',
    label: '商品编码',
  },
  {
    prop: 'productName',
    width: '',
    label: '商品名称',
  },
  {
    prop: 'picUrl',
    width: '',
    label: '商品主图',
  },
  {
    prop: 'points',
    width: '',
    label: '积分值',
  },
  {
    prop: 'num',
    width: '',
    label: '兑换数量',
  },
  {
    prop: 'allPoints',
    width: '',
    label: '使用总积分',
  },
];

const tab = {
  column0: column0,
  tabDetailColumn: tabDetailColumn,
};

export default tab;


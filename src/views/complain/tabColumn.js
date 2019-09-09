const list = [
  {
    prop: 'proposalNo',
    width: '',
    minWidth: '120',
    label: '投诉编号',
  },
  {
    prop: 'createTime',
    width: '',
    minWidth: '150',
    label: '投诉时间',
  },
  {
    prop: 'contact',
    width: '',
    minWidth: '112',
    label: '投诉人联系方式',
  },
  {
    prop: 'storeName',
    width: '170',
    minWidth: '',
    label: '所投诉门店',
  },
  {
    prop: 'categoryName',
    width: '',
    minWidth: '',
    label: '投诉类型',
  },
  {
    prop: 'content',
    width: '',
    minWidth: '',
    label: '投诉内容',
  },
  {
    prop: 'isPublic',
    width: '',
    minWidth: '',
    label: '公示情况',
  },
  {
    prop: 'isReply',
    width: '',
    minWidth: '',
    label: '回复情况',
  },
];

const classify = [
  {
    prop: 'name',
    width: '',
    label: '投诉类型',
  },
  {
    prop: 'remark',
    width: '',
    label: '描述',
  },
  {
    prop: 'createTime',
    width: '',
    label: '创建时间',
  },

];

const notice = [
  {
    prop: 'nickName',
    width: '',
    label: '微信昵称',
  },
  {
    prop: 'phone',
    width: '',
    label: '手机号',
  },
  {
    prop: 'openId',
    width: '',
    label: '通知人OpenID',
  },
  {
    prop: 'createTime',
    width: '',
    label: '注册时间',
  },

];


const tab = {
  list: list,
  classify: classify,
  notice: notice,
};

export default tab;


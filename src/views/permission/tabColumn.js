const userTabColumn = [
  {
    prop: 'userName',
    width: '',
    label: '账号',
  },
  {
    prop: 'nickName',
    width: '',
    label: '用户名称',
  },
  {
    prop: 'note',
    width: '',
    label: '用户描述',
  },
  {
    prop: 'roleName',
    width: '',
    label: '绑定角色',
  },
  {
    prop: 'createTime',
    width: '',
    minWidth: 140,
    label: '创建时间',
  },
];

const roleTabColumn = [
  {
    prop: 'roleName',
    width: '',
    label: '角色名称',
  },
  {
    prop: 'description',
    width: '',
    label: '角色描述',
  },
  {
    prop: 'createTime',
    width: '',
    label: '创建时间',
  },
];

const tab = {
  userTabColumn: userTabColumn,
  roleTabColumn: roleTabColumn,
};

export default tab;


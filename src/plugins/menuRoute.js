// eslint-disable-next-line import/no-cycle
import Layout from '@/components/menuLayout/index';

const _import = (file) => () =>
  import('@/views/' + file + '.vue').then((m) => m.default);

export default [
  {
    path: '/data',
    component: Layout,
    noDropdown: true, // 菜单栏是否有二级下拉菜单
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-shujugailan--',
    name: '数据概览',
    children: [
      {
        meta: {
          authorCode: 'view:overview',
        },
        path: 'view',
        component: _import('dataView/index'),
      },
    ],
  },
  {
    path: '/goods',
    component: Layout,
    noDropdown: true, // 菜单栏是否有二级下拉菜单
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-shangpin',
    name: '商品管理',
    children: [
      {
        meta: {
          authorCode: 'goods',
        },
        path: 'index',
        component: _import('goods/index'),
      },
    ],
  },
  {
    path: '/member',
    component: Layout,
    noDropdown: true, // 菜单栏是否有二级下拉菜单
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-huiyuan',
    name: '会员管理',
    children: [
      {
        meta: {
          authorCode: 'member',
        },
        path: 'index',
        component: _import('member/index'),
      },
    ],
  },
  {
    path: '/order',
    component: Layout,
    noDropdown: true, // 菜单栏是否有二级下拉菜单
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-dd',
    name: '订单管理',
    children: [
      {
        meta: {
          authorCode: 'order',
        },
        path: 'index',
        component: _import('orders/index'),
      },
      {
        path: 'detail',
        hidden: true,
        meta: {
          belongPath: '/order/index',
          authorCode: 'order:detail',
        },
        component: _import('orders/orderDetail'),
      },
    ],
  },
  {
    path: '/complain',
    component: Layout,
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-tousu',
    name: '投诉管理',
    children: [
      {
        meta: {
          authorCode: 'complainList',
        },
        path: 'list',
        name: '投诉汇总',
        component: _import('complain/list'),
      },
      {
        meta: {
          authorCode: 'complainClass',
        },
        path: 'classify',
        name: '投诉分类',
        component: _import('complain/classify'),
      },
      {
        meta: {
          authorCode: 'complainSummary',
        },
        path: 'summary',
        name: '投诉概况',
        component: _import('complain/summary'),
      },
      {
        meta: {
          authorCode: 'complainNotice',
        },
        path: 'notice',
        name: '通知人设置',
        component: _import('complain/notice'),
      },
      {
        path: 'detail',
        name: '投诉详情',
        hidden: true,
        meta: {
          authorCode: 'complain:detail',
          belongPath: '/complain/list',
        },
        component: _import('complain/detail'),
      },
    ],
  },
  {
    path: '/invoice',
    component: Layout,
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-fapiao',
    name: '发票管理',
    children: [
      {
        meta: {
          authorCode: 'invoice',
        },
        path: 'info',
        name: '发票信息',
        component: _import('invoice/invoiceInfo'),
        hidden: false,
      },
      {
        meta: {
          authorCode: 'receipt',
        },
        path: 'smallInvoice',
        name: '小票信息',
        component: _import('invoice/smallInvoice'),
      },
      {
        path: 'detail',
        name: '开票详情',
        meta: {
          authorCode: 'invoice',
          belongPath: '/invoice/info',
        },
        hidden: true,
        component: _import('invoice/detail/index'),
      },
    ],
  },
  {
    path: '/contact',
    component: Layout,
    noDropdown: true, // 菜单栏是否有二级下拉菜单
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-lianxifangshi',
    name: '联系信息',
    children: [
      {
        meta: {
          authorCode: 'contact',
        },
        path: 'index',
        component: _import('contact/index'),
      },
    ],
  },
  {
    path: '/permission',
    component: Layout,
    // noDropdown: true, // 菜单栏是否有二级下拉菜单
    hidden: false, // 菜单栏item是否隐藏
    icon: 'icon-quanxian',
    name: '权限管理',
    children: [
      {
        meta: {
          authorCode: 'user',
        },
        path: 'user',
        name: '用户管理',
        component: _import('permission/user'),
      },
      {
        meta: {
          authorCode: 'role',
        },
        path: 'role',
        name: '角色管理',
        component: _import('permission/role'),
      },
      {
        path: 'author',
        name: '授权',
        hidden: true,
        meta: {
          authorCode: 'role:grant',
          belongPath: '/permission/role',
        },
        component: _import('permission/author'),
      },
    ],
  },
];

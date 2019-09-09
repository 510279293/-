/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 07:46:07
 * @modify date 2017-08-03 07:12:20
 * @desc [全局组件文件]
*/

import Vue from 'vue';

import pagination from './Pagination/index';
import Dialog from './Dialog/index';
import upFile from './upFile/index';
import noPermission from './noPermission';
import tableEmpty from './TableEmpty';

const components = [pagination, upFile, Dialog, noPermission, tableEmpty];

components.forEach((component) => {
  Vue.component(component.name, component);
});

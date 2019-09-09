<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="complain-classify"
    >
      <div class="filter-box">
        <p class="filter-item">
          <v-button
            type="primary"
            @click="handleOperate('add',false)"
          >
            添加投诉类型
          </v-button>
        </p>
        <p class="filter-item">
          <v-select
            v-model="paramData.categoryId"
            class="wid225 mar-r12"
            placeholder="请选择投诉类型"
          >
            <v-option
              v-for="item in cateGoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </v-select>
          <v-button
            type="primary"
            icon="v-icon-search"
            class="btn-search"
            size=""
            @click="handleCurrentChange(1)"
          />
        </p>
      </div>
      <div>
        <v-table
          v-loading="loading"
          class="xf-table"
          :data="tableData"
          style="width: 100%"
        >
          <tableEmpty slot="empty" />
          <v-table-column
            type="index"
            width="50"
          />
          <v-table-column
            v-for="(item,idx) in tabColumn"
            :key="idx"
            :prop="item.prop"
            :label="item.label"
          >
            <template slot-scope="scope">
              <div v-if="item.prop === 'createTime'">
                {{ scope.row[item.prop] | dateTime }}
              </div>
              <div v-else>
                {{ scope.row[item.prop] || '-' }}
              </div>
            </template>
          </v-table-column>
          <v-table-column
            label="操作"
            min-width="120"
          >
            <template slot-scope="scope">
              <span
                class="color-blue"
                @click="handleOperate('edit',scope.row)"
              >编辑</span>
              <span
                class="color-blue"
                @click="handleOperate('del',scope.row)"
              >删除</span>
            </template>
          </v-table-column>
        </v-table>
        <pagination
          :current-page.sync="pages.pageNum"
          :page-size="pages.pageSize"
          :total="pages.totalCount"
          @size-change="handleSizeChange"
          @page-change="handleCurrentChange"
        />
      </div>
      <addComplainTypeDia :config="addComplainTypeConfig" />
      <Dialog
        :config="dialogConfig"
        @close="closeDialog"
      />
    </div>
  </div>
</template>
<script>
import tab from './tabColumn';
import addComplainTypeDia from './cpnts/addComplainTypeDia';
import { compCategoryPage, compCategoryList, compCategoryDel } from '@/services/complain';

export default {
  components: {
    addComplainTypeDia,
  },
  data() {
    return {
      loading: false,
      tabColumn: tab.classify,
      tableData: [{}],
      paramData: {
        categoryId: '',
      },
      cateGoryOptions: [{ id: '', name: '全部' }],
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
      addComplainTypeConfig: {
        visible: false,
      },
      dialogConfig: {
        visible: false,
        title: '删除投诉类型',
        content: '删除后，之前回复的投诉类型将向消费者显 示为「其它」。确定删除吗？',
      },
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.compCategoryListApi();
    this.handleSearch();
  },
  methods: {
    async compCategoryListApi(param={}) {
      const res = await compCategoryList(param);
      if (res.success) {
        this.cateGoryOptions = this.cateGoryOptions.concat(...res.value.data);
      }
    },
    async compCategoryPageApi(param={}) {
      this.loading = true;
      const res = await compCategoryPage(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async compCategoryDelApi(param={}) {
      const res = await compCategoryDel(param);
      if (res.success) {
        this.$message.success('删除成功!');
        this.closeDialog();
        this.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    handleOperate(str, row) {
      if (str === 'add') {
        Object.assign(this.addComplainTypeConfig, {
          visible: true,
          row: row,
        });
      }
      if (str === 'edit') {
        Object.assign(this.addComplainTypeConfig, {
          visible: true,
          row: row,
        });
      }
      if (str === 'del') {
        const delParam = { categoryId: row.id };
        Object.assign(this.dialogConfig, {
          visible: true,
          callBack: () => {
            return this.compCategoryDelApi(delParam);
          },
        });
      }
    },
    closeDialog() {
      this.dialogConfig.visible = false;
    },
    handleSearch() {
      this.compCategoryPageApi(Object.assign({}, this.paramData, this.pages));
    },
    handleSizeChange(val) {
      Object.assign(this.pages, {
        pageNum: 1,
        pageSize: val,
      });
      this.handleSearch();
    },
    handleCurrentChange(val) {
      Object.assign(this.pages, {
        pageNum: val,
        pageSize: 20,
      });
      this.handleSearch();
    },
  },
};
</script>

<style lang="less" scoped>
.complain-classify{
  box-sizing: border-box;
  padding:20px;
  .filter-box{
    display: flex;
    justify-content: space-between;
  }
  .mar-r12{
    margin-right: 12px;
  }
  .wid300{
    width:300px;
  }
  .filter-item{
    margin-bottom: 20px;
  }
}
</style>

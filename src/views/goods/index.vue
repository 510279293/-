<template>
  <div>
    <noPermission v-if="false" />
    <div
      v-else
      class="goods-box"
    >
      <div class="clearfix">
        <v-button
          v-if="hasAuthor('goods:add')"
          type="primary"
          class="add-goods"
          @click="showAddGoodsDia('add', false)"
        >
          添加商品
        </v-button>
        <v-button
          type="primary"
          icon="v-icon-search"
          class="btn-search"
          size="small"
          @click="handleCurrentChange(1)"
        />
        <v-input
          v-model="paramData.keyWord"
          placeholder="请输入商品名称/编码"
          class="search-goods"
        />
      </div>
      <v-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <tableEmpty slot="empty" />
        <v-table-column
          prop="productCode"
          label="商品编码"
        />
        <v-table-column
          prop="productName"
          label="商品名称"
        />
        <v-table-column
          label="商品主图"
        >
          <template slot-scope="scope">
            <img
              v-if="scope.row.mainPic"
              :src="scope.row.mainPic"
              width="40"
              height="40"
              class="head_pic"
            >
            <span v-else>-</span>
          </template>
        </v-table-column>
        <v-table-column
          label="商品状态"
        >
          <template slot-scope="scope">
            <i :class="scope.row.status === 0 ? 'goods-light' : 'goods-dark'" />
            <span style="margin-left: 10px">{{ scope.row.status === 0 ? '上架' : '下架' }}</span>
          </template>
        </v-table-column>
        <v-table-column
          prop="consumePoint"
          label="积分值"
        />
        <v-table-column
          prop="stock"
          label="当前库存"
        />
        <v-table-column
          prop="modifyUser"
          label="最后操作人"
          min-width="100"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.modifyUser || '-' }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          prop="modifyTime"
          label="最后操作时间"
          min-width="160"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.modifyTime | dateTime }}
            </div>
          </template>
        </v-table-column>
        <v-table-column
          label="操作"
          min-width="120"
        >
          <template slot-scope="scope">
            <span
              v-if="hasAuthor('goods:edit')"
              class="handle"
              @click="showAddGoodsDia('edit', scope.row.id * 1)"
            >编辑</span>
            <span
              v-if="hasAuthor(`${scope.row.status === 0 ? 'goods:down' : 'goods:up'}`)"
              class="handle"
              @click="goodsSet(scope.row)"
            >{{ scope.row.status === 0 ? '下架' : '上架' }}</span>
            <span
              v-if="hasAuthor('goods:delete')"
              class="handle"
              @click="goodsDel(scope.row)"
            >{{ scope.row.status !== 0 ? '删除' : '' }}</span>
          </template>
        </v-table-column>
      </v-table>
      <div class="block">
        <pagination
          :current-page.sync="pages.pageNum"
          :page-size="pages.pageSize"
          :total="pages.totalCount"
          @size-change="handleSizeChange"
          @page-change="handleCurrentChange"
        />
      </div>
      <addGoods
        :config="goodsConfig"
        @close="closeAddGoodsDia"
      />
      <Dialog
        :config="dialogConfig"
        @sure="dialogSure"
        @close="closeDialog"
      />
    </div>
  </div>
</template>

<script>
import addGoods from './cpnts/addGoods';
import { productList, productDel, productDown, productUp } from '@/services/goods';

export default {
  components: {
    addGoods,
  },
  data() {
    return {
      loading: false,
      isShowAddDia: false,
      goodsConfig: {
        visible: false,
      },
      dialogConfig: {
        visible: false,
      },
      tableData: [],
      paramData: {
        keyWord: '',
      },
      pages: {
        pageNum: 1,
        pageSize: 20,
        totalCount: 20,
      },
    };
  },
  mounted() {
    const goodsId = this.$route.query.goodsId;
    goodsId ? this.showAddGoodsDia('edit', goodsId) : null;
    this.handleSearch();
  },
  methods: {
    hasAuthor(authorCode) {
      return this.$store.getters.curUserAuthorArr.includes(authorCode);
    },
    async getProductList(param) {
      this.loading = true;
      const res = await productList(param);
      if (res.success) {
        this.tableData = res.value.data || [];
        this.pages.totalCount = res.value.pageInfo ? res.value.pageInfo.totalCount : 0;
      }
      this.loading = false;
    },
    async productDelApi(param) {
      const res = await productDel(param);
      if (res.success) {
        this.$message.success('商品删除成功');
        this.handleSearch();
        this.closeDialog();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async productDownApi(param) {
      const res = await productDown(param);
      if (res.success) {
        this.$message.success('商品下架成功');
        this.closeDialog();
        this.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    async productUpApi(param) {
      const res = await productUp(param);
      if (res.success) {
        this.$message.success('商品上架成功');
        this.closeDialog();
        this.handleSearch();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    goodsSet(row) {
      Object.assign(this.dialogConfig, {
        visible: true,
        title: `${row.status === 0 ? '下架' : '上架'}商品`,
        content: `${row.status === 0 ? '下架' : '上架'}商品后，小程序端将
                  ${row.status === 0 ? '不' : ''}展示该商品。确定
                  ${row.status === 0 ? '下架' : '上架'}商品吗？`,
      });
      this.dialogStatus = '';
      this.operateRow = row;
    },
    goodsDel(row) {
      Object.assign(this.dialogConfig, {
        visible: true,
        title: `删除商品`,
        content: `确定删除该商品吗？`,
      });
      this.dialogStatus = 'del';
      this.operateRow = row;
    },
    handleSearch() {
      this.getProductList(Object.assign(this.paramData, this.pages));
    },
    showAddGoodsDia(str, row) {
      const title = str === 'add' ? '添加' : '编辑';
      Object.assign(this.goodsConfig, { visible: true, str, title: `${title}商品`, id: row });
    },
    closeAddGoodsDia() {
      this.goodsConfig.visible = false;
    },
    closeDialog() {
      this.dialogConfig.visible = false;
    },
    dialogSure() {
      let str = '';
      const id = this.operateRow.id;
      this.dialogStatus === 'del' ? str = 'productDelApi' :
      (this.operateRow.status === 0 ? str = 'productDownApi' : str = 'productUpApi');
      this[str]({ id });
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
  .goods-box{
    padding: 20px;
    background: #fff;
    height: 100%;
    .clearfix{
      margin-bottom: 12px;
    }
    .add-goods{
      float: left;
    };
    .search-goods{
      width: 227px;
      float: right;
    }
    .btn-search{
      float: right;
      height: 36px;
      margin-left:10px;
    }
    .goods-light{
      display: inline-block;
      width:6px;
      height:6px;
      background:rgba(47,175,25,1);
      border-radius: 50%;
      vertical-align: 2px;
    }
    .goods-dark{
      display: inline-block;
      width:6px;
      height:6px;
      background:rgba(204,204,204,1);
      border-radius: 50%;
      vertical-align: 2px;
    }
  }
  .handle{
    margin-right: 16px;
    color: #4A90E2;
    font-size: 12px;
    cursor: pointer;
  }
  .table-th{
    background: rgba(247,247,247,1);
    color: #333333;
    font-weight: 600;
  }
  .block{
    margin-top: 12px;
    // float: right;
  }
  .btn-custom-cancel{
      float: right;
      margin-left: 10px;
  }
  </style>

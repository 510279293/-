<template>
  <div>
    <noPermission v-if="false" />
    <div class="contact">
      <div class>
        <div class="com-ban">
          总公司信息配置
        </div>
        <div class="tab-div">
          <v-table
            v-loading="loading1"
            :data="tableData1"
            style="width: 100%"
          >
            <tableEmpty slot="empty" />
            <v-table-column
              prop="name"
              label="公司名称"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.name || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="address"
              label="店铺地址"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.address || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="phone"
              label="总机"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.phone || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="email"
              label="邮箱"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.email || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="name"
              label="操作"
            >
              <template slot-scope="scope">
                <span
                  class="color-blue"
                  @click="showDia('main',scope.row)"
                >编辑</span>
              </template>
            </v-table-column>
          </v-table>
        </div>
      </div>
      <div class="tab2-warp">
        <div class="com-ban">
          分店信息配置
        </div>
        <div class>
          <div class="add-btn">
            <v-button
              type="primary"
              @click="showDia('add',null)"
            >
              添加分店
            </v-button>
          </div>
          <v-table
            v-loading="loading2"
            :data="tableData2"
            style="width: 100%"
          >
            <tableEmpty slot="empty" />
            <v-table-column
              prop="name"
              label="店铺名称"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.name || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="address"
              label="店铺地址"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.address || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="phone"
              label="总机"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.phone || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="email"
              label="邮箱"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.email || '-' }}</div>
              </template>
            </v-table-column>
            <v-table-column
              prop="name"
              label="操作"
            >
              <template slot-scope="scope">
                <span
                  class="color-blue"
                  @click="showDia('other',scope.row)"
                >编辑</span>
                <span
                  class="color-blue"
                  @click="showDelDia(scope.row)"
                >删除</span>
              </template>
            </v-table-column>
          </v-table>
        </div>
      </div>
      <editCompanyInfo :config="editCompanyConfig" />
      <Dialog
        :config="dialogConfig"
        @sure="sureDel"
      />
    </div>
  </div>
</template>
<script>
import editCompanyInfo from './cpnts/editCompanyInfo';
import { contactList, contactGetCompany, contactDel } from '@/services/contact';

export default {
  components: {
    editCompanyInfo,
  },
  data() {
    return {
      tableData1: [],
      tableData2: [],
      loading1: false,
      loading2: false,
      editCompanyConfig: {
        visible: false,
        title: '编辑总公司信息',
        ismain: true,
      },
      dialogConfig: {
        visible: false,
        title: '删除分店信息',
        content: '删除后，小程序端将不展示该店铺的联系 信息，确定删除吗？',
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCompanyInfo();
    this.getContactList();
  },
  methods: {
    async getCompanyInfo(param={}) {
      this.loading1 = true;
      const res = await contactGetCompany(param);
      if (res.success) {
        this.tableData1 = res.value.data;
      }
      this.loading1 = false;
    },
    async getContactList(param={}) {
      this.loading2 = true;
      const res = await contactList(param);
      if (res.success) {
        this.tableData2 = res.value.data;
      }
      this.loading2 = false;
    },
    async delContactList(param) {
      const res = await contactDel(param);
      if (res.success) {
        this.$message.success('删除成功');
        this.dialogConfig.visible = false;
        this.getContactList();
      } else {
        this.$message.error(res.codeDesc);
      }
    },
    showDia(str, row) {
      if (str === 'main') {
        Object.assign(this.editCompanyConfig, {
          visible: true,
          title: '编辑总公司信息',
          ismain: true,
          row: row,
        });
      } else if (str === 'add') {
        Object.assign(this.editCompanyConfig, {
          visible: true,
          title: '添加分店信息',
          ismain: false,
          row: false,
        });
      } else {
        Object.assign(this.editCompanyConfig, {
          visible: true,
          title: '编辑分店信息',
          ismain: false,
          row: row,
        });
      }
    },
    showDelDia(row) {
      this.delRow = row;
      this.dialogConfig.visible = true;
    },
    sureDel() {
      this.delContactList({ contactId: this.delRow.id });
    },
  },
};
</script>

<style lang="less" scoped>
.contact {
  box-sizing: border-box;
  padding: 20px;
  .tab-div {
    margin-top: 20px;
  }
  .tab2-warp {
    margin-top: 38px;
  }
  .add-btn {
    margin: 20px 0px 12px 0px;
  }
}
</style>

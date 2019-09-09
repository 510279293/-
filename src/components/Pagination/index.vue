<template>
  <div
    v-if="total > 0"
    class="pagination-wrap u-clearfix"
  >
    <v-pagination
      class="custom-pagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="prev, pager, next, sizes, total, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>
<style lang="less" scoped>
.pagination-wrap {
  margin-top: 12px;
  .custom-pagination {
    float: right;
  }
}
</style>
<script>
export default {
  name: 'Pagination',
  props: ['pageSize', 'total', 'currentPage'], // eslint-disable-line
  methods: {
    sizeChange(val) {
      this.$emit('update:pageSize', val);
      this.$listeners['size-change'](val);
    },
    pageChange(page) {
      this.$emit('update:currentPage', page);
      this.$listeners['page-change'](page);
    },
  },
};
</script>

<template>
  <div class="pack-table">
    <el-table stripe border :data="tdatas">
      <template v-for="(item,key,index) of theads" v-if="item.show">
        <el-table-column :fixed="item.isFixed" :label="item.label" :prop="key" :key="index"></el-table-column>
      </template>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleEdit(tname,scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            slot="reference"
            @click="handleDelete(tname,scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Vue from "vue";
import Component from "vue-class-component";
import { Tabs, TabPane, Popover } from "element-ui";
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Popover);
@Component({
  props: {
    tname: {
      required: true,
      type: String
    },
    tdatas: {
      required: true,
      type: Array
    },
    theads: {
      required: true,
      type: Object
    }
  }
})
export default class PackTable extends Vue {
  handleEdit(name, index, row) {
    console.log(name, index, row);
  }

  handleDelete(name, index, row) {
    console.log(name);
  }
}
</script>
<style lang="scss" scoped>

</style>
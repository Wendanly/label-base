<template>
  <div class="home">
    <Menu></Menu>
    <div class="content" style="position:relative">
      <router-view></router-view>
      <div>
        个大概大哥大爱的大法师
        <el-button type="primary" @click="jump">跳转</el-button>
        <el-button type="primary" @click="jump1">跳转1</el-button>
        <el-button type="primary" @click="jump2">跳转2</el-button>
        <el-button type="primary" @click="jump3">跳转3</el-button>
        <el-button type="primary" @click="jump4">跳转4</el-button>
        <el-button type="primary" @click="jump5">跳转5</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, ValidateCode, CheckCode } from "@/api/login.js";
import { GetMenuList } from "@/api/login.js";
import Menu from "@/components/Menu";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Menu
  },
  data() {
    return {};
  },
  created() {
    console.log("home的create");
    console.log(this.$router);
  },
  computed: {
    ...mapState(["tenants"])
  },
  methods: {
    jump() {
      this.$router.push({
        path: "/labelApply/labelSummary"
      });
    },

    jump1() {
      this.$router.push({
        path: "/labelApply/labelDevice"
      });
    },
    jump2() {
      this.$router.push({
        path: "/sysManage/analysis"
      });
    },
    jump3() {
      this.$router.push({
        path: "/sysManage/physicalTabManage"
      });
    },
    jump4() {
      this.$router.push({
        path: "/sysManage/PhysicalTableStructure"
      });
    },
    jump5() {
      this.$router.push({
        path: "/sysManage/add"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  .content {
    height: calc(100% - 60px);
    background: rgb(219, 215, 215);
    border: 1px solid red;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>

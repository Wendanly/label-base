<template>
  <div class="home">
    <Menu></Menu>
    <div class="content" style="position:relative">
      <router-view></router-view>
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
    // console.log("home的create");
    // console.log(this.$router);
  },
  computed: {
    ...mapState(["tenants"])
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  .content {
    height: calc(100% - 60px);
    background: #f7f8fa;
    border: 1px solid red;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>

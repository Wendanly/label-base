<template>
  <div class="menu">
    <div class="bg"></div>
    <div class="list">
      <div class="cell-box" v-for="(item,index) in menuList" :key="index">
        <span
          :class="[activeSubMenuItem.parentMenuId == item.ID?'active-menu':'']"
          v-text="item.meta.name"
          class="father-cell"
        ></span>
        <div class="sublist">
          <div
            v-for="(subItem,inde) in item.children"
            :key="inde"
            :class="[activeSubMenuItem.path == subItem.path?'active-sub-menu':'']"
            class="sublist-cell"
            @click="jumpPage(item,subItem)"
          >
            <span v-text="subItem.meta.name"></span>
          </div>
        </div>
      </div>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        管理员
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { Logout } from "@/api/login.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Menu",
  data() {
    return {};
  },
  created() {
    console.log("menucteate");
  },
  computed: {
    ...mapState(["menuList", "activeSubMenuItem"])
  },
  mounted() {
    JSON.stringify(this.activeSubMenuItem) != "{}" ? "" : this.initMenuJump(); //
  },
  methods: {
    ...mapMutations(["setActiveSubMenuItem"]),
    initMenuJump() {
      let subItem = this.menuList[0].children[0];
      this.$router
        .push({
          path: subItem.path
        })
        .then(res => this.changeActionMenu(res, subItem));
    },
    jumpPage(item, subItem) {
      this.$router
        .push({
          path: subItem.path
        })
        .then(res => this.changeActionMenu(res, subItem));
    },
    changeActionMenu(res, subItem) {
      //若路由跳转错误（如：路径找不到）则返回的不是对象
      if (Object.prototype.toString.call(res) == "[object Object]")
        this.setActiveSubMenuItem(subItem);
    },
    loginOut() {
      Logout()
        .then(res => {
          if (res.success) {
            sessionStorage.clear();
            localStorage.clear();
            this.$router.replace({
              path: "/"
            });
          } else {
            this.$message.warning(res.message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$height: 60px; //一级菜单高度
$height2: 48px; //二级菜单高度
.menu {
  width: 100%;
  height: $height;
  background: #333945;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bg {
    height: 38px;
    width: 200px;
    margin-right: 100px;
    background-image: url("../assets/projectlogo.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: 20px;
  }
  .list {
    display: flex;
    height: 100%;

    // border: 2px solid yellow;
    box-sizing: border-box;
    .cell-box {
      width: 150px;
      color: #8a929c;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      .father-cell {
        line-height: $height;
        height: $height;
        &:hover {
          color: #ffffff;
          + .sublist {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }
      }

      .sublist {
        width: 100%;
        line-height: $height2;
        height: $height2;
        background: #ffffff;
        box-shadow: 0px 0px 6px #888888;
        position: fixed;
        display: none;

        top: 59px;
        left: 0px;
        z-index: 100;
        .sublist-cell {
          border-bottom: 2px solid transparent;
          color: #333;
        }
        &:hover {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .sublist-cell:hover {
            cursor: pointer;
            color: #2196e7;
            border-bottom: 2px solid #2196e7;
          }
        }
      }

      //刷新或回退页面使当前菜单还能保持高亮的样式
      .active-menu {
        color: #ffffff;
      }
      .active-sub-menu {
        cursor: pointer !important ;
        color: #2196e7 !important ;
        border-bottom: 2px solid #2196e7 !important ;
      }
    }
  }
  /deep/ .el-dropdown {
    margin-right: 20px;
    /deep/ .el-dropdown-link {
      color: #ffffff;
    }
  }
}
</style>

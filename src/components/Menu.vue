<template>
  <div class="menu">
    <div class="bg"></div>
    <div class="list">
      <div class="cell-box" v-for="(item,index) in menuList" :key="index">
        <span
          v-text="item.meta.name"
          @click="jumpPage($event,item)"
          @mouseenter="openDown(index)"
          @mouseleave="closeDown"
        ></span>
        <div class="dropdown-box" @mouseenter="openSubDown" @mouseleave="closeSubDown">
          <div
            class="item"
            v-for="(subItem,inde) in item.children"
            :key="inde"
            v-text="subItem.meta.name"
            @click="jumpPage($event,subItem)"
          ></div>
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
import { mapState } from "vuex";
export default {
  name: "Menu",
  data() {
    return {};
  },
  created() {
    console.log("menucteate");
  },
  computed: {
    ...mapState(["menuList"])
  },
  mounted() {
    let fatherDom = document.createElement("div");
    fatherDom.setAttribute("class", "sub-menu-wrap");
    document.body.appendChild(fatherDom);
    let dom = document.querySelectorAll(".dropdown-box");
    for (let i = 0, len = dom.length; i < len; i++) {
      // dom[i].setAttribute("data-no", i);
      fatherDom.appendChild(dom[i]);
    }
  },
  methods: {
    jumpPage(item) {
      console.log(item);
    },
    openDown(index) {
      let fatherDom = document.querySelectorAll(".sub-menu-wrap")[0];
      fatherDom.style.display = "block";
      let dom = document.querySelectorAll(".dropdown-box");
      for (let i = 0, len = dom.length; i < len; i++) {
        dom[i].style.display = "none";
      }
      dom[index].style.display = "flex";
    },
    closeDown() {
      let fatherDom = document.querySelectorAll(".sub-menu-wrap")[0];
      // fatherDom.style.display = "none";
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
    },
    openSubDown() {
      let fatherDom = document.querySelectorAll(".sub-menu-wrap")[0];
      fatherDom.style.display = "block";
    },
    closeSubDown() {
      let fatherDom = document.querySelectorAll(".sub-menu-wrap")[0];
      // fatherDom.style.display = "none";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$height: 60px; //一级菜单高度
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
    .cell-box {
      width: 150px;
      color: #8a929c;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        line-height: $height;
        height: $height;
        cursor: pointer;
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
<style lang="scss" >
$height: 48px; //二级菜单高度
.sub-menu-wrap {
  width: 100%;
  height: $height;
  display: none;
  box-sizing: border-box;

  position: absolute;
  background: #ffffff;
  top: 59px;
  width: 100%;
}
.dropdown-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item {
    line-height: $height;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    &:hover {
      color: #66b1ff;
      border-bottom: 2px solid #66b1ff;
    }
  }
}
</style>

<template>
  <div class="navigation">
    <div class="top-box">
      <div class="bg"></div>
      <div class="list">
        <div class="cell-box" v-for="(item,index) in list" :key="index" v-text="item.name"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      list: [
        {
          name: "首页"
        },
        {
          name: "我的集群"
        },
        {
          name: "我的应用"
        },
        {
          name: "标签管理"
        },
        {
          name: "数据资产"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navigation {
  width: 100%;
  height: 70px;
  .top-box {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .bg {
      height: 38px;
      width: 200px;
      margin-right: 100px;
      background-image: url("../assets/projectlogo.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
    .list {
      display: flex;
      align-items: center;
      height: 100%;
      .cell-box {
        width: 150px;
      }
    }
  }
}
</style>

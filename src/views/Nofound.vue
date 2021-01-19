<template>
  <div class="notfound">
    <div class="found-wrap">
      <div class="iconfont icon-notfound">
        <div class="text">
          <span class="text-404">404</span>
          <span>您访问的页面的没有找到！</span>
        </div>
      </div>
      <div class="btn">
        <el-button class="btn-text" @click="jump(0)" style="margin-right:20px;" plain>返回首页</el-button>
        <el-button plain @click="jump(1)">
          返回上一页
          <span>({{time}})</span>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: 3
    };
  },
  methods: {
    jump(flag) {
      console.log(flag);
    }
  }
};
</script>
<style lang="scss" scoped>
.notfound {
  background: #f7f8fa;
  .found-wrap {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    .icon-notfound {
      font-size: 270px;
      margin-left: 10%;
      .text {
        font-size: 16px;
        .text-404 {
          font-size: 50px;
          color: #64c7e4;
          vertical-align: middle;
        }
      }
    }
    .btn {
      position: absolute;
      bottom: 40px;
      right: 0px;
      .btn-text {
      }
    }
  }
}
</style>
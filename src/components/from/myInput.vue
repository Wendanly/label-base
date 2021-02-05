<template>
  <div class="my-input">
    <el-input size="mini" v-model="model" placeholder="placeholder"></el-input>
  </div>
</template>

<script>
export default {
  name: "myInput",
  props: {
    model: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

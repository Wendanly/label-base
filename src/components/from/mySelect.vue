<template>
  <div class="my-select">
    <el-select size="mini" v-model="model" placeholder="placeholder">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "mySelect",
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
    return {
      options: [
        {
          lebel: "第一项",
          value: "1"
        },
        {
          lebel: "第二项",
          value: "2"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

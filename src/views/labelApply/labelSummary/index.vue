<template>
  <div class="labelSummary">
    <div class="wrap">
      <div class="choosearea">
        <draggable v-model="arr1" animation="300" :options="options" @start="onStart" @end="onEnd">
          <transition-group>
            <div class="item" v-for="item in arr1" :key="item.id">{{item.type}}</div>
          </transition-group>
        </draggable>
      </div>
      <div class="form">
        <draggable
          class="form-box"
          v-model="arr2"
          group="site"
          animation="100"
          @start="onStart"
          @end="onEnd"
        >
          <transition-group class="form-box-group">
            <div class="item" v-for="item in arr2" :key="item.id" style="width:50%">
              <div v-if="item.type == 'input'">
                <myInput></myInput>
              </div>
              <div v-if="item.type == 'select'">
                <mySelect></mySelect>
              </div>
              <div v-if="item.type == 'label'">
                <div class="label" contenteditable ref="label">label</div>
              </div>
            </div>
            <el-row :gutter="10">
              <el-col :span="6"></el-col>
            </el-row>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import myInput from "@/components/from/myInput";
import mySelect from "@/components/from/mySelect";
export default {
  name: "labelSummary",
  components: {
    draggable,
    myInput,
    mySelect
  },
  data() {
    return {
      userName: "",
      drag: false,
      options: { group: { name: "site", pull: "clone" } },
      arr1: [
        {
          id: 1,
          type: "input",
          model: ""
        },
        {
          id: 2,
          type: "select"
        },
        {
          id: 3,
          type: "radio"
        },
        {
          id: 4,
          type: "checkbox"
        },
        {
          id: 5,
          type: "label"
        }
      ],
      arr2: [
        // {
        //   id: 5,
        //   name: "www.google.com"
        // },
        // {
        //   id: 6,
        //   name: "www.msn.com"
        // },
        // {
        //   id: 7,
        //   name: "www.ebay.com"
        // },
        // {
        //   id: 8,
        //   name: "www.yahoo.com"
        // }
      ]
    };
  },
  watch: {
    arr2: {
      handler(val) {
        console.log(JSON.parse(JSON.stringify(val)));
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    console.log(6556);
  },
  methods: {
    onStart() {
      // this.drag = true;
    },
    onEnd(e) {
      // console.log(e);
      // this.drag = false;
    },
    //光标聚焦
    setCursor(el) {
      //el为光标需要定位的元素内
      var range = document.createRange();
      //返回用户当前的选区
      var sel = window.getSelection();
      range.setStart(el, 0);
      //使得选区(光标)开始与结束位置重叠
      range.collapse(true);
      //移除现有其他的选区
      sel.removeAllRanges();
      //加入光标的选区
      sel.addRange(range);
    }
  }
};
</script>

<style lang="scss" scoped>
.labelSummary {
  width: 100%;
  height: 100%;
  .wrap {
    width: 80%;
    height: 80%;
    display: flex;
    box-sizing: border-box;
    .choosearea {
      border: 1px solid #d4cfcf;
      height: 100%;
      width: 300px;
      padding: 10px;
      margin-right: 20px;
      border-radius: 5px;
    }
    .form {
      flex: 1;
      height: 100%;
      border: 1px solid #d4cfcf;
      padding: 10px;
      border-radius: 5px;
      .form-box-group {
        display: flex;
        width: 600px;
        .item {
          margin-left: 5px;
          margin-right: 5px;
        }
        .label {
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>

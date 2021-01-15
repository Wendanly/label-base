<template>
  <div class="physicalTableStructure">
    <el-button size="mini" style="position:absolute;top:0px" type="primary" @click="back">返回</el-button>
    <div class="box1">
      <el-divider content-position="left">物理表基本信息</el-divider>
      <el-form v-loading="tabLoading" label-position="center" label-width="150px" :model="formData">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="物理表名称">
              <el-input size="mini" v-model="formData.phyTabName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="表中文名称">
              <el-input size="mini" v-model="formData.tabChsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="表类型">
              <el-select v-model="formData.tabType" size="mini" placeholder>
                <el-option
                  v-for="item in tabTypeList"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="数据周期">
              <el-select v-model="formData.dataCycle" size="mini" placeholder>
                <el-option
                  v-for="item in dataCycleList"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存储周期">
              <el-select v-model="formData.storeCycle" size="mini" placeholder>
                <el-option
                  v-for="item in storeList"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="后缀规则">
              <el-select v-model="formData.suffixRule" size="mini" placeholder>
                <el-option
                  v-for="item in suffixList"
                  :key="item.dictCode"
                  :label="item.dictName"
                  :value="item.dictCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="作用描述">
          <el-input size="mini" v-model="formData.busInfo"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="box2">
      <el-divider content-position="left">物理表结构信息</el-divider>
      <div class="content">
        <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
          <el-table
            v-loading="tabLoading"
            :data="ruleForm.tableData"
            :height="300"
            style="width: 100%"
            ref="table"
          >
            <el-table-column>
              <template slot="header">
                <span>字段物理名称</span>
                <span class="star">*</span>
              </template>
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.' + scope.$index + '.colId'" :rules="rules.colId">
                  <el-input size="mini" v-model="scope.row.colId" placeholder />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="字段中文名称">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.colName" placeholder></el-input>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <span>数据类型</span>
                <span class="star">*</span>
              </template>
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.' + scope.$index + '.dataType'"
                  :rules="rules.dataType"
                >
                  <el-select
                    size="mini"
                    @change="dataTypeChange(scope.row)"
                    v-model="scope.row.dataType"
                    placeholder
                  >
                    <el-option
                      v-for="item in dataTypeList"
                      :key="item.dictCode"
                      :label="item.dictName"
                      :value="item.dictCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <span>字段类型</span>
                <span class="star">*</span>
              </template>
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.' + scope.$index + '.colType'"
                  :rules="rules.colType"
                >
                  <el-input size="mini" v-model="scope.row.colType" placeholder />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <span>可否为空</span>
                <span class="star">*</span>
              </template>
              <template slot-scope="scope">
                <el-form-item :prop="'tableData.' + scope.$index + '.isNull'" :rules="rules.isNull">
                  <el-select size="mini" v-model="scope.row.isNull" placeholder>
                    <el-option
                      v-for="item in isNullList"
                      :key="item.dictCode"
                      :label="item.dictName"
                      :value="item.dictCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="单位">
              <template slot-scope="scope">
                <el-select size="mini" clearable v-model="scope.row.unit" placeholder>
                  <el-option
                    v-for="item in unitList"
                    :key="item.dictCode"
                    :label="item.dictName"
                    :value="item.dictCode"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="维层">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.' + scope.$index + '.dim_level_name'"
                  :rules="rulesFun(scope)"
                >
                  <el-input
                    :disabled="scope.row.dataType != 4"
                    size="mini"
                    v-model="scope.row.dim_level_name"
                    @focus="checkDim(scope)"
                    placeholder
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="函数">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'tableData.' + scope.$index + '.partitionFunction'"
                  :rules="hanFun(scope)"
                >
                  <el-select
                    :disabled="scope.row.dataType != 3"
                    @change="funChange(scope.row)"
                    size="mini"
                    v-model="scope.row.partitionFunction"
                    placeholder
                  >
                    <el-option
                      v-for="item in funList"
                      :key="item.dictCode"
                      :label="item.dictName"
                      :value="item.dictCode"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- 
                <el-select clearable size="mini" v-model="scope.row.partitionFunction" placeholder>
                  <el-option
                    v-for="item in funList"
                    :key="item.dictCode"
                    :label="item.dictName"
                    :value="item.dictCode"
                  ></el-option>
                </el-select>-->
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  class="table-btn"
                  type="text"
                  v-show="ruleForm.tableData.length >1"
                  @click="del(scope)"
                >删除</el-button>
                <el-button
                  class="table-btn"
                  v-show="ruleForm.tableData.length -1 == scope.$index"
                  @click="add(scope.row)"
                  type="text"
                >增加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="选择维层"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="500"
      :before-close="handleClose"
    >
      <div class="phdim-box">
        <div class="search">
          <label class="label" for>关键字</label>
          <el-input size="mini" class="dim-input" v-model="dimSearch" placeholder></el-input>
          <el-button size="mini" type="primary" @click="searchDim">查询</el-button>
        </div>
        <el-table
          border
          :row-style="iRowStyle"
          :cell-style="iCellStyle"
          :header-row-style="iHeaderRowStyle"
          :header-cell-style="iHeaderCellStyle"
          v-loading="dimLoading"
          :data="dimList"
          :height="300"
          style="width: 100%"
        >
          <el-table-column prop="dimLevelId" label="维层编码"></el-table-column>
          <el-table-column prop="dimLevelName" label="维层名称"></el-table-column>
          <el-table-column prop="dimLevelType" label="维层描述"></el-table-column>
          <el-table-column prop label="操作">
            <template slot-scope="scope">
              <el-button @click="getDim(scope.row)" type="text">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>-->
    </el-dialog>
    <div class="foot">
      <el-button size="mini" @click="back">取消</el-button>
      <el-button size="mini" :loading="loading" @click="save" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import { GetDicCodeById } from "@/api/commonApi.js";
import {
  GetEditTab,
  EditStStruct,
  AddTab,
  GetDimLevel
} from "@/api/physical.js";
export default {
  name: "PhysicalTableStructure",
  data() {
    return {
      dimSearch: "", //搜索维层关键字
      loading: false,
      tabLoading: false,
      dimLoading: false,
      dialogVisible: false,
      options: [],
      formData: {
        phyTabName: "",
        tabChsName: "",
        tabType: "",
        dataCycle: "",
        storeCycle: "",
        suffixRule: "",
        busInfo: ""
      },
      // 校验
      rules: {
        colId: [
          {
            required: true,
            message: "不能为空！",
            trigger: ["blur", "change"]
          }
        ],
        dataType: [
          {
            required: true,
            message: "不能为空！",
            trigger: ["change"]
          }
        ],
        colType: [
          {
            required: true,
            message: "不能为空！",
            trigger: ["blur", "change"]
          }
        ],
        isNull: [
          {
            required: true,
            message: "不能为空！",
            trigger: ["change"]
          }
        ],
        dim_level_name: [
          {
            required: true,
            message: "不能为空！",
            trigger: ["change", "blur"]
          }
        ],
        partitionFunction: [
          {
            required: true,
            message: "不能为空！",
            trigger: ["change"]
          }
        ]
      },
      dimList: [], //维层list
      ruleForm: {
        tableData: []
      },
      tabTypeList: [], //表类型
      dataCycleList: [], //数据周期
      dataTypeList: [], //数据类型
      unitList: [], //单位
      funList: [], //分区函数
      storeList: [], //存储周期
      suffixList: [], //后缀规则
      isNullList: [] //后缀规则
    };
  },
  watch: {
    "ruleForm.tableData": {
      handler(val) {
        // console.log(val);
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.queryDic();
  },
  methods: {
    //数据类型变动
    dataTypeChange(row) {
      console.log(row);
      this.$set(row, "dim_level_name", "");
      this.$set(row, "dim__level_type", "");
      this.$set(row, "partitionFunction", ""); //函数
      // row.dim_level_name = "";
      // row.dim__level_type = "";
    },
    queryDic() {
      // 1:周期类型，2:表类型，5:后缀规则，3:存储周期类型，6:数据类型，7:单位，4:分区函数,9是否为空

      GetDicCodeById({
        typeIds: "1,2,5,3,6,7,4,9"
      })
        .then(res => {
          this.dataCycleList = res["1"];
          this.tabTypeList = res["2"];
          this.storeList = res["3"];
          this.funList = res["4"];
          this.suffixList = res["5"];
          this.dataTypeList = res["6"];
          this.unitList = res["7"];
          this.isNullList = res["9"];
          sessionStorage.setItem(
            "dataCycleList",
            JSON.stringify(this.dataCycleList)
          );
          sessionStorage.setItem(
            "tabTypeList",
            JSON.stringify(this.tabTypeList)
          );
          sessionStorage.setItem("storeList", JSON.stringify(this.storeList));
          sessionStorage.setItem("funList", JSON.stringify(this.funList));
          sessionStorage.setItem("suffixList", JSON.stringify(this.suffixList));
          sessionStorage.setItem(
            "dataTypeList",
            JSON.stringify(this.dataTypeList)
          );
          sessionStorage.setItem("unitList", JSON.stringify(this.unitList));
          sessionStorage.setItem("isNullList", JSON.stringify(this.isNullList));
          if (this.$route.query && JSON.stringify(this.$route.query) != "{}") {
            this.getEditData();
          } else {
            this.pushDataToTable();
          }
        })

        .catch(err => {
          this.$message.error("服务异常！");
        });
    },
    rulesFun(scope) {
      return scope.row.dataType == 4 ? this.rules.dim_level_name : [];
    },
    hanFun(scope) {
      return scope.row.dataType == 3 ? this.rules.partitionFunction : [];
    },
    funChange() {
      this.$refs["ruleForm"].validate(); //部分表单校验没成功，所有用全部校验了
    },
    //选择维层，单选
    getDim(row) {
      //把tmpObj 变成响应式
      let tmpObj = {
        dim__level_type: null,
        dim_level_name: null
      };
      this.$set(tmpObj, "dim__level_type", row.dimLevelType);
      this.$set(tmpObj, "dim_level_name", row.dimLevelName);
      this.$set(
        this.ruleForm.tableData[this.dimIndex],
        "dim__level_type",
        tmpObj.dim__level_type
      );
      this.$set(
        this.ruleForm.tableData[this.dimIndex],
        "dim_level_name",
        tmpObj.dim_level_name
      );

      console.log(JSON.parse(JSON.stringify(this.ruleForm.tableData)));
      this.$refs["ruleForm"].validate(); //部分表单校验没成功，所有用全部校验了
      this.handleClose();
      this.dimSearch = "";
      this.dimList = [];
    },
    //维度查询
    searchDim() {
      this.dimLoading = true;
      GetDimLevel({
        dimLevelName: this.dimSearch
      })
        .then(res => {
          this.dimLoading = false;
          this.dimList = res;
        })
        .catch(err => {
          this.dimLoading = false;
          // this.$message.error(err);
        });
    },
    //表格模型
    pushDataToTable() {
      this.ruleForm.tableData.push({
        colId: "", //  物理名称
        colName: "", //中文名称
        colType: "", //
        dataType: this.dataTypeList[0].dictCode, //必填
        isNull: this.isNullList[0].dictCode, //必填
        unit: "", //单位
        dim__level_type: "", //维度
        partitionFunction: "" //函数
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    checkDim(scope) {
      this.dimIndex = scope.$index;
      console.log(this.dimIndex);
      this.searchDim();
      this.dialogVisible = true;
    },
    getEditData() {
      this.tabLoading = true;
      GetEditTab({
        tabId: this.$route.query.tabId
      })
        .then(res => {
          this.tabLoading = false;
          //赋值
          //基本信息
          // this.formData = res.stTab;
          this.formData.phyTabName = res.stTab.phyTabName;
          this.formData.tabChsName = res.stTab.tabChsName;
          this.formData.tabType = res.stTab.tabType;
          this.formData.dataCycle = res.stTab.dataCycle;
          this.formData.storeCycle = res.stTab.storeCycle;
          this.formData.suffixRule = res.stTab.suffixRule;
          this.formData.busInfo = res.stTab.busInfo;
          //物理表结构信息
          this.ruleForm.tableData = res.stTabStructList;
        })
        .catch(err => {
          this.tabLoading = false;
          // this.$message.error(err);
        });
    },
    back() {
      this.$router.go(-1);
    },
    add(row) {
      console.log(row);
      let _this = this;

      // this.$refs.form && this.$refs.form.resetFields();

      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let flag = this.checkPhyName();
          if (flag) {
            this.$message.warning("字段物理名称不可重复！");
            return;
          }
          this.pushDataToTable();
        } else {
          this.$message.warning("请输入必填项！");
          return false;
        }
      });
    },
    checkPhyName() {
      //字段物理名称重复时提示
      let colIdArr = this.ruleForm.tableData.map(o => String(o.colId).trim());
      if (new Set(colIdArr).size != colIdArr.length) {
        return true;
      } else {
        return false;
      }
    },
    del(scope) {
      this.ruleForm.tableData.splice(scope.$index, 1);
    },
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let flag = this.checkPhyName();
          if (flag) {
            this.$message.warning("字段物理名称不可重复！");
            return;
          }
          let obj = {};
          if (this.$route.query && JSON.stringify(this.$route.query) != "{}") {
            obj = {
              tabId: this.$route.query.tabId
            };
            console.log(JSON.parse(JSON.stringify(this.formData)));
            console.log(JSON.parse(JSON.stringify(this.ruleForm.tableData)));
            this.loading = true;
            EditStStruct({
              stTab: Object.assign(obj, this.formData),
              stTabStructList: this.ruleForm.tableData
            })
              .then(res => {
                this.loading = false;
                if (res.success) {
                  this.$message.success("编辑成功。");
                } else {
                  this.$message.success(res.msg);
                }
              })
              .catch(err => {
                this.loading = false;
                // this.$message.error(err);
              });
          } else {
            this.loading = true;
            AddTab({
              stTab: this.formData,
              stTabStructList: this.ruleForm.tableData
            })
              .then(res => {
                this.loading = false;
                if (res.success) {
                  this.$message.success("新增成功。");
                  setTimeout(() => {
                    this.back();
                  }, 100);
                } else {
                  this.$message.success(res.msg);
                }
              })
              .catch(err => {
                this.loading = false;
                // this.$message.error(err);
              });
          }
        } else {
          this.$message.warning("请输入必填项！");
          return false;
        }
      });
    },
    iRowStyle: function({ row, rowIndex }) {
      return "height:35px";
    },
    iHeaderRowStyle: function({ row, rowIndex }) {
      return "height:35px";
    },
    iCellStyle: function({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    iHeaderCellStyle: function({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    }
  }
};
</script>
<style lang="scss" scoped>
$btn: #2196e7;
.physicalTableStructure {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .box1 {
    /deep/ .el-select {
      width: 100%;
    }

    /deep/ .el-form-item {
      margin-bottom: 15px;
    }
  }
  /deep/ .el-divider__text.is-left {
    font-size: 18px;
    font-weight: bold;
  }
  .box2 {
    /deep/ .el-form-item {
      margin-bottom: 0px;
    }
    .table-btn {
      color: $btn;
    }
    .star {
      color: red;
    }
  }
  .foot {
    position: absolute;
    bottom: 10px;
    width: 97%;
    text-align: center;
  }
}

.phdim-box {
  width: 100%;
  height: 100%;
  .search {
    margin-bottom: 20px;
    .label {
      font-weight: bold;
      margin-right: 10px;
    }
    .dim-input {
      width: 200px;
      margin-right: 30px;
    }
  }
}
</style>
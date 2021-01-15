<template>
  <div class="physical">
    <div class="serarchCondition">
      <el-select
        clearable
        size="mini"
        class="inline"
        v-model="searchCondition.dataCycle"
        placeholder="数据周期"
      >
        <el-option
          v-for="item in dataCycleList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
        ></el-option>
      </el-select>
      <el-select
        clearable
        size="mini"
        class="inline"
        v-model="searchCondition.tabType"
        placeholder="表类型"
      >
        <el-option
          v-for="item in tabTypeList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
        ></el-option>
      </el-select>
      <el-select
        clearable
        size="mini"
        class="inline"
        v-model="searchCondition.state"
        placeholder="表状态"
      >
        <el-option
          v-for="item in stateList"
          :key="item.dictCode"
          :label="item.dictName"
          :value="item.dictCode"
        ></el-option>
      </el-select>

      <!-- <el-date-picker
        size="mini"
        class="inline"
        v-model="searchCondition.upDate"
        type="datetime"
        placeholder="选择上线日期"
      ></el-date-picker>
      <div class="inline hengxian">--</div>
      <el-date-picker
        size="mini"
        class="inline"
        v-model="searchCondition.downDate"
        type="datetime"
        placeholder="选择下线日期"
      ></el-date-picker>-->
      <el-input
        clearable
        size="mini"
        class="inline search"
        v-model="searchCondition.tabChsName"
        suffix-icon="el-icon-search"
        placeholder="字典名称"
      ></el-input>
      <el-button @click="getData" type="primary" size="small">查询</el-button>
      <el-button @click="reset" size="small">重置</el-button>
      <el-button @click="add" type="primary" icon="el-icon-plus" size="small" class="float-right">新增</el-button>
    </div>
    <div class="content">
      <el-table :loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="tabId" label="表编码"></el-table-column>
        <el-table-column prop="tabChsName" label="表中文名称"></el-table-column>
        <el-table-column prop="phyTabName" width="200" label="表物理名称(自动获取)"></el-table-column>
        <el-table-column prop="dataCyleName" label="数据周期"></el-table-column>
        <el-table-column prop="tabTypeName" label="表类型"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="storeCycleName" label="存储周期"></el-table-column>
        <el-table-column prop="userName" label="操作员"></el-table-column>
        <el-table-column label="表状态">
          <template slot-scope="scope">
            <!-- <span class="table-status" v-text="scope.row.stateName"></span> -->
            <span v-text="scope.row.stateName"></span>
          </template>
        </el-table-column>

        <el-table-column prop="uplineTime" label="上线时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="table-btn" @click="goPage(scope.row)" type="text">表结构</el-button>
            <el-button class="table-btn" @click="del(scope.row.tabId)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchCondition.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchCondition.pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="searchCondition.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { GetDicCodeById } from "@/api/commonApi.js";
import { GetTabList, Deletetab } from "@/api/physical.js";
export default {
  name: "Physical",
  data() {
    return {
      dataCycleList: [], //周期
      stateList: [], //表状态
      tabTypeList: [], //表类型
      tableData: [], //表格数据
      searchCondition: {
        dataCycle: "",
        tabType: "",
        state: "",
        tabChsName: "",
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      loading: false
    };
  },
  created() {
    GetDicCodeById({
      typeIds: "1,2,8"
    })
      .then(res => {
        console.log(res);
        this.dataCycleList = res["1"];
        this.tabTypeList = res["2"];
        this.stateList = res["8"];
      })
      .catch(err => {
        this.$message.error("服务异常！");
      });
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      GetTabList(this.searchCondition)
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.tableData = res.stTabList;
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("服务异常！");
        });
    },

    reset() {
      this.searchCondition.dataCycle = "";
      this.searchCondition.tabType = "";
      this.searchCondition.state = "";
      this.searchCondition.tabChsName = "";
    },
    handleSizeChange(val) {
      this.searchCondition.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchCondition.currentPage = val;
      this.getData();
    },
    del(tabId) {
      this.$confirm("确定删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          Deletetab({
            tabId: tabId
          })
            .then(res => {
              // this.loading = false;
              if (res.success) {
                this.getData();
                this.$message.success("删除成功。");
              }
            })
            .catch(err => {
              // this.loading = false;
              this.$message.error("服务异常！");
            });
        })
        .catch(action => {});
    },
    add() {
      this.$router.push({
        path: "/PhysicalTableStructure"
      });
    },
    goPage(row) {
      this.$router.push({
        path: "/PhysicalTableStructure",
        query: {
          tabId: row.tabId
        }
      });
    }
  }
};
</script>
<style lang="scss" type="text/scss" scoped>
// @import "~@/styles/element-variables.scss";
$status: #33d653;
$btn: #2196e7;
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.physical {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .serarchCondition {
    .inline {
      display: inline-block;
      margin-right: 10px;
      width: 140px;
    }
    .search {
      width: 214px;
    }
    .hengxian {
      width: 12px;
      height: 28px;
      line-height: 28px;
      color: #dcd6d6;
    }
    .float-right {
      float: right;
    }
  }
  .content {
    margin-top: 20px;
    .table-status {
      color: $status;
    }
    .table-btn {
      color: $btn;
    }
  }
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
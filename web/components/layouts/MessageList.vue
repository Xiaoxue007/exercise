<template>
  <div id="cell">
    <CellGroup @on-click="ClickCell">
      <Cell :name="0" :selected="true">
        <div style="display: flex; align-items: center">
          <Badge dot style="margin-right: 15px">
            <Avatar
              shape="square"
              src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
              size="large"
            />
          </Badge>
          <div>
            <h4>哈哈哈哈哈哈哈哈哈哈哈哈</h4>
            <span
              style="
                width: 170px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或</span
            >
          </div>
        </div>
        <Button
          slot="extra"
          shape="circle"
          icon="md-close"
          size="small"
          @click="remove"
        ></Button>
      </Cell>
    </CellGroup>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  methods: {
    ClickCell(name) {
      // console.log(name)
      this.cellSelected = name
    },
    remove(param) {
      console.log(param)
    },
  },
}
</script>

<style>
#cell .ivu-cell-group {
  margin-top: 15px;
}
#cell .ivu-cell {
  padding: 7px 0px;
}
#cell .ivu-cell-footer {
  right: 10px;
  display: none;
}
#cell .ivu-cell:hover .ivu-cell-footer {
  display: block;
}
</style>

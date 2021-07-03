/*
 * @Author: yaolunmao
 * 简单状态管理
 */

import {reactive } from 'vue';
export const store = {
  state: reactive({
    //选中工具栏
    CurrentlySelectedToolBar : {
      Type: '',//选中的工具栏svg类型
      TypeName: '',//选中的工具栏svg类型名称
      Title: '',//选中的工具栏svg标题
      Color: '',//选中的工具栏svg颜色
      CreateType: ''//选中工具栏的创建方式
    }
  }),

  setCurrentlySelectedToolBarAction(newValue) {
    this.state.CurrentlySelectedToolBar = newValue
  },

  clearCurrentlySelectedToolBarAction() {
    this.state.CurrentlySelectedToolBar = {
      Type: '',//选中的工具栏svg类型
      TypeName: '',//选中的工具栏svg类型名称
      Title: '',//选中的工具栏svg标题
      Color: '',//选中的工具栏svg颜色
      CreateType: ''//选中工具栏的创建方式
    }
  }
}

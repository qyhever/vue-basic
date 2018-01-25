/**
 * 非父子组件之间的通信。使用一个空的 Vue 实例作为事件总线
 */
import Vue from 'vue';

let bus = new Vue();

export { bus };
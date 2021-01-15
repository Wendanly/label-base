import request from '@/api/request.js'

export const GetTabList = function (data) {
  return request('POST', 'tab/getTabList', data);

}
export const GetEditTab = function (data) {
  return request('POST', 'tab/getEditTab', data);

}
export const EditStStruct = function (data) {
  return request('POST', 'tab/editStStruct', data);

}
export const GetDimLevel = function (data) {
  return request('POST', 'dict/getDimLevel', data);

}
export const Deletetab = function (data) {
  return request('POST', 'tab/deletetab', data);

}
export const AddTab = function (data) {
  return request('POST', 'tab/addTab', data);

}
import request from '@/api/request.js'

export const GetDicCodeById = function (data) {
  return request('POST', 'dict/getDicCodeById', data);

}
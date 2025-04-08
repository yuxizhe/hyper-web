import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/admin/login',
    method: 'post',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {
          tokenHead: 'Bearer ',
          token:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODkyMjY5MzczNDYsImV4cCI6MTY4OTgzMTczN30.b5D3MhMRhKZDC9iXYxrW29IXdDUch6hSx9G2h9c5iJsayvAE1bm0DJZe4dp32y95yOy98UJrYesN52-cFgpI9Q'
        }
      }
      return resObj
    }
  },
  {
    url: '/api/v1/admin/info',
    method: 'get',
    response: ({ body }: any) => {
      const resObj: Global.ResultType = {
        code: 200,
        message: '操作成功',
        data: {}
      }
      return resObj
    }
  }
] as MockMethod[]

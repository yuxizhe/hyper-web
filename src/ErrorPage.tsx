import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  // 使用 useRouteError 取得路由錯誤資訊
  const error: any = useRouteError()
  console.error(error)

  //  页面刷新
  window.location.reload()

  return <div />
}
export default ErrorPage

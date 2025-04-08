import NotFoundPage from '@/404'
import App from '@/App'
import ErrorPage from '@/ErrorPage'
import Home from '@/pages/Home'
import Files from '@/pages/Hyper/Files'
import Graph from '@/pages/Hyper/Graph'
import { HomeFilled, SmileFilled, FileAddOutlined, QuestionCircleOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

export const routers = [
  {
    path: '/',
    element: <Navigate replace to="/home" />
  },
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    icon: <SmileFilled />,
    children: [
      {
        path: '/home',
        name: '首页',
        icon: <HomeFilled />,
        element: <Home />,
        permissionObj: true,
      },
      {
        path: '/Hyper/files',
        name: '文档上传',
        icon: <FileAddOutlined />,
        element: <Files />,
      },
      {
        path: '/Hyper/show',
        name: '超图展示',
        icon: <SmileFilled />,
        // permissionObj: true,
        element: <Graph />
      },
      {
        path: '/Hyper/qa',
        name: '检索问答',
        icon: <QuestionCircleOutlined />,
        // permissionObj: true,
        element: <Home />
      },
      {
        path: '/Hyper/DB',
        name: 'HypergraphDB',
        icon: <DatabaseOutlined />,
        // permissionObj: true,
        element: <Home />
      },
    ]
  },
  { path: '*', element: <NotFoundPage /> }
]

// 插件
import demoPlugins from './modules/demo-plugins'
// 组件
import demoComponents from './modules/demo-components'
// 组件
import demoCharts from './modules/demo-charts'
// 组件库
import demoElement from './modules/demo-element'
// 功能
import demoPlayground from './modules/demo-playground'
// 示例
import demoBusiness from './modules/demo-business'
// CRUD
import demoD2Crud from './modules/demo-d2-crud'
// 第三方网页
import demoFrame from './modules/demo-frame'
// 角色与权限
import sysUser from './modules/sys-user'
// 测试
//import testOne from './modules/test-one'

// 菜单 侧边栏
export const menuAside = [
  demoComponents,
  demoPlugins,
  demoCharts,
  demoElement,
  demoPlayground,
  demoBusiness,
  demoD2Crud,
  demoFrame,
  sysUser
]

// 菜单 顶栏
export const menuHeader = [
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    title: '系统管理',
    icon: 'gear',
    children: [
      sysUser,
      {
        title: '系统设置',
        icon: 'link',
        children: [
          // { path: '/sys/setting/sql', title: 'SQL监控', icon: 'imdb' },
          { path: '', title: '定时任务', icon: 'clock-o' },
          { path: '/sys/setting/code', title: '代码生成', icon: 'globe' },
          { path: '', title: '系统日志', icon: 'globe' }
        ]
      }
    ]
  },
  {
    title: '组件',
    icon: 'puzzle-piece',
    children: [
      demoD2Crud,
      demoComponents,
      demoElement,
      demoCharts,
      demoPlugins,
      demoFrame
    ]
  },
  demoPlayground,
  demoBusiness,
    {
        path: '/sys/user/test',
        title: '管理员测试Demo列表',
        icon: 'users'
    }
]

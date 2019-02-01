export default {
  path: '/demo/business',
  title: '示例',
  icon: 'leaf',
  children: (pre => [
    { path: `${pre}table/1`, title: 'Demo', icon: 'table' }
    // {
    //   title: '表格',
    //   icon: 'table',
    //   children: [
    //     { path: `${pre}table/1`, title: '表格 1' }
    //   ]
    // }
  ])('/demo/business/')
}

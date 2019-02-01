import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import httpRequest from '@/plugin/axios'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  let index = (sessionStorage.getItem('permissions') || '[]').indexOf(key)
  return index !== -1
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  Vue.cookie.delete('token')
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}

/**
 * 获取登录角色与权限信息
 */
export function getPermissions () {
  httpRequest({
    url: httpRequest.adornUrl('/sys/menu/nav'),
    method: 'get'
  }).then((data) => {
    if (data && data.code === 0) {
      // fnAddDynamicMenuRoutes(data.menuList)
      // router.options.isAddDynamicMenuRoutes = true
      sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
      sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
      // next({ ...to, replace: true })
    } else {
      sessionStorage.setItem('menuList', '[]')
      sessionStorage.setItem('permissions', '[]')
      // next()
    }
  }).catch((e) => {
    console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
    // next({
    //   name: 'login'
    // })
  })
}

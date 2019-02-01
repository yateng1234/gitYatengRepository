import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: request.adornUrl('/sys/login'),
    method: 'post',
    data
  })
}

import { get } from '../http'

export function getMessageCount (accesstoken) {
  return get('/message/count', { accesstoken })
}

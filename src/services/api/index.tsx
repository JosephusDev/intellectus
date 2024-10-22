import axios from 'axios'

const urlBase = 'http://192.168.67.114:8800'

const Api = axios.create({
  baseURL: urlBase,
})

export { urlBase, Api }

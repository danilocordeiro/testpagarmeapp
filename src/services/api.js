import axios from 'axios'

const api = axios.create({ baseURL: 'https://pagarmeapi.herokuapp.com/api/' })

export default api

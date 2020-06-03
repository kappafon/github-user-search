// src/environments/development.ts
import environment from './base'
const baseApi = 'http://localhost:1234'
const env = environment(baseApi)
export default {
    ...env,
    intervals: {
        ...env.intervals,
        logout: 300, // 5 min in seconds
    },
    isProduction: false,
    isDevelopment: true,
}

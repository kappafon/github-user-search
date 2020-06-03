// src/environments/base.ts
export default function (baseApi) {
    return {
        intervals: {
            logout: 3600, // 1 hour in seconds
        },
        api: {
            dashboard: `${baseApi}/api/v1/dashboards`,
            schedule: `${baseApi}/api/v1/schedule`,
        },
        token: {
            auth: process.env.AUTH_TOKEN,
        },
        isProduction: true,
        isDevelopment: false,
    }
}

const AUTH_API_URI_DEV = 'https://kappafon-user-search.herokuapp.com/authenticate/'
const CLIENT_ID_DEV = '8dde7ff4708b3b012c93'
const REDIRECT_URI_DEV = 'http://localhost:3000/'
const LOGIN_URI_DEV = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID_DEV}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI_DEV}`

// const CLIENT_ID = 'cea04797ba11f6a7469e'
// const REDIRECT_URI = 'https://kappafon.github.io/github-user-search/'
// const LOGIN_URI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user%20public_repo%20gist&redirect_uri=${REDIRECT_URI}`
// const AUTH_API_URI = 'https://kappafon-user-search-deployed.herokuapp.com/authenticate/'

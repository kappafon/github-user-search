const isProduction = process.env.NODE_ENV === 'production'

export const RoutePatterns = {
    HOME: isProduction ? '/github-user-search' : '/',
    USERS_PAGE: isProduction ? '/github-user-search/users/:value' : '/users/:value',
    PROFILE_PAGE: isProduction ? '/github-user-search/profile/:value' : '/profile/:value',
}

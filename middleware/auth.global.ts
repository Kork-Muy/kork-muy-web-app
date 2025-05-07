export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    console.log("auth middleware", to)

    // Handle social callback
    // if (to.path === '/auth/social-callback') {
    //     const token = to.query.token as string
    //     if (token) {
    //         await userStore.setUser(token)
    //         return navigateTo('/')
    //     }
    // }

    // If user is not authenticated and trying to access a protected route
    console.log(userStore.isAuthenticated)
    if (!userStore.isAuthenticated && isProtectedRoute(to.path)) {
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
})

function isProtectedRoute(path: string): boolean {
    const protectedRoutes = ['/profile', '/my-events', '/create', '/tickets']
    return protectedRoutes.some(route => path.startsWith(route))
}
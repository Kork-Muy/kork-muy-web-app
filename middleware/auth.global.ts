export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()

    await userStore.checkIsAuthenticated();

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
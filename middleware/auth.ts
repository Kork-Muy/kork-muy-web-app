export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()

    // If user is not authenticated and trying to access a protected route
    if (!userStore.isAuthenticated && isProtectedRoute(to.path)) {
        return navigateTo({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
})

function isProtectedRoute(path: string): boolean {
    const protectedRoutes = ['/profile', '/my-events', '/create']
    return protectedRoutes.some(route => path.startsWith(route))
}
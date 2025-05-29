export default defineNuxtPlugin(() => {
    const { registerSW } = window as any

    if (registerSW) {
        registerSW({
            immediate: true,
            onNeedRefresh() {
                // Show a notification to the user that there's an update available
                if (confirm('New content available. Reload to update?')) {
                    window.location.reload()
                }
            },
            onOfflineReady() {
                console.log('App ready to work offline')
                // check if offline before enable offline mode
                if(navigator.onLine) {
                    const eventStore = useEventStore();
                    eventStore.setOfflineMode(true);
                    const ticketStore = useTicketStore();
                    ticketStore.setOfflineMode(true);
                    const userStore = useUserStore();
                    userStore.setOfflineMode(true);
                }
            },
        })
    }
})
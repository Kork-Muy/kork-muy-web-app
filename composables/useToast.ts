export interface Toast {
    id: string
    title: string
    description?: string
    type?: 'default' | 'success' | 'error' | 'warning'
    duration?: number
}

export function useToast() {
    const toasts = useState<Toast[]>('toasts', () => [])

    function addToast(toast: Omit<Toast, 'id'>) {
        const id = Math.random().toString(36).substring(2, 9)
        const duration = toast.duration || 5000

        toasts.value = [
            ...toasts.value,
            {
                id,
                ...toast,
            },
        ]

        setTimeout(() => {
            removeToast(id)
        }, duration)

        return id
    }

    function removeToast(id: string) {
        toasts.value = toasts.value.filter(toast => toast.id !== id)
    }

    return {
        toasts,
        addToast,
        removeToast,
    }
}
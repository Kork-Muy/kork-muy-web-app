declare module 'qrcode-vue' {
  import { DefineComponent } from 'vue'
  const QrcodeVue: DefineComponent<{
    value: string
    size?: number
    level?: 'L' | 'M' | 'Q' | 'H'
    background?: string
    foreground?: string
  }>
  export default QrcodeVue
} 
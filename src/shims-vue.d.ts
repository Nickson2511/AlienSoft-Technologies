/// <reference types="vite/client" />

import type { DefineComponent } from 'vue'

// Strict declaration for .vue files
declare module '*.vue' {
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
    export default component
}

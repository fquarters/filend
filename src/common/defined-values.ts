declare const VERSION: string;
declare const MODE: 'DEVELOPMENT' | 'PRODUCTION'

export const getVersion = (): string => VERSION;
export const isDevMode = (): boolean => MODE === 'DEVELOPMENT'
export const isProductionMode = (): boolean => MODE === 'PRODUCTION'
import type { App } from 'vue'
import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { useLocalStorage } from '@vueuse/core'

const storage = useLocalStorage('otg-options', {}) as any
const locale = storage.value?.apperance?.language

// import i18n resources
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../locales/*.yml')).map(
    ([path, loadLocale]) => {
      console.log(path)
      return [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]
    }
  )
)

export const availableLocales = Object.keys(localesMap)

const i18n = createI18n({
  legacy: false,
  locale,
  globalInjection: true,
  messages: {}
})

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  return lang
}

const install = (app: App) => {
  app.use(i18n)
  loadLanguageAsync('en-US')
}

export default install

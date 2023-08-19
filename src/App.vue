<template>
  <!-- TODO: Add rtl support -->
  <div
    class="bg-neutral-50 dark:bg-neutral-900 lg:px-4 min-h-screen flex-center flex-col"
  >
    <main
      class="sm:py-18 sm:gap-8 container relative mx-auto grid grid-cols-12 px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20"
    >
      <section
        class="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6"
      >
        <div
          class="relative lg:mx-auto lg:max-w-md 2xl:max-w-md bg-white dark:bg-neutral-800 rounded-2xl"
        >
          <div
            :class="classes[brandColor]"
            class="rounded-2xl lg:min-w-md 2xl:min-w-md"
          >
            <div
              class="border-neutral-400 bg-neutral-50 dark:bg-neutral-800 relative rounded-xl px-8 py-12 drop-shadow-sm"
            >
              <div class="mb-6 flex flex-col gap-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 rounded-full p-2"
                    :style="{
                      background: backgroundColor,
                      color: brandColor
                    }"
                  >
                    <IconPalette />
                  </div>
                  <h1 class="text-primary text-2xl">Acme Industries</h1>
                </div>
                <p class="text-neutral-400 text-auth-widget-test">
                  Sign in today for Supa stuff
                </p>
              </div>
              <Auth
                :appearance="{
                  theme: ThemeSupa,
                  style: {
                    button: {
                      borderRadius: borderRadius,
                      borderColor: 'rgba(0,0,0,0.1)'
                    },
                    input: {
                      borderRadius: borderRadius
                    }
                  },
                  variables: {
                    default: {
                      colors: {
                        brand: brandColor,
                        brandAccent: `gray`
                      }
                    }
                  }
                }"
                :supabaseClient="supabaseClient"
                :view="view.id"
                :providers="['github', 'google', 'twitter']"
                :socialLayout="socialLayout"
                :theme="theme"
                :dark="isDark"
                :localization="{
                  variables: I18nVariables
                }"
                show-links
              />
            </div>
          </div>
        </div>
      </section>
      <section class="col-span-12 md:col-span-5 lg:col-span-6">
        <div class="container mx-auto max-w-full sm:max-w-2xl relative">
          <UserContextProvider :supabaseClient="supabaseClient">
            <Hero />
          </UserContextProvider>

          <main
            class="grid grid-cols-1 gap-8 text-xs 2xl:text-sm text-primary pb-20"
          >
            <div class="grid gap-8 py-8 sm:grid-cols-2">
              <div class="flex flex-col gap-8">
                <!-- Brand color -->
                <div class="flex flex-col gap-6">
                  <div class="text-secondary text-base">Brand color</div>
                  <div class="flex items-center gap-3">
                    <ToggleButton
                      v-model:selected="brandColor"
                      v-for="color in colors"
                      :key="color"
                      :defaultValue="color"
                      :color="color"
                    />
                  </div>
                </div>

                <!-- Rounded corners -->
                <div class="flex flex-col gap-6">
                  <div class="text-secondary text-base">Rounded corners</div>
                  <div class="flex items-center gap-3">
                    <ToggleButton
                      v-model:selected="borderRadius"
                      :defaultValue="radii[0]"
                      class="rounded-xl border-b-0 border-l-0 !bg-neutral-100 !dark:bg-neutral-800"
                    />
                    <ToggleButton
                      v-model:selected="borderRadius"
                      :defaultValue="radii[1]"
                      class="rounded-xl border-b-0 border-l-0 !bg-neutral-100 !dark:bg-neutral-800"
                    />
                    <ToggleButton
                      v-model:selected="borderRadius"
                      :defaultValue="radii[2]"
                      class="rounded-2xl border-b-0 border-l-0 !bg-neutral-100 !dark:bg-neutral-800"
                    />
                  </div>
                </div>

                <!-- Social Auth Layout -->
                <div class="flex flex-col gap-6">
                  <div class="text-secondary text-base">Social Auth Layout</div>
                  <div class="flex items-center gap-3">
                    <ToggleButton
                      v-model:selected="socialLayout"
                      :defaultValue="socialAlignments[0]"
                      class="flex items-center justify-center !border-neutral-300/66 !dark:border-neutral-800/66 !bg-neutral-100 !dark:bg-neutral-800"
                    >
                      <IconMenu
                        class="!text-neutral-500 !dark:text-neutral-200 w-6 rotate-90"
                      />
                    </ToggleButton>

                    <ToggleButton
                      v-model:selected="socialLayout"
                      :defaultValue="socialAlignments[1]"
                      class="flex items-center justify-center !border-neutral-300/66 !dark:border-neutral-800/66 !bg-neutral-100 !dark:bg-neutral-800"
                    >
                      <IconMenu
                        class="!text-neutral-500 !dark:text-neutral-200 w-6"
                      />
                    </ToggleButton>
                  </div>
                </div>
              </div>

              <!-- Component View -->
              <div class="flex flex-col gap-6">
                <div class="text-secondary text-base">Component View</div>
                <div class="flex items-center gap-3">
                  <div class="relative flex flex-col gap-2">
                    <button
                      v-for="v in views"
                      :key="v.id"
                      :value="v.id"
                      @click.prevent="view = v"
                      class="text-white border-0 py-2 px-6 focus:outline-none rounded text-sm"
                      :style="{
                        background:
                          view.id === v.id ? brandColor : backgroundColor
                      }"
                    >
                      {{ v.title }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import Auth from '@/auth/Auth.vue'
import UserContextProvider, {
  useSupabaseUser
} from '@/auth/UserContextProvider'
import { isDark } from '~/composables/useDarkmode'
import { useSEOHeader } from '~/composables/useSEOHeader'
import IconMenu from './components/IconMenu.vue'
import IconPalette from './components/IconPalette.vue'
import { useLanguage } from './composables/useLanguage'

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

useSEOHeader()
const { supabaseUser } = useSupabaseUser(supabaseClient)
const { locale } = useI18n()
const { en, zh, ar } = useLanguage()

const classes: { [key: string]: string } = {
  'rgb(16, 185, 129)': 'container-greenshadow',
  'rgb(139, 92, 246)': 'container-purpleshadow',
  'rgb(217, 70, 239)': 'container-pinkshadow',
  'rgb(14, 165, 233)': 'container-blueshadow',
  'rgb(245, 158, 11)': 'container-orangeshadow'
}
const radii = ['5px', '10px', '20px'] as const
const colors = [
  'rgb(16, 185, 129)',
  'rgb(139, 92, 246)',
  'rgb(217, 70, 239)',
  'rgb(14, 165, 233)',
  'rgb(245, 158, 11)'
] as const

const socialAlignments = ['horizontal', 'vertical'] as const

const views: { id: ViewType; title: string }[] = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
  { id: 'verify_otp', title: 'Verify Otp' }
]

const brandColor = ref(colors[0])
const borderRadius = ref(radii[0])
const socialLayout = ref(socialAlignments[0])
const view = ref(views[0])

const backgroundColor = computed(() => {
  const opacity = isDark.value ? '.2' : '.48'
  return brandColor.value.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
})
const theme = computed(() => (isDark.value ? 'dark' : 'default'))
const I18nVariables = computed(() => (locale.value === 'en-US' ? en : zh)) // TODO: add ar
watch(
  () => supabaseUser.value,
  (newUser) => {
    console.log(newUser)
  },
  { deep: true }
)
</script>

<style scoped>
.container-purpleshadow {
  box-shadow: 0px 0px 256px rgb(139, 92, 246, 0.3);
}

.container-pinkshadow {
  box-shadow: 0px 0px 256px rgb(217, 70, 239, 0.3);
}

.container-greenshadow {
  box-shadow: 0px 0px 256px rgb(16, 185, 129, 0.3);
}

.container-blueshadow {
  box-shadow: 0px 0px 256px rgb(14, 165, 233, 0.3);
}

.container-orangeshadow {
  box-shadow: 0px 0px 256px rgb(245, 158, 11, 0.3);
}

.dark .container-purpleshadow {
  box-shadow: 0px 0px 256px rgb(139, 92, 246, 0.6);
}

.dark .container-pinkshadow {
  box-shadow: 0px 0px 256px rgb(217, 70, 239, 0.6);
}

.dark .container-greenshadow {
  box-shadow: 0px 0px 256px rgb(16, 185, 129, 0.6);
}

.dark .container-blueshadow {
  box-shadow: 0px 0px 256px rgb(14, 165, 233, 0.6);
}

.dark .container-orangeshadow {
  box-shadow: 0px 0px 256px rgb(245, 158, 11, 0.6);
}
</style>

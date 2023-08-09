<template>
  <div class="bg-neutral-900 px-4 min-h-screen flex-center flex-col">
    <div
      class="sm:py-18 gap-8 container relative mx-auto grid grid-cols-12 px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20"
    >
      <div
        class="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6"
      >
        <div
          class="relative lg:mx-auto lg:max-w-md 2xl:max-w-md bg-neutral-800"
        >
          <div
            :class="classes[brandColor]"
            class="rounded-2xl lg:min-w-md 2xl:min-w-md"
          >
            <div
              class="border-neutral-400 bg-neutral-800 relative rounded-xl px-8 py-12 drop-shadow-sm"
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
                  <h1 class="text-neutral-50 text-2xl">Acme Industries</h1>
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
                      borderColor: 'rgba(0,0,0,0)'
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
                :supabase-client="supabaseClient"
                :view="view.id"
                :providers="['github', 'google', 'twitter']"
                :socialLayout="socialLayout"
                show-links
                theme="dark"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-5 lg:col-span-6">
        <div class="container mx-auto max-w-full sm:max-w-2xl relative">
          <UserContextProvider :supabase-client="supabaseClient">
            <Hero />
          </UserContextProvider>

          <main
            class="grid grid-cols-1 gap-8 text-xs 2xl:text-sm text-primary pb-20"
          >
            <div class="grid gap-8 py-8 sm:grid-cols-2">
              <div class="flex flex-col gap-8">
                <!-- Brand color -->
                <div class="flex flex-col gap-6">
                  <div class="text-neutral-200 text-base">Brand color</div>
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
                  <div class="text-neutral-200 text-base">Rounded corners</div>
                  <div class="flex items-center gap-3">
                    <ToggleButton
                      v-model:selected="borderRadius"
                      :defaultValue="radii[0]"
                      class="rounded-xl border-b-0 border-l-0 !bg-neutral-800"
                    />
                    <ToggleButton
                      v-model:selected="borderRadius"
                      :defaultValue="radii[1]"
                      class="rounded-xl border-b-0 border-l-0 !bg-neutral-800"
                    />
                    <ToggleButton
                      v-model:selected="borderRadius"
                      :defaultValue="radii[2]"
                      class="rounded-2xl border-b-0 border-l-0 !bg-neutral-800"
                    />
                  </div>
                </div>

                <!-- Social Auth Layout -->
                <div class="flex flex-col gap-6">
                  <div class="text-neutral-200 text-base">
                    Social Auth Layout
                  </div>
                  <div class="flex items-center gap-3">
                    <ToggleButton
                      v-model:selected="socialLayout"
                      :defaultValue="socialAlignments[0]"
                      class="flex items-center justify-center !border-neutral-800/66 !bg-neutral-800"
                    >
                      <IconMenu
                        class="text-neutral-900 dark:text-neutral-200 w-6 rotate-90"
                      />
                    </ToggleButton>

                    <ToggleButton
                      v-model:selected="socialLayout"
                      :defaultValue="socialAlignments[1]"
                      class="flex items-center justify-center !border-neutral-800/66 !bg-neutral-800"
                    >
                      <IconMenu
                        class="text-neutral-900 dark:text-neutral-200 w-6"
                      />
                    </ToggleButton>
                  </div>
                </div>
              </div>

              <!-- Component View -->
              <div class="flex flex-col gap-6">
                <div class="text-neutral-200 text-base">Component View</div>
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
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { ThemeSupa, ThemeMinimal, ViewType } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'

// import { toggleDarkmode, isDark } from '~/composables/useDarkmode'
import { useSEOHeader } from '~/composables/useSEOHeader'
import Auth from '@/Auth.vue'
import IconMenu from './components/IconMenu.vue'
import IconPalette from './components/IconPalette.vue'
import UserContextProvider, {
  useSupabaseUser
} from '@/auth/UserContextProvider'

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

useSEOHeader()
const { supabaseUser } = useSupabaseUser(supabaseClient)

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
  return brandColor.value.replace('rgb', 'rgba').replace(')', ', .2)')
})

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
  box-shadow: -2px 1px 69px 5px rgb(139, 92, 246);
}

.container-pinkshadow {
  box-shadow: -2px 1px 69px 5px rgb(217, 70, 239);
}

.container-greenshadow {
  box-shadow: -2px 1px 69px 5px rgb(16, 185, 129);
}

.container-blueshadow {
  box-shadow: -2px 1px 69px 5px rgb(14, 165, 233);
}

.container-orangeshadow {
  box-shadow: -2px 1px 69px 5px rgb(245, 158, 11);
}
</style>

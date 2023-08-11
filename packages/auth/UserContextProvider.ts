import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { PropType, defineComponent, h, onMounted, provide, ref } from 'vue'

import { UserContextProviderKey } from '../types'

export default defineComponent({
  name: 'UserContextProvider',
  props: {
    supabaseClient: {
      type: Object as PropType<SupabaseClient>,
      required: true
    }
  },
  setup({ supabaseClient }, { slots }) {
    const session = ref<Session | null>(null)
    const user = ref<User | null>(null)

    onMounted(async () => {
      const { data } = await supabaseClient.auth.getSession()
      session.value = data.session
      user.value = data.session?.user! ?? null

      const { data: authListener } = supabaseClient.auth.onAuthStateChange(
        async (event, newSession) => {
          session.value = newSession
          user.value = newSession?.user! ?? null
        }
      )

      return () => {
        console.log('authListener')
        authListener?.subscription.unsubscribe()
      }
    })

    provide(UserContextProviderKey, {
      session,
      user
    })

    return () => h('div', null, slots?.default?.())
  }
})

export const useSupabaseUser = (supabaseClient: SupabaseClient) => {
  const supabaseUser = ref<User | null>(null)

  // Asyncronous refresh session and ensure user is still logged in
  supabaseClient?.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      if (JSON.stringify(supabaseUser.value) !== JSON.stringify(session.user)) {
        supabaseUser.value = session.user
      }
    } else {
      supabaseUser.value = null
    }
  })

  return {
    supabaseUser
  }
}

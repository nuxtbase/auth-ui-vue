import { useHead, useSeoMeta } from '@vueuse/head'

const useSEOHeader = () => {
  useHead({
    title: 'Auth UI Vue',
    titleTemplate: (title) => `${title} | Pre-built auth ui for Vue 3 | Nuxt 3`,
    meta: [
      {
        name: 'author',
        content: '@xiaoluoboding'
      },
      {
        name: 'description',
        content: 'Pre-built auth ui for Vue 3 | Nuxt 3'
      }
    ]
  })
  useSeoMeta({
    title: 'Auth UI Vue',
    description: 'Pre-built auth ui for Vue 3 | Nuxt 3',
    ogDescription: 'Pre-built auth ui for Vue 3 | Nuxt 3',
    ogTitle: 'Auth UI Vue',
    ogImage: 'https://auth-ui-vue.vercel.app/og.png',
    ogImageHeight: '882',
    ogImageWidth: '1686',
    twitterCard: 'summary_large_image',
    twitterImage: 'https://auth-ui-vue.vercel.app/og.png',
    twitterTitle: 'Auth UI Vue',
    twitterDescription: 'Pre-built auth ui for Vue 3 | Nuxt 3'
  })
}
export { useSEOHeader }

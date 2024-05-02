# Auth UI Vue

[![NPM][npmBadge]][npmUrl]
[![Minzip Package][bundlePhobiaBadge]][bundlePhobiaUrl]
[![NPM Download][npmDtBadge]][npmDtUrl]

[npmBadge]: https://img.shields.io/npm/v/@nuxtbase/auth-ui-vue.svg?maxAge=2592000
[npmUrl]: https://www.npmjs.com/package/@nuxtbase/auth-ui-vue
[npmDtBadge]: https://img.shields.io/npm/dt/@nuxtbase/auth-ui-vue.svg
[npmDtUrl]: https://www.npmjs.com/package/@nuxtbase/auth-ui-vue
[bundlePhobiaBadge]: https://img.shields.io/bundlephobia/minzip/@nuxtbase/auth-ui-vue
[bundlePhobiaUrl]: https://bundlephobia.com/package/@nuxtbase/auth-ui-vue@latest

> Pre-built auth widgets to get started in minutes.

## Preview

https://user-images.githubusercontent.com/6118824/260960744-03a20835-76bc-4541-87ac-2e23277b7200.mp4

## Introduction

`auth-ui-vue` is a pre-built, customizable `Vue` component for authenticating users base on `supabase`

Customizable authentication UI component with custom themes and extensible styles to match your brand and aesthetic.

## Table of Contents

- [Auth UI Vue](#auth-ui-vue)
  - [Preview](#preview)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [For Vue 3](#for-vue-3)
    - [For Nuxt 3](#for-nuxt-3)
  - [Set up Auth UI](#set-up-auth-ui)
    - [Social Providers](#social-providers)
    - [Options](#options)
    - [Supported Views](#supported-views)
    - [Anonymous Sign-ins](#anonymous-sign-ins)
  - [Customization](#customization)
    - [Predefined themes](#predefined-themes)
    - [Switch theme variations](#switch-theme-variations)
    - [Override themes](#override-themes)
    - [Create your own theme](#create-your-own-theme)
    - [Custom CSS classes](#custom-css-classes)
    - [Custom inline CSS](#custom-inline-css)
    - [Custom lables (i18n)](#custom-lables-i18n)
  - [Auth Helpers](#auth-helpers)
    - [UserContextProvider](#usercontextprovider)
    - [useSupabaseUser](#usesupabaseuser)
  - [Inspiration](#inspiration)
  - [License](#license)

## Usage

### For Vue 3

To start using the library in Vue 3, install these in your project:

```bash
pnpm install @supabase/supabase-js @supabase/auth-ui-shared @nuxtbase/auth-ui-vue -D
or
yarn add @supabase/supabase-js @supabase/auth-ui-shared @nuxtbase/auth-ui-vue -D
```

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa
    }"
  />
  ...
</template>

<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { createClient } from '@supabase/supabase-js'

  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

### For Nuxt 3

To begin, install the [Supabase module for Nuxt](https://github.com/nuxt-modules/supabase). The `auth-ui-vue` integration is seamless with this module.

Or, You can choose to use it in the same way as in Vue 3.

Here's a example work with `@nuxtjs/supabase`:

First install these in your project:

```bash
pnpm install @nuxtjs/supabase @supabase/auth-ui-shared @nuxtbase/auth-ui-vue -D
or
yarn add @nuxtjs/supabase @supabase/auth-ui-shared @nuxtbase/auth-ui-vue -D
```

Add `@nuxtjs/supabase` to the modules section of `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase']
})
```

Add `SUPABASE_URL` and `SUPABASE_KEY` to the .env:

```bash
SUPABASE_URL="<INSERT PROJECT URL>"
SUPABASE_KEY="<INSERT PROJECT ANON API KEY>"
```

Now, you can access the [supabase client](https://supabase.com/docs/reference/javascript/initializing) everywhere inside your vue components.

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa
    }"
  />
  ...
</template>

<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = useSupabaseClient()
</script>
```

## Set up Auth UI

### Social Providers

The Auth component also supports login with [official social providers](https://supabase.com/docs/guides/auth#providers).

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa,
    }"
    :providers="['google', 'facebook', 'twitter']"
  />
  ...
</template>

<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { createClient } from '@supabase/supabase-js'

  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

### Options

Options are available via `queryParams`:

```html
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :providers="['google']"
    :queryParams="{
      access_type: 'offline',
      prompt: 'consent',
      hd: 'domain.com'
    }"
    onlyThirdPartyProviders
  />
  ...
</tempalte>
```

### Supported Views

The Auth component is currently shipped with the following views:

- [Email Login](https://supabase.com/docs/guides/auth/auth-email)
- [Magic Link login](https://supabase.com/docs/guides/auth/auth-magic-link)
- [Social Login](https://supabase.com/docs/guides/auth/social-login)
- [Update password](https://supabase.com/docs/guides/auth/auth-password-reset#update-password)
- [Forgotten password](https://supabase.com/docs/guides/auth/auth-password-reset#sending-password-reset-email)
- [Anonymous Sign-ins](https://supabase.com/docs/guides/auth/auth-anonymous)

```html
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :providers="['google']"
    v-model:view="authView"
    :redirectTo="redirectTo"
  />
  ...
</tempalte>

<script setup lang="ts">
const authView = ref('sign_in')

const redirectTo = computed(() => {
  return authView.value === 'forgotten_password' ? FORGOTTEN_PASSWORD_URL : REDIRECT_TO_URL
})
</script>

```

### Anonymous Sign-ins

The Auth component is currently support [Anonymous user login](https://supabase.com/docs/guides/auth/auth-anonymous#sign-in-anonymously).
For this you need to create an anonymous user

```js
const { data, error } = await supabase.auth.signInAnonymously()
```

[Enable manual linking](https://supabase.com/dashboard/project/_/settings/auth) in supabase

Currently works for magic link and social login.
If you use password login, you need user to update password after he

## Customization

There are several ways to customize Auth UI:

- Use one of the [predefined themes](#predefined-themes) that comes with Auth UI
- Extend a theme by [overriding the variable tokens](#override-themes) in a theme
- [Create your own theme](#create-your-own-theme)
- [Use your own CSS classes](#custom-css-classes)
- [Use inline styles](#custom-inline-css)
- [Use your own labels](#custom-lables-i18n)

### Predefined themes

Auth UI comes with several themes to customize the appearance. Each predefined theme comes with at least two variations, a `default` variation, and a `dark` variation. You can switch between these themes using the `theme` prop. Import the theme you want to use and pass it to the `appearance.theme` prop.

```html
<!-- App.vue -->
<!-- {/* Apply predefined theme */} -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa,
    }"
  />
  ...
</template>

<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { createClient } from '@supabase/supabase-js'

  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

> Currently there is only one predefined theme available, but we plan to add more.

### Switch theme variations

Auth UI comes with two theme variations: `default` and `dark`. You can switch between these themes with the `theme` prop.

```html
<!-- App.vue -->
<!-- {/* Set theme to dark */} -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa,
    }"
    theme="dark"
  />
  ...
</template>

<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { createClient } from '@supabase/supabase-js'

  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

If you don't pass a value to `theme` it uses the `"default"` theme. You can pass `"dark"` to the theme prop to switch to the `dark` theme. If your theme has other variations, use the name of the variation in this prop.

### Override themes

Auth UI themes can be overridden using variable tokens. See the [list of variable tokens](https://github.com/supabase/auth-ui/blob/main/packages/shared/src/theming/Themes.ts).

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: ThemeSupa,
      variables: {
        default: {
          colors: {
            brand: 'red',
            brandAccent: 'darkred'
          }
        }
      }
    }"
  />
  ...
</template>

<script setup lang="ts">
  // Import predefined theme
  import { ThemeSupa } from '@supabase/auth-ui-shared'
  import { createClient } from '@supabase/supabase-js'

  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

If you created your own theme, you may not need to override any of the them.

### Create your own theme

You can create your own theme by following the same structure within a `appearance.theme` property.
See the list of [tokens within a theme](https://github.com/supabase/auth-ui/blob/main/packages/shared/src/theming/Themes.ts).

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    theme="default"
    :supabaseClient="supabaseClient"
    :appearance="{
      theme: customTheme
    }"
  />
  ...
</template>

<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@nuxtbase/auth-ui-vue'

  const customTheme = {
    default: {
      colors: {
        brand: 'hsl(153 60.0% 53.0%)',
        brandAccent: 'hsl(154 54.8% 45.1%)',
        brandButtonText: 'white'
        // ..
      }
    },
    dark: {
      colors: {
        brandButtonText: 'white',
        defaultButtonBackground: '#2e2e2e',
        defaultButtonBackgroundHover: '#3e3e3e'
        //..
      }
    },
    // You can also add more theme variations with different names.
    evenDarker: {
      colors: {
        brandButtonText: 'white',
        defaultButtonBackground: '#1e1e1e',
        defaultButtonBackgroundHover: '#2e2e2e'
        //..
      }
    }
  }

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

You can swich between different variations of your theme with the ["theme" prop](#switch-theme-variations).

### Custom CSS classes

You can use custom CSS classes for the following elements:
`"button"`, `"container"`, `"anchor"`, `"divider"`, `"label"`, `"input"`, `"loader"`, `"message"`.

```html
<!-- App.vue -->
<!-- // If you want to extend the default styles instead of overriding it, set "extend" to true -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      extend: false,
      className: {
        anchor: 'my-awesome-anchor',
        button: 'my-awesome-button',
        //..
      }
    }"
  />
  ...
</template>

<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

### Custom inline CSS

You can use custom CSS inline styles for the following elements:
`"button"`, `"container"`, `"anchor"`, `"divider"`, `"label"`, `"input"`, `"loader"`, `"message"`.

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :appearance="{
      style: {
        button: { background: 'red', color: 'white' },
        anchor: { color: 'blue' },
        //..
      }
    }"
  />
  ...
</template>

<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

### Custom lables (i18n)

You can use custom labels with localization.variables. See the [list of labels](https://github.com/supabase/auth-ui/blob/main/packages/shared/src/localization/en.json) that can be overwritten.

```html
<!-- App.vue -->
<template>
  ...
  <Auth
    :supabaseClient="supabaseClient"
    :localization="{
      variables: {
        sign_in: {
          email_label: 'Your email address',
          password_label: 'Your strong password'
        }
      }
    }"
  />
  ...
</template>

<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@nuxtbase/auth-ui-vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

## Auth Helpers

### UserContextProvider

`auth-ui-vue` provides `UserContextProvider` to passing the supabase `user` and `session` data into the component tree.

This will be useful when the sub-components need to access the `user` data at any time in the project.

```html
<!-- App.vue (parent component) -->
<template>
  <UserContextProvider :supabaseClient="supabaseClient">
    <Profile />
  </UserContextProvider>
</template>

<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js'
  import { UserContextProvider } from '@nuxtbase/auth-ui-vue'

  import Profile from '@/components/Profile.vue'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
</script>
```

```html
<!-- Profile.vue (children component) -->
<template>
  <!-- Read the supabase user data -->
  {{ user.email }}
</template>

<script lang="ts" setup>
  import {
    injectStrict,
    UserContextProviderInjection,
    UserContextProviderKey
  } from '@nuxtbase/auth-ui-vue'

  const { user } = injectStrict<UserContextProviderInjection>(
    UserContextProviderKey
  )
</script>
```

### useSupabaseUser

Once logged in, you can access supabase user everywhere inside your vue components.

Or you can protect your authenticated routes by watching the user's state, here is an example:

```html
<template>
  <!-- Access the supabase user data -->
  {{ supabaseUser.email }}
</template>

<script lang="ts" setup>
  import { createClient } from '@supabase/supabase-js'

  const supabaseClient = createClient(
    '<INSERT PROJECT URL>',
    '<INSERT PROJECT ANON API KEY>'
  )
  const { supabaseUser } = useSupabaseUser(supabaseClient)

  watch(
    () => supabaseUser.value,
    (user) => {
      if (!user) {
        return router.push('/login')
      }
    },
    { immediate: true }
  )
</script>
```

## Inspiration

- [@supabase/auth-ui-react](https://github.com/supabase/auth-ui) - Pre-built Auth UI for React.

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)

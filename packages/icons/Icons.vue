<template>
  <component :is="providers[name]" />
</template>

<script setup lang="ts">
import { Provider } from '@supabase/supabase-js'
import type { Component } from 'vue'

import google from './IconGoogle.vue'
import facebook from './IconFacebook.vue'
import twitter from './IconTwitter.vue'
import apple from './IconApple.vue'
import github from './IconGithub.vue'
import gitlab from './IconGitlab.vue'
import bitbucket from './IconBitbucket.vue'
import discord from './IconDiscord.vue'
import azure from './IconAzure.vue'
import keycloak from './IconKeycloak.vue'
import linkedin from './IconLinkedin.vue'
import notion from './IconNotion.vue'
import slack from './IconSlack.vue'
import spotify from './IconSpotify.vue'
import twitch from './IconTwitch.vue'
import workos from './IconWorkos.vue'

type ProviderMap = { [key in Partial<Provider>]: Component }

const providers: Partial<ProviderMap> = {
  google,
  facebook,
  twitter,
  apple,
  github,
  gitlab,
  bitbucket,
  discord,
  azure,
  keycloak,
  linkedin,
  notion,
  slack,
  spotify,
  twitch,
  workos
}

defineProps<{ name: keyof typeof providers }>()
</script>

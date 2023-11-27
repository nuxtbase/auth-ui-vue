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
import figma from './IconFigma.vue'
import github from './IconGithub.vue'
import gitlab from './IconGitlab.vue'
import bitbucket from './IconBitbucket.vue'
import discord from './IconDiscord.vue'
import azure from './IconAzure.vue'
import kakao from './IconKakao.vue'
import keycloak from './IconKeycloak.vue'
import linkedin from './IconLinkedin.vue'
import linkedin_oidc from './IconLinkedin.vue'
import notion from './IconNotion.vue'
import slack from './IconSlack.vue'
import spotify from './IconSpotify.vue'
import twitch from './IconTwitch.vue'
import workos from './IconWorkos.vue'
import zoom from './IconZoom.vue'

type ProviderMap = { [key in Partial<Provider>]: Component }

const providers: Partial<ProviderMap> = {
  apple,
  azure,
  bitbucket,
  discord,
  facebook,
  figma,
  google,
  github,
  gitlab,
  kakao,
  keycloak,
  linkedin,
  linkedin_oidc,
  notion,
  slack,
  spotify,
  twitch,
  twitter,
  workos,
  zoom
}

defineProps<{ name: keyof typeof providers }>()
</script>

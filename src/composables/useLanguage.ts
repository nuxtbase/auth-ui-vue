import { en } from '@supabase/auth-ui-shared'
import { useI18n } from 'vue-i18n'
import cloneDeep from 'lodash.clonedeep'

import { loadLanguageAsync, availableLocales } from '~/plugins/i18n'

const sign_up = {
  email_label: '邮箱地址',
  password_label: '密码',
  email_input_placeholder: '请输入邮箱地址',
  password_input_placeholder: '请输入密码',
  button_label: '注册',
  loading_button_label: '登录中...',
  social_provider_text: '通过 {{provider}} 继续',
  link_text: '还没有账号？ 注册',
  confirmation_text: '请查看您的电子邮件以获取确认链接'
}
const sign_in = {
  email_label: '邮箱地址',
  password_label: '密码',
  email_input_placeholder: '请输入邮箱地址',
  password_input_placeholder: '请输入密码',
  button_label: '登录',
  loading_button_label: '登录中...',
  social_provider_text: '通过 {{provider}} 继续',
  link_text: '已经账号？登录'
}
const magic_link = {
  email_input_label: '邮箱地址',
  email_input_placeholder: '请输入邮箱地址',
  button_label: '登录',
  loading_button_label: '登录中...',
  link_text: '发送一封魔法链接邮件',
  confirmation_text: '请检查您的电子邮件以获取确认链接'
}
const forgotten_password = {
  email_label: '邮箱地址',
  password_label: '密码',
  email_input_placeholder: '请输入邮箱地址',
  button_label: '发送重置密码指令',
  loading_button_label: '发送重置密码指令中 ...',
  link_text: '忘记密码?',
  confirmation_text: '请检查您的电子邮件以获取密码重置链接'
}
const update_password = {
  password_label: '新密码',
  password_input_placeholder: '请输入新密码',
  button_label: '更新密码',
  loading_button_label: '更新密码中 ...',
  confirmation_text: '密码已更新'
}
const verify_otp = {
  email_input_label: '邮箱地址',
  email_input_placeholder: '请输入邮箱地址',
  phone_input_label: '电话号码',
  phone_input_placeholder: '请输入电话号码',
  token_input_label: '密钥',
  token_input_placeholder: '请输入一次性密钥',
  button_label: '验证密钥',
  loading_button_label: '登录中...'
}
const zh = {
  sign_up: sign_up,
  sign_in: sign_in,
  magic_link: magic_link,
  forgotten_password: forgotten_password,
  update_password: update_password,
  verify_otp: verify_otp
}

const useLanguage = () => {
  const { locale } = useI18n()

  const toggleLocales = () => {
    const locales = availableLocales
    const newLocale =
      locales[(locales.indexOf(locale.value) + 1) % locales.length]
    loadLanguageAsync(newLocale)
    locale.value = newLocale
  }
  return {
    en: cloneDeep(en),
    zh: cloneDeep(zh),
    availableLocales,
    toggleLocales
  }
}

export { useLanguage }

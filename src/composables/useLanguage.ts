import { en } from '@supabase/auth-ui-shared'
import cloneDeep from 'lodash.clonedeep'
import { useI18n } from 'vue-i18n'

import { availableLocales, loadLanguageAsync } from '~/plugins/i18n'

const zh_sign_up = {
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
const zh_sign_in = {
  email_label: '邮箱地址',
  password_label: '密码',
  email_input_placeholder: '请输入邮箱地址',
  password_input_placeholder: '请输入密码',
  button_label: '登录',
  loading_button_label: '登录中...',
  social_provider_text: '通过 {{provider}} 继续',
  link_text: '已经账号？登录'
}
const zh_magic_link = {
  email_input_label: '邮箱地址',
  email_input_placeholder: '请输入邮箱地址',
  button_label: '登录',
  loading_button_label: '登录中...',
  link_text: '发送一封魔法链接邮件',
  confirmation_text: '请检查您的电子邮件以获取确认链接'
}
const zh_forgotten_password = {
  email_label: '邮箱地址',
  password_label: '密码',
  email_input_placeholder: '请输入邮箱地址',
  button_label: '发送重置密码指令',
  loading_button_label: '发送重置密码指令中 ...',
  link_text: '忘记密码?',
  confirmation_text: '请检查您的电子邮件以获取密码重置链接'
}
const zh_update_password = {
  password_label: '新密码',
  password_input_placeholder: '请输入新密码',
  button_label: '更新密码',
  loading_button_label: '更新密码中 ...',
  confirmation_text: '密码已更新'
}
const zh_verify_otp = {
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
  sign_up: zh_sign_up,
  sign_in: zh_sign_in,
  magic_link: zh_magic_link,
  forgotten_password: zh_forgotten_password,
  update_password: zh_update_password,
  verify_otp: zh_verify_otp
}

const ar_sign_up = {
  email_label: 'عنوان البريد الإلكتروني',
  password_label: 'كلمة المرور',
  email_input_placeholder: 'الرجاء إدخال عنوان البريد الإلكتروني',
  password_input_placeholder: 'الرجاء إدخال كلمة المرور',
  button_label: 'التسجيل',
  loading_button_label: 'جارٍ تسجيل الدخول...',
  social_provider_text: 'المتابعة عبر {{provider}}',
  link_text: 'ليس لديك حساب؟ التسجيل',
  confirmation_text: 'يرجى مراجعة بريدك الإلكتروني للحصول على رابط التأكيد'
}

const ar_sign_in = {
  email_label: 'عنوان البريد الإلكتروني',
  password_label: 'كلمة المرور',
  email_input_placeholder: 'الرجاء إدخال عنوان البريد الإلكتروني',
  password_input_placeholder: 'الرجاء إدخال كلمة المرور',
  button_label: 'تسجيل الدخول',
  loading_button_label: 'جارٍ تسجيل الدخول...',
  social_provider_text: 'المتابعة عبر {{provider}}',
  link_text: 'هل لديك حساب بالفعل؟ تسجيل الدخول'
}

const ar_magic_link = {
  email_input_label: 'عنوان البريد الإلكتروني',
  email_input_placeholder: 'الرجاء إدخال عنوان البريد الإلكتروني',
  button_label: 'تسجيل الدخول',
  loading_button_label: 'جارٍ تسجيل الدخول...',
  link_text: 'إرسال بريد إلكتروني برابط سحري',
  confirmation_text: 'يرجى التحقق من بريدك الإلكتروني للحصول على رابط التأكيد'
}

const ar_forgotten_password = {
  email_label: 'عنوان البريد الإلكتروني',
  password_label: 'كلمة المرور',
  email_input_placeholder: 'الرجاء إدخال عنوان البريد الإلكتروني',
  button_label: 'إرسال أمر إعادة تعيين كلمة المرور',
  loading_button_label: 'جارٍ إرسال أمر إعادة تعيين كلمة المرور...',
  link_text: 'نسيت كلمة المرور؟',
  confirmation_text:
    'يرجى التحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور'
}

const ar_update_password = {
  password_label: 'كلمة المرور الجديدة',
  password_input_placeholder: 'الرجاء إدخال كلمة مرور جديدة',
  button_label: 'تحديث كلمة المرور',
  loading_button_label: 'جارٍ تحديث كلمة المرور...',
  confirmation_text: 'تم تحديث كلمة المرور بنجاح'
}

const ar_verify_otp = {
  email_input_label: 'عنوان البريد الإلكتروني',
  email_input_placeholder: 'الرجاء إدخال عنوان البريد الإلكتروني',
  phone_input_label: 'رقم الهاتف',
  phone_input_placeholder: 'الرجاء إدخال رقم الهاتف',
  token_input_label: 'الرمز السري',
  token_input_placeholder: 'الرجاء إدخال الرمز السري لمرة واحدة',
  button_label: 'تحقق من الرمز السري',
  loading_button_label: 'جارٍ تسجيل الدخول...'
}

const ar = {
  sign_up: ar_sign_up,
  sign_in: ar_sign_in,
  magic_link: ar_magic_link,
  forgotten_password: ar_forgotten_password,
  update_password: ar_update_password,
  verify_otp: ar_verify_otp
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
    ar: cloneDeep(ar),
    availableLocales,
    toggleLocales
  }
}

export { useLanguage }

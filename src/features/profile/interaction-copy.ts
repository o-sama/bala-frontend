import type { SupportedLanguage } from "@/features/profile/translations"

interface InteractionCopy {
  recordedReaction: string
  medicineNotes: string
  speechError: string
  noVoice: string
  voice: string
  automaticVoice: string
}

export const interactionCopy: Record<SupportedLanguage, InteractionCopy> = {
  en: {
    recordedReaction: "Recorded reaction", medicineNotes: "Profile notes",
    speechError: "Reading could not start or was interrupted. Try again, or use the written profile.",
    noVoice: "No matching voice is available. Install a voice for this language in your device settings, then try again.",
    voice: "Reading voice", automaticVoice: "Automatic",
  },
  fr: {
    recordedReaction: "Réaction signalée", medicineNotes: "Notes du profil",
    speechError: "La lecture n’a pas pu démarrer ou a été interrompue. Réessayez ou consultez le profil écrit.",
    noVoice: "Aucune voix correspondante. Installez une voix pour cette langue dans les paramètres de votre appareil, puis réessayez.",
    voice: "Voix de lecture", automaticVoice: "Automatique",
  },
  es: {
    recordedReaction: "Reacción registrada", medicineNotes: "Notas del perfil",
    speechError: "La lectura no pudo iniciarse o se interrumpió. Inténtelo de nuevo o consulte el perfil escrito.",
    noVoice: "No hay una voz disponible para este idioma. Instálela en los ajustes del dispositivo e inténtelo de nuevo.",
    voice: "Voz de lectura", automaticVoice: "Automática",
  },
  ar: {
    recordedReaction: "رد الفعل المسجّل", medicineNotes: "ملاحظات الملف",
    speechError: "تعذّر بدء القراءة أو توقفت. حاول مجددًا أو استخدم الملف المكتوب.",
    noVoice: "لا يوجد صوت متاح لهذه اللغة. ثبّت صوتًا لهذه اللغة في إعدادات جهازك ثم حاول مجددًا.",
    voice: "صوت القراءة", automaticVoice: "تلقائي",
  },
  tr: {
    recordedReaction: "Kaydedilen reaksiyon", medicineNotes: "Profil notları",
    speechError: "Okuma başlatılamadı veya kesildi. Tekrar deneyin ya da yazılı profili kullanın.",
    noVoice: "Bu dil için ses bulunamadı. Cihaz ayarlarından bu dil için bir ses yükleyip tekrar deneyin.",
    voice: "Okuma sesi", automaticVoice: "Otomatik",
  },
}

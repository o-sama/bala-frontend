import type {
  AllergenFamilyId,
  DietaryConditionId,
  FoodId,
  MedicineAllergyId,
  SensitivityId,
} from "@/features/profile/profile-data"

export const supportedLanguages = ["en", "fr", "es", "ar", "tr"] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

interface Copy {
  languageName: string
  locale: string
  direction: "ltr" | "rtl"
  allergyProfile: string
  shareWithKitchen: string
  foodAllergies: string
  profileHeading: string
  profileIntro: string
  showToStaff: string
  preparationHeading: string
  avoidCrossContact: string
  cannotAccommodate: string
  unlistedNotice: string
  profileOwner: string
  updated: string
  staffEyebrow: string
  staffHeading: string
  back: string
  thankYou: string
  staffAllergiesHeading: string
  staffAvoidanceInstruction: string
  sensitivitiesHeading: string
  sensitivitiesStaffHeading: string
  avoidIfPossible: string
  sensitivityExplanation: string
  medicineAllergiesHeading: string
  medicineAllergiesStaffHeading: string
  medicineAllergyExplanation: string
  medicineEmergencyInstruction: string
  strictlyGlutenFree: string
  celiacStaffHeading: string
  celiacExplanation: string
  celiacAvoidanceInstruction: string
  families: Record<AllergenFamilyId, string>
  foods: Record<FoodId, string>
  sensitivities: Record<SensitivityId, string>
  medicines: Record<MedicineAllergyId, string>
  dietaryConditions: Record<DietaryConditionId, string>
}

export const translations: Record<SupportedLanguage, Copy> = {
  en: {
    languageName: "English",
    locale: "en-CA",
    direction: "ltr",
    allergyProfile: "Allergy profile",
    shareWithKitchen: "Share with your kitchen",
    foodAllergies: "Food allergies",
    profileHeading: "Please check my food allergies.",
    profileIntro: "Please check these specific ingredients before preparing or serving my food.",
    showToStaff: "Show to staff",
    preparationHeading: "When preparing my food",
    avoidCrossContact: "Please avoid these ingredients and cross-contact with them.",
    cannotAccommodate: "Tell me if my meal cannot be prepared to meet these needs.",
    unlistedNotice: "Foods not listed here have not been marked as safe.",
    profileOwner: "Profile owner",
    updated: "Updated",
    staffEyebrow: "Please show the kitchen",
    staffHeading: "I am allergic to these foods.",
    back: "Back",
    thankYou: "Thank you for checking.",
    staffAllergiesHeading: "Allergies — strict avoidance",
    staffAvoidanceInstruction: "Avoid ingredients and cross-contact",
    sensitivitiesHeading: "Sensitivities (not allergies)",
    sensitivitiesStaffHeading: "Sensitivities — avoid if possible",
    avoidIfPossible: "Avoid if possible",
    sensitivityExplanation: "These are preferences for comfort and are not food allergies.",
    medicineAllergiesHeading: "Medicine allergies",
    medicineAllergiesStaffHeading: "Medicine allergy — do not administer",
    medicineAllergyExplanation: "These medicine allergies are separate from food allergies.",
    medicineEmergencyInstruction: "Tell medical personnel in an emergency.",
    strictlyGlutenFree: "Strictly gluten-free",
    celiacStaffHeading: "Celiac disease — strict gluten-free",
    celiacExplanation: "This is an autoimmune condition, not a food allergy or sensitivity.",
    celiacAvoidanceInstruction: "Avoid wheat, barley, rye, and cross-contact with gluten.",
    families: { "tree-nuts": "Tree nut allergies", legumes: "Peanut allergy" },
    foods: {
      walnut: "Walnuts",
      cashew: "Cashews",
      pistachio: "Pistachios",
      almond: "Almonds",
      hazelnut: "Hazelnuts",
      pecan: "Pecans",
      "brazil-nut": "Brazil nuts",
      "macadamia-nut": "Macadamia nuts",
      peanut: "Peanuts",
    },
    sensitivities: { lactose: "Lactose" },
    medicines: { penicillin: "Penicillin" },
    dietaryConditions: { celiac: "Celiac disease" },
  },
  fr: {
    languageName: "Français",
    locale: "fr-CA",
    direction: "ltr",
    allergyProfile: "Profil d’allergies",
    shareWithKitchen: "À partager avec la cuisine",
    foodAllergies: "Allergies alimentaires",
    profileHeading: "Veuillez vérifier mes allergies alimentaires.",
    profileIntro: "Veuillez vérifier ces ingrédients précis avant de préparer ou de servir mon repas.",
    showToStaff: "Montrer au personnel",
    preparationHeading: "Lors de la préparation",
    avoidCrossContact: "Veuillez éviter ces ingrédients et tout contact croisé avec ceux-ci.",
    cannotAccommodate: "Dites-moi si mon repas ne peut pas être préparé selon ces besoins.",
    unlistedNotice: "Les aliments absents de cette liste ne sont pas indiqués comme sûrs.",
    profileOwner: "Titulaire du profil",
    updated: "Mis à jour",
    staffEyebrow: "Veuillez montrer à la cuisine",
    staffHeading: "Je suis allergique à ces aliments.",
    back: "Retour",
    thankYou: "Merci d’avoir vérifié.",
    staffAllergiesHeading: "Allergies — évitement strict",
    staffAvoidanceInstruction: "Éviter les ingrédients et tout contact croisé",
    sensitivitiesHeading: "Sensibilités (pas des allergies)",
    sensitivitiesStaffHeading: "Sensibilités — à éviter si possible",
    avoidIfPossible: "À éviter si possible",
    sensitivityExplanation: "Ce sont des préférences pour le confort et non des allergies alimentaires.",
    medicineAllergiesHeading: "Allergies médicamenteuses",
    medicineAllergiesStaffHeading: "Allergie médicamenteuse — ne pas administrer",
    medicineAllergyExplanation: "Ces allergies médicamenteuses sont distinctes des allergies alimentaires.",
    medicineEmergencyInstruction: "À signaler au personnel médical en cas d’urgence.",
    strictlyGlutenFree: "Strictement sans gluten",
    celiacStaffHeading: "Maladie cœliaque — sans gluten strict",
    celiacExplanation: "Il s’agit d’une maladie auto-immune, et non d’une allergie ou sensibilité alimentaire.",
    celiacAvoidanceInstruction: "Éviter le blé, l’orge, le seigle et tout contact croisé avec le gluten.",
    families: { "tree-nuts": "Allergies aux noix", legumes: "Allergie aux arachides" },
    foods: {
      walnut: "Noix de Grenoble",
      cashew: "Noix de cajou",
      pistachio: "Pistaches",
      almond: "Amandes",
      hazelnut: "Noisettes",
      pecan: "Noix de pécan",
      "brazil-nut": "Noix du Brésil",
      "macadamia-nut": "Noix de macadamia",
      peanut: "Arachides",
    },
    sensitivities: { lactose: "Lactose" },
    medicines: { penicillin: "Pénicilline" },
    dietaryConditions: { celiac: "Maladie cœliaque" },
  },
  es: {
    languageName: "Español",
    locale: "es",
    direction: "ltr",
    allergyProfile: "Perfil de alergias",
    shareWithKitchen: "Compartir con la cocina",
    foodAllergies: "Alergias alimentarias",
    profileHeading: "Por favor, revise mis alergias alimentarias.",
    profileIntro: "Revise estos ingredientes específicos antes de preparar o servir mi comida.",
    showToStaff: "Mostrar al personal",
    preparationHeading: "Al preparar mi comida",
    avoidCrossContact: "Evite estos ingredientes y el contacto cruzado con ellos.",
    cannotAccommodate: "Dígame si mi comida no puede prepararse de acuerdo con estas necesidades.",
    unlistedNotice: "Los alimentos que no aparecen aquí no se han marcado como seguros.",
    profileOwner: "Titular del perfil",
    updated: "Actualizado",
    staffEyebrow: "Muestre esto a la cocina",
    staffHeading: "Soy alérgico a estos alimentos.",
    back: "Volver",
    thankYou: "Gracias por comprobarlo.",
    staffAllergiesHeading: "Alergias — evitación estricta",
    staffAvoidanceInstruction: "Evite los ingredientes y el contacto cruzado",
    sensitivitiesHeading: "Sensibilidades (no son alergias)",
    sensitivitiesStaffHeading: "Sensibilidades — evitar si es posible",
    avoidIfPossible: "Evitar si es posible",
    sensitivityExplanation: "Son preferencias para mayor comodidad y no son alergias alimentarias.",
    medicineAllergiesHeading: "Alergias a medicamentos",
    medicineAllergiesStaffHeading: "Alergia a medicamentos — no administrar",
    medicineAllergyExplanation: "Estas alergias a medicamentos son distintas de las alergias alimentarias.",
    medicineEmergencyInstruction: "Informe al personal médico en caso de emergencia.",
    strictlyGlutenFree: "Estrictamente sin gluten",
    celiacStaffHeading: "Enfermedad celíaca — sin gluten estricto",
    celiacExplanation: "Es una enfermedad autoinmune, no una alergia ni sensibilidad alimentaria.",
    celiacAvoidanceInstruction: "Evite el trigo, la cebada, el centeno y el contacto cruzado con gluten.",
    families: { "tree-nuts": "Alergias a frutos de cáscara", legumes: "Alergia al cacahuete" },
    foods: {
      walnut: "Nueces",
      cashew: "Anacardos",
      pistachio: "Pistachos",
      almond: "Almendras",
      hazelnut: "Avellanas",
      pecan: "Nueces pecanas",
      "brazil-nut": "Nueces de Brasil",
      "macadamia-nut": "Nueces de macadamia",
      peanut: "Cacahuetes",
    },
    sensitivities: { lactose: "Lactosa" },
    medicines: { penicillin: "Penicilina" },
    dietaryConditions: { celiac: "Enfermedad celíaca" },
  },
  ar: {
    languageName: "العربية",
    locale: "ar",
    direction: "rtl",
    allergyProfile: "ملف الحساسية",
    shareWithKitchen: "اعرضه على المطبخ",
    foodAllergies: "حساسيات الطعام",
    profileHeading: "يرجى التحقق من حساسياتي الغذائية.",
    profileIntro: "يرجى التحقق من هذه المكونات المحددة قبل تحضير طعامي أو تقديمه.",
    showToStaff: "اعرض على الطاقم",
    preparationHeading: "عند تحضير طعامي",
    avoidCrossContact: "يرجى تجنّب هذه المكونات ومنع التلامس العرضي معها.",
    cannotAccommodate: "أخبرني إذا تعذّر تحضير وجبتي وفق هذه الاحتياجات.",
    unlistedNotice: "الأطعمة غير المذكورة هنا لم تُحدَّد على أنها آمنة.",
    profileOwner: "صاحب الملف",
    updated: "آخر تحديث",
    staffEyebrow: "يرجى عرضه على المطبخ",
    staffHeading: "لدي حساسية تجاه هذه الأطعمة.",
    back: "رجوع",
    thankYou: "شكرًا لتحققكم.",
    staffAllergiesHeading: "الحساسية — تجنّب تام",
    staffAvoidanceInstruction: "تجنّب المكونات والتلامس العرضي",
    sensitivitiesHeading: "أطعمة تسبب انزعاجًا (ليست حساسية)",
    sensitivitiesStaffHeading: "أطعمة تسبب انزعاجًا — تجنّبها إن أمكن",
    avoidIfPossible: "تجنّبها إن أمكن",
    sensitivityExplanation: "قد تسبب هذه الأطعمة انزعاجًا، لكنها ليست حساسية غذائية.",
    medicineAllergiesHeading: "حساسية الأدوية",
    medicineAllergiesStaffHeading: "حساسية دوائية — يُمنع إعطاؤه",
    medicineAllergyExplanation: "حساسية الأدوية منفصلة عن حساسية الطعام.",
    medicineEmergencyInstruction: "يُرجى إبلاغ الطاقم الطبي في حالة الطوارئ.",
    strictlyGlutenFree: "خالٍ تمامًا من الغلوتين",
    celiacStaffHeading: "الداء البطني — خالٍ تمامًا من الغلوتين",
    celiacExplanation: "هذه حالة مناعية ذاتية وليست حساسية أو تحسسًا غذائيًا.",
    celiacAvoidanceInstruction: "تجنّب القمح والشعير والجاودار وأي تلامس عرضي مع الغلوتين.",
    families: { "tree-nuts": "حساسية المكسرات الشجرية", legumes: "حساسية الفول السوداني" },
    foods: {
      walnut: "الجوز",
      cashew: "الكاجو",
      pistachio: "الفستق",
      almond: "اللوز",
      hazelnut: "البندق",
      pecan: "جوز البقان",
      "brazil-nut": "الجوز البرازيلي",
      "macadamia-nut": "جوز المكاديميا",
      peanut: "الفول السوداني",
    },
    sensitivities: { lactose: "اللاكتوز" },
    medicines: { penicillin: "البنسلين" },
    dietaryConditions: { celiac: "الداء البطني (السيلياك)" },
  },
  tr: {
    languageName: "Türkçe",
    locale: "tr-TR",
    direction: "ltr",
    allergyProfile: "Alerji profili",
    shareWithKitchen: "Mutfakla paylaşın",
    foodAllergies: "Gıda alerjileri",
    profileHeading: "Lütfen gıda alerjilerimi kontrol edin.",
    profileIntro: "Yemeğimi hazırlamadan veya servis etmeden önce lütfen bu belirli malzemeleri kontrol edin.",
    showToStaff: "Personele göster",
    preparationHeading: "Yemeğimi hazırlarken",
    avoidCrossContact: "Lütfen bu malzemelerden ve bunlarla çapraz temastan kaçının.",
    cannotAccommodate: "Yemeğim bu ihtiyaçlara uygun olarak hazırlanamayacaksa lütfen bana söyleyin.",
    unlistedNotice: "Burada listelenmeyen yiyecekler güvenli olarak işaretlenmemiştir.",
    profileOwner: "Profil sahibi",
    updated: "Güncellendi",
    staffEyebrow: "Lütfen mutfağa gösterin",
    staffHeading: "Bu yiyeceklere alerjim var.",
    back: "Geri",
    thankYou: "Kontrol ettiğiniz için teşekkür ederim.",
    staffAllergiesHeading: "Alerjiler — kesinlikle kaçının",
    staffAvoidanceInstruction: "Malzemelerden ve çapraz temastan kaçının",
    sensitivitiesHeading: "Hassasiyetler (alerji değildir)",
    sensitivitiesStaffHeading: "Hassasiyetler — mümkünse kaçının",
    avoidIfPossible: "Mümkünse kaçının",
    sensitivityExplanation: "Bunlar rahatlık amaçlı tercihlerdir ve gıda alerjisi değildir.",
    medicineAllergiesHeading: "İlaç alerjileri",
    medicineAllergiesStaffHeading: "İlaç alerjisi — uygulamayın",
    medicineAllergyExplanation: "Bu ilaç alerjileri gıda alerjilerinden ayrıdır.",
    medicineEmergencyInstruction: "Acil durumda sağlık personeline bildirin.",
    strictlyGlutenFree: "Kesinlikle glütensiz",
    celiacStaffHeading: "Çölyak hastalığı — kesinlikle glütensiz",
    celiacExplanation: "Bu, gıda alerjisi veya hassasiyeti değil, otoimmün bir hastalıktır.",
    celiacAvoidanceInstruction: "Buğday, arpa, çavdar ve glütenle çapraz temastan kaçının.",
    families: { "tree-nuts": "Ağaç yemişi alerjileri", legumes: "Yer fıstığı alerjisi" },
    foods: {
      walnut: "Ceviz",
      cashew: "Kaju",
      pistachio: "Antep fıstığı",
      almond: "Badem",
      hazelnut: "Fındık",
      pecan: "Pekan cevizi",
      "brazil-nut": "Brezilya cevizi",
      "macadamia-nut": "Makademya cevizi",
      peanut: "Yer fıstığı",
    },
    sensitivities: { lactose: "Laktoz" },
    medicines: { penicillin: "Penisilin" },
    dietaryConditions: { celiac: "Çölyak hastalığı" },
  },
}

export function detectLanguage(languages: readonly string[] = navigator.languages): SupportedLanguage {
  for (const browserLanguage of languages) {
    const languageCode = browserLanguage.toLowerCase().split("-")[0]
    const supportedLanguage = supportedLanguages.find(
      (language): language is Exclude<SupportedLanguage, "en"> => language !== "en" && language === languageCode,
    )

    if (supportedLanguage) return supportedLanguage
  }

  return "en"
}

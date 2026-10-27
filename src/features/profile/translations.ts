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
  foodAllergies: string
  profileHeading: string
  profileIntro: string
  showToStaff: string
  preparationHeading: string
  avoidCrossContact: string
  cannotAccommodate: string
  unlistedNotice: string
  lastUpdated: string
  staffEyebrow: string
  staffHeading: string
  medicalStaffEyebrow: string
  medicineStaffIntro: string
  medicineAlternativeInstruction: string
  back: string
  thankYou: string
  staffAllergiesHeading: string
  staffAvoidanceInstruction: string
  strictAvoidance: string
  sensitivitiesHeading: string
  sensitivitiesStaffHeading: string
  avoidIfPossible: string
  sensitivityExplanation: string
  medicineAllergiesHeading: string
  medicineAllergiesStaffHeading: string
  medicineAllergyExplanation: string
  medicineEmergencyInstruction: string
  drugFamily: string
  alsoKnownAs: string
  medicineDetails: Record<MedicineAllergyId, { drugFamily: string; alternateNames: string }>
  communicationTools: string
  readAloud: string
  stopReading: string
  largeText: string
  emergencyInformation: string
  emergencyServicesInstruction: string
  carriesEpinephrine: string
  location: string
  emergencyContact: string
  openEmergencyPlan: string
  staffChecklistHeading: string
  staffChecklistIntro: string
  staffChecklistItems: Record<"ingredients" | "equipment" | "crossContact" | "finalCheck", string>
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
    foodAllergies: "Food allergies",
    profileHeading: "Please check my food allergies.",
    profileIntro: "Please check these specific ingredients before preparing or serving my food.",
    showToStaff: "Show to staff",
    preparationHeading: "When preparing my food",
    avoidCrossContact: "Please avoid these ingredients and cross-contact with them.",
    cannotAccommodate: "Tell me if my meal cannot be prepared to meet these needs.",
    unlistedNotice: "Foods not listed here have not been marked as safe.",
    lastUpdated: "Last updated",
    staffEyebrow: "Please show the kitchen",
    staffHeading: "I am allergic to these foods.",
    medicalStaffEyebrow: "Please show medical personnel",
    medicineStaffIntro: "I am allergic to these medicines.",
    medicineAlternativeInstruction: "Do not administer the listed medicine. Confirm a safe alternative with qualified medical personnel.",
    back: "Back",
    thankYou: "Thank you for checking.",
    staffAllergiesHeading: "Allergies — strict avoidance",
    staffAvoidanceInstruction: "Avoid ingredients and cross-contact",
    strictAvoidance: "Strict avoidance",
    sensitivitiesHeading: "Sensitivities (not allergies)",
    sensitivitiesStaffHeading: "Sensitivities — avoid if possible",
    avoidIfPossible: "Avoid if possible",
    sensitivityExplanation: "These are preferences for comfort and are not food allergies.",
    medicineAllergiesHeading: "Medicine allergies",
    medicineAllergiesStaffHeading: "Medicine allergy — do not administer",
    medicineAllergyExplanation: "These medicine allergies are separate from food allergies.",
    medicineEmergencyInstruction: "Tell medical personnel in an emergency.",
    drugFamily: "Drug family",
    alsoKnownAs: "Also recorded as",
    medicineDetails: { penicillin: { drugFamily: "Penicillin antibiotics", alternateNames: "Penicillin G, penicillin V" } },
    communicationTools: "Communication tools",
    readAloud: "Read aloud",
    stopReading: "Stop reading",
    largeText: "Large text",
    emergencyInformation: "Emergency information",
    emergencyServicesInstruction: "Call local emergency services first in an emergency.",
    carriesEpinephrine: "Carries epinephrine",
    location: "Location",
    emergencyContact: "Emergency contact",
    openEmergencyPlan: "Open emergency care plan",
    staffChecklistHeading: "Safe preparation checklist",
    staffChecklistIntro: "Please complete each step before serving.",
    staffChecklistItems: {
      ingredients: "Check every ingredient and label for the listed allergens.",
      equipment: "Use clean gloves, utensils, cookware, and preparation surfaces.",
      crossContact: "Keep the meal away from shared fryers, grills, toasters, and serving utensils.",
      finalCheck: "Confirm the finished meal and garnishes before serving.",
    },
    strictlyGlutenFree: "Strictly gluten-free",
    celiacStaffHeading: "Celiac disease — strict gluten-free",
    celiacExplanation: "Serious autoimmune condition. Even small amounts of gluten or cross-contact can make food unsafe.",
    celiacAvoidanceInstruction: "Avoid wheat, barley, rye, and cross-contact with gluten.",
    families: { "tree-nuts": "Tree nut allergies", legumes: "Legume allergies" },
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
      soy: "Soy",
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
    foodAllergies: "Allergies alimentaires",
    profileHeading: "Veuillez vérifier mes allergies alimentaires.",
    profileIntro: "Veuillez vérifier ces ingrédients précis avant de préparer ou de servir mon repas.",
    showToStaff: "Montrer au personnel",
    preparationHeading: "Lors de la préparation",
    avoidCrossContact: "Veuillez éviter ces ingrédients et tout contact croisé avec ceux-ci.",
    cannotAccommodate: "Dites-moi si mon repas ne peut pas être préparé selon ces besoins.",
    unlistedNotice: "Les aliments absents de cette liste ne sont pas indiqués comme sûrs.",
    lastUpdated: "Dernière mise à jour",
    staffEyebrow: "Veuillez montrer à la cuisine",
    staffHeading: "Je suis allergique à ces aliments.",
    medicalStaffEyebrow: "Veuillez montrer au personnel médical",
    medicineStaffIntro: "Je suis allergique à ces médicaments.",
    medicineAlternativeInstruction: "Ne pas administrer le médicament indiqué. Confirmer une solution sûre avec du personnel médical qualifié.",
    back: "Retour",
    thankYou: "Merci d’avoir vérifié.",
    staffAllergiesHeading: "Allergies — évitement strict",
    staffAvoidanceInstruction: "Éviter les ingrédients et tout contact croisé",
    strictAvoidance: "Évitement strict",
    sensitivitiesHeading: "Sensibilités (pas des allergies)",
    sensitivitiesStaffHeading: "Sensibilités — à éviter si possible",
    avoidIfPossible: "À éviter si possible",
    sensitivityExplanation: "Ce sont des préférences pour le confort et non des allergies alimentaires.",
    medicineAllergiesHeading: "Allergies médicamenteuses",
    medicineAllergiesStaffHeading: "Allergie médicamenteuse — ne pas administrer",
    medicineAllergyExplanation: "Ces allergies médicamenteuses sont distinctes des allergies alimentaires.",
    medicineEmergencyInstruction: "À signaler au personnel médical en cas d’urgence.",
    drugFamily: "Famille de médicaments",
    alsoKnownAs: "Aussi indiqué comme",
    medicineDetails: { penicillin: { drugFamily: "Antibiotiques pénicillines", alternateNames: "Pénicilline G, pénicilline V" } },
    communicationTools: "Outils de communication",
    readAloud: "Lire à voix haute",
    stopReading: "Arrêter la lecture",
    largeText: "Grand texte",
    emergencyInformation: "Renseignements d’urgence",
    emergencyServicesInstruction: "En cas d’urgence, appelez d’abord les services d’urgence locaux.",
    carriesEpinephrine: "Porte de l’épinéphrine",
    location: "Emplacement",
    emergencyContact: "Personne à contacter en cas d’urgence",
    openEmergencyPlan: "Ouvrir le plan de soins d’urgence",
    staffChecklistHeading: "Liste de préparation sécuritaire",
    staffChecklistIntro: "Veuillez effectuer chaque étape avant de servir.",
    staffChecklistItems: {
      ingredients: "Vérifier chaque ingrédient et chaque étiquette pour les allergènes indiqués.",
      equipment: "Utiliser des gants, ustensiles, récipients et surfaces de préparation propres.",
      crossContact: "Éloigner le repas des friteuses, grils, grille-pain et ustensiles de service partagés.",
      finalCheck: "Vérifier le repas terminé et les garnitures avant de servir.",
    },
    strictlyGlutenFree: "Strictement sans gluten",
    celiacStaffHeading: "Maladie cœliaque — sans gluten strict",
    celiacExplanation: "Maladie auto-immune grave. Même de petites quantités de gluten ou un contact croisé peuvent rendre un aliment dangereux.",
    celiacAvoidanceInstruction: "Éviter le blé, l’orge, le seigle et tout contact croisé avec le gluten.",
    families: { "tree-nuts": "Allergies aux noix", legumes: "Allergies aux légumineuses" },
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
      soy: "Soja",
    },
    sensitivities: { lactose: "Lactose" },
    medicines: { penicillin: "Pénicilline" },
    dietaryConditions: { celiac: "Maladie cœliaque" },
  },
  es: {
    languageName: "Español",
    locale: "es-ES",
    direction: "ltr",
    allergyProfile: "Perfil de alergias",
    foodAllergies: "Alergias alimentarias",
    profileHeading: "Por favor, revise mis alergias alimentarias.",
    profileIntro: "Revise estos ingredientes específicos antes de preparar o servir mi comida.",
    showToStaff: "Mostrar al personal",
    preparationHeading: "Al preparar mi comida",
    avoidCrossContact: "Evite estos ingredientes y el contacto cruzado con ellos.",
    cannotAccommodate: "Dígame si mi comida no puede prepararse de acuerdo con estas necesidades.",
    unlistedNotice: "Los alimentos que no aparecen aquí no se han marcado como seguros.",
    lastUpdated: "Última actualización",
    staffEyebrow: "Muestre esto a la cocina",
    staffHeading: "Soy alérgico a estos alimentos.",
    medicalStaffEyebrow: "Muestre esto al personal médico",
    medicineStaffIntro: "Soy alérgico a estos medicamentos.",
    medicineAlternativeInstruction: "No administre el medicamento indicado. Confirme una alternativa segura con personal médico cualificado.",
    back: "Volver",
    thankYou: "Gracias por comprobarlo.",
    staffAllergiesHeading: "Alergias — evitación estricta",
    staffAvoidanceInstruction: "Evite los ingredientes y el contacto cruzado",
    strictAvoidance: "Evitación estricta",
    sensitivitiesHeading: "Sensibilidades (no son alergias)",
    sensitivitiesStaffHeading: "Sensibilidades — evitar si es posible",
    avoidIfPossible: "Evitar si es posible",
    sensitivityExplanation: "Son preferencias para mayor comodidad y no son alergias alimentarias.",
    medicineAllergiesHeading: "Alergias a medicamentos",
    medicineAllergiesStaffHeading: "Alergia a medicamentos — no administrar",
    medicineAllergyExplanation: "Estas alergias a medicamentos son distintas de las alergias alimentarias.",
    medicineEmergencyInstruction: "Informe al personal médico en caso de emergencia.",
    drugFamily: "Familia del medicamento",
    alsoKnownAs: "También registrado como",
    medicineDetails: { penicillin: { drugFamily: "Antibióticos de penicilina", alternateNames: "Penicilina G, penicilina V" } },
    communicationTools: "Herramientas de comunicación",
    readAloud: "Leer en voz alta",
    stopReading: "Detener lectura",
    largeText: "Texto grande",
    emergencyInformation: "Información de emergencia",
    emergencyServicesInstruction: "En una emergencia, llame primero a los servicios de emergencia locales.",
    carriesEpinephrine: "Lleva epinefrina",
    location: "Ubicación",
    emergencyContact: "Contacto de emergencia",
    openEmergencyPlan: "Abrir el plan de atención de emergencia",
    staffChecklistHeading: "Lista de preparación segura",
    staffChecklistIntro: "Complete cada paso antes de servir.",
    staffChecklistItems: {
      ingredients: "Revise cada ingrediente y etiqueta para detectar los alérgenos indicados.",
      equipment: "Use guantes, utensilios, recipientes y superficies de preparación limpios.",
      crossContact: "Mantenga la comida alejada de freidoras, parrillas, tostadoras y utensilios compartidos.",
      finalCheck: "Confirme la comida terminada y sus guarniciones antes de servir.",
    },
    strictlyGlutenFree: "Estrictamente sin gluten",
    celiacStaffHeading: "Enfermedad celíaca — sin gluten estricto",
    celiacExplanation: "Enfermedad autoinmune grave. Incluso pequeñas cantidades de gluten o el contacto cruzado pueden hacer que un alimento no sea seguro.",
    celiacAvoidanceInstruction: "Evite el trigo, la cebada, el centeno y el contacto cruzado con gluten.",
    families: { "tree-nuts": "Alergias a frutos de cáscara", legumes: "Alergias a las legumbres" },
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
      soy: "Soja",
    },
    sensitivities: { lactose: "Lactosa" },
    medicines: { penicillin: "Penicilina" },
    dietaryConditions: { celiac: "Enfermedad celíaca" },
  },
  ar: {
    languageName: "العربية",
    locale: "ar-SA",
    direction: "rtl",
    allergyProfile: "ملف الحساسية",
    foodAllergies: "حساسيات الطعام",
    profileHeading: "يرجى التحقق من حساسياتي الغذائية.",
    profileIntro: "يرجى التحقق من هذه المكونات المحددة قبل تحضير طعامي أو تقديمه.",
    showToStaff: "اعرض على الطاقم",
    preparationHeading: "عند تحضير طعامي",
    avoidCrossContact: "يرجى تجنّب هذه المكونات ومنع التلامس العرضي معها.",
    cannotAccommodate: "أخبرني إذا تعذّر تحضير وجبتي وفق هذه الاحتياجات.",
    unlistedNotice: "الأطعمة غير المذكورة هنا لم تُحدَّد على أنها آمنة.",
    lastUpdated: "آخر تحديث",
    staffEyebrow: "يرجى عرضه على المطبخ",
    staffHeading: "لدي حساسية تجاه هذه الأطعمة.",
    medicalStaffEyebrow: "يرجى عرضه على الطاقم الطبي",
    medicineStaffIntro: "لدي حساسية تجاه هذه الأدوية.",
    medicineAlternativeInstruction: "لا تُعطِ الدواء المذكور. تأكد من بديل آمن مع طاقم طبي مؤهل.",
    back: "رجوع",
    thankYou: "شكرًا لتحققكم.",
    staffAllergiesHeading: "الحساسية — تجنّب تام",
    staffAvoidanceInstruction: "تجنّب المكونات والتلامس العرضي",
    strictAvoidance: "تجنّب تام",
    sensitivitiesHeading: "أطعمة تسبب انزعاجًا (ليست حساسية)",
    sensitivitiesStaffHeading: "أطعمة تسبب انزعاجًا — تجنّبها إن أمكن",
    avoidIfPossible: "تجنّبها إن أمكن",
    sensitivityExplanation: "قد تسبب هذه الأطعمة انزعاجًا، لكنها ليست حساسية غذائية.",
    medicineAllergiesHeading: "حساسية الأدوية",
    medicineAllergiesStaffHeading: "حساسية دوائية — يُمنع إعطاؤه",
    medicineAllergyExplanation: "حساسية الأدوية منفصلة عن حساسية الطعام.",
    medicineEmergencyInstruction: "يُرجى إبلاغ الطاقم الطبي في حالة الطوارئ.",
    drugFamily: "فئة الدواء",
    alsoKnownAs: "مسجل أيضًا باسم",
    medicineDetails: { penicillin: { drugFamily: "مضادات البنسلين الحيوية", alternateNames: "بنسلين G، بنسلين V" } },
    communicationTools: "أدوات التواصل",
    readAloud: "قراءة بصوت عالٍ",
    stopReading: "إيقاف القراءة",
    largeText: "نص كبير",
    emergencyInformation: "معلومات الطوارئ",
    emergencyServicesInstruction: "اتصل بخدمات الطوارئ المحلية أولاً في حالة الطوارئ.",
    carriesEpinephrine: "يحمل الإبينفرين",
    location: "المكان",
    emergencyContact: "جهة اتصال الطوارئ",
    openEmergencyPlan: "فتح خطة رعاية الطوارئ",
    staffChecklistHeading: "قائمة التحقق من التحضير الآمن",
    staffChecklistIntro: "يرجى إكمال كل خطوة قبل التقديم.",
    staffChecklistItems: {
      ingredients: "تحقق من كل مكوّن وملصق بحثًا عن مسببات الحساسية المذكورة.",
      equipment: "استخدم قفازات وأدوات وأواني وأسطح تحضير نظيفة.",
      crossContact: "أبعد الوجبة عن المقالي والشوايات والمحامص وأدوات التقديم المشتركة.",
      finalCheck: "تحقق من الوجبة النهائية والإضافات قبل التقديم.",
    },
    strictlyGlutenFree: "خالٍ تمامًا من الغلوتين",
    celiacStaffHeading: "الداء البطني — خالٍ تمامًا من الغلوتين",
    celiacExplanation: "حالة مناعية ذاتية خطيرة. حتى الكميات الصغيرة من الغلوتين أو التلامس العرضي قد تجعل الطعام غير آمن.",
    celiacAvoidanceInstruction: "تجنّب القمح والشعير والجاودار وأي تلامس عرضي مع الغلوتين.",
    families: { "tree-nuts": "حساسية المكسرات الشجرية", legumes: "حساسية البقوليات" },
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
      soy: "فول الصويا",
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
    foodAllergies: "Gıda alerjileri",
    profileHeading: "Lütfen gıda alerjilerimi kontrol edin.",
    profileIntro: "Yemeğimi hazırlamadan veya servis etmeden önce lütfen bu belirli malzemeleri kontrol edin.",
    showToStaff: "Personele göster",
    preparationHeading: "Yemeğimi hazırlarken",
    avoidCrossContact: "Lütfen bu malzemelerden ve bunlarla çapraz temastan kaçının.",
    cannotAccommodate: "Yemeğim bu ihtiyaçlara uygun olarak hazırlanamayacaksa lütfen bana söyleyin.",
    unlistedNotice: "Burada listelenmeyen yiyecekler güvenli olarak işaretlenmemiştir.",
    lastUpdated: "Son güncelleme",
    staffEyebrow: "Lütfen mutfağa gösterin",
    staffHeading: "Bu yiyeceklere alerjim var.",
    medicalStaffEyebrow: "Lütfen sağlık personeline gösterin",
    medicineStaffIntro: "Bu ilaçlara alerjim var.",
    medicineAlternativeInstruction: "Listelenen ilacı uygulamayın. Güvenli bir alternatifi yetkili sağlık personeliyle doğrulayın.",
    back: "Geri",
    thankYou: "Kontrol ettiğiniz için teşekkür ederim.",
    staffAllergiesHeading: "Alerjiler — kesinlikle kaçının",
    staffAvoidanceInstruction: "Malzemelerden ve çapraz temastan kaçının",
    strictAvoidance: "Kesinlikle kaçının",
    sensitivitiesHeading: "Hassasiyetler (alerji değildir)",
    sensitivitiesStaffHeading: "Hassasiyetler — mümkünse kaçının",
    avoidIfPossible: "Mümkünse kaçının",
    sensitivityExplanation: "Bunlar rahatlık amaçlı tercihlerdir ve gıda alerjisi değildir.",
    medicineAllergiesHeading: "İlaç alerjileri",
    medicineAllergiesStaffHeading: "İlaç alerjisi — uygulamayın",
    medicineAllergyExplanation: "Bu ilaç alerjileri gıda alerjilerinden ayrıdır.",
    medicineEmergencyInstruction: "Acil durumda sağlık personeline bildirin.",
    drugFamily: "İlaç ailesi",
    alsoKnownAs: "Diğer kayıtlı adları",
    medicineDetails: { penicillin: { drugFamily: "Penisilin antibiyotikleri", alternateNames: "Penisilin G, penisilin V" } },
    communicationTools: "İletişim araçları",
    readAloud: "Sesli oku",
    stopReading: "Okumayı durdur",
    largeText: "Büyük metin",
    emergencyInformation: "Acil durum bilgileri",
    emergencyServicesInstruction: "Acil durumda önce yerel acil servisleri arayın.",
    carriesEpinephrine: "Epinefrin taşıyor",
    location: "Konum",
    emergencyContact: "Acil durum kişisi",
    openEmergencyPlan: "Acil bakım planını aç",
    staffChecklistHeading: "Güvenli hazırlık kontrol listesi",
    staffChecklistIntro: "Servisten önce her adımı tamamlayın.",
    staffChecklistItems: {
      ingredients: "Listelenen alerjenler için her malzemeyi ve etiketi kontrol edin.",
      equipment: "Temiz eldiven, gereç, pişirme kabı ve hazırlık yüzeyi kullanın.",
      crossContact: "Yemeği ortak fritöz, ızgara, ekmek kızartma makinesi ve servis gereçlerinden uzak tutun.",
      finalCheck: "Servisten önce bitmiş yemeği ve garnitürleri kontrol edin.",
    },
    strictlyGlutenFree: "Kesinlikle glütensiz",
    celiacStaffHeading: "Çölyak hastalığı — kesinlikle glütensiz",
    celiacExplanation: "Ciddi bir otoimmün hastalıktır. Az miktarda glüten veya çapraz temas bile yiyeceği güvensiz hâle getirebilir.",
    celiacAvoidanceInstruction: "Buğday, arpa, çavdar ve glütenle çapraz temastan kaçının.",
    families: { "tree-nuts": "Ağaç yemişi alerjileri", legumes: "Baklagil alerjileri" },
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
      soy: "Soya",
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

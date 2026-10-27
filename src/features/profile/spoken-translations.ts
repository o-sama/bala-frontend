import type {
  DietaryConditionId,
  FoodId,
  MedicineAllergyId,
  SensitivityId,
} from "@/features/profile/profile-data"
import type { SupportedLanguage } from "@/features/profile/translations"

interface SpokenCopy {
  foodIntro: string
  medicineIntro: string
  foodListLabel: string
  celiacExplanation: string
  celiacAvoidanceInstruction: string
  avoidCrossContact: string
  medicineListLabel: string
  sensitivityListLabel: string
  emergencyInformation: string
  emergencyServicesInstruction: string
  carriesEpinephrine: string
  location: string
  cannotAccommodate: string
  medicineAlternativeInstruction: string
  foods: Partial<Record<FoodId, string>>
  sensitivities: Partial<Record<SensitivityId, string>>
  medicines: Partial<Record<MedicineAllergyId, string>>
  dietaryConditions: Partial<Record<DietaryConditionId, string>>
}

export const spokenTranslations: Partial<Record<SupportedLanguage, SpokenCopy>> = {
  ar: {
    foodIntro: "لَدَيَّ حَسَاسِيَّةٌ مِنَ الأَطْعِمَةِ التَّالِيَة.",
    medicineIntro: "لَدَيَّ حَسَاسِيَّةٌ مِنَ الأَدْوِيَةِ التَّالِيَة.",
    celiacExplanation: "حَالَةٌ مَنَاعِيَّةٌ ذَاتِيَّةٌ خَطِيرَة. حَتَّى الكَمِّيَّاتُ الصَّغِيرَةُ مِنَ الغُلُوتِين أَوِ التَّلَامُسُ العَرَضِيُّ قَدْ تَجْعَلُ الطَّعَامَ غَيْرَ آمِن.",
    celiacAvoidanceInstruction: "تَجَنَّبِ القَمْحَ وَالشَّعِيرَ وَالجَاوْدَارَ وَأَيَّ تَلَامُسٍ عَرَضِيٍّ مَعَ الغُلُوتِين.",
    avoidCrossContact: "يُرْجَى تَجَنُّبُ هَذِهِ المُكَوِّنَاتِ وَمَنْعُ التَّلَامُسِ العَرَضِيِّ مَعَهَا.",
    foodListLabel: "الأَطْعِمَةُ الَّتِي تُسَبِّبُ لِي الحَسَاسِيَّة",
    medicineListLabel: "الأَدْوِيَةُ الَّتِي تُسَبِّبُ لِي الحَسَاسِيَّة",
    sensitivityListLabel: "أَطْعِمَةٌ يُفَضَّلُ تَجَنُّبُهَا",
    emergencyInformation: "مَعْلُومَاتُ الطَّوَارِئ",
    emergencyServicesInstruction: "فِي حَالَةِ الطَّوَارِئ، اتَّصِلْ أَوَّلًا بِخَدَمَاتِ الطَّوَارِئِ المَحَلِّيَّة.",
    carriesEpinephrine: "أَحْمِلُ حَاقِنَ الإِبِينِفْرِين.",
    location: "مَكَانُهُ",
    cannotAccommodate: "أَخْبِرْنِي إِذَا لَمْ يَكُنْ مِنَ المُمْكِنِ تَحْضِيرُ وَجْبَتِي بِشَكْلٍ آمِن.",
    medicineAlternativeInstruction: "لَا تُعْطِنِي هَذَا الدَّوَاء. وَاسْأَلِ الطَّاقَمَ الطِّبِّيَّ المُؤَهَّلَ عَنْ بَدِيلٍ آمِن.",
    foods: {
      walnut: "الجَوْز",
      cashew: "الكَاجُو",
      pistachio: "الفُسْتُق",
      almond: "اللَّوْز",
      hazelnut: "البُنْدُق",
      pecan: "جَوْزُ البِقَان",
      "brazil-nut": "الجَوْزُ البَرَازِيلِي",
      "macadamia-nut": "جَوْزُ المَكَادِيمْيَا",
      peanut: "الفُولُ السُّودَانِي",
      soy: "فُولُ الصُّوْيَا",
    },
    sensitivities: { lactose: "اللَّاكْتُوز" },
    medicines: { penicillin: "البِنْسِلِين" },
    dietaryConditions: { celiac: "الدَّاءُ البَطْنِي، السِّيلِيَاك" },
  },
}

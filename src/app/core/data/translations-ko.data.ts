// Korean translations for the doctor-facing summary. Always shown, regardless
// of the patient's UI language. Seed dictionary — expand with professional
// medical review for full symptom coverage.

export const regionKo: Record<string, string> = {
  head: '머리', neck: '목', chest: '가슴', arm: '팔',
  abdomen: '복부', pelvis: '골반', back: '등', buttocks: '엉덩이', leg: '다리',
};

export const durationKo: Record<string, string> = {
  today: '오늘 시작됨',
  days1to3: '1-3일 됨',
  week: '약 1주일 됨',
  moreThanWeek: '1주일 이상 됨',
  moreThanMonth: '1달 이상 됨',
};

export const durationEn: Record<string, string> = {
  today: 'Just started (today)',
  days1to3: '1–3 days',
  week: 'About a week',
  moreThanWeek: 'More than a week',
  moreThanMonth: 'More than a month',
};

export const sideKo: Record<string, string> = { front: '앞면', back: '뒷면' };

/** Symptom Korean keyed by symptom id from symptoms.data.ts. Missing entries
 *  fall back to English only. */
export const symptomKo: Record<string, string> = {
  // head
  'headache': '두통', 'migraine-headache': '편두통', 'tension-headache': '긴장성 두통',
  'throbbing-headache': '욱신거리는 두통', 'severe-headache': '심한 두통',
  'dull-headache': '둔한 두통', 'sudden-severe-headache': '갑작스러운 심한 두통',
  'headache-in-back-of-head': '뒤통수 통증',
  'headache-on-one-side-of-head': '편측 두통',
  'headache-on-temples': '관자놀이 두통',
  'dizziness': '어지러움', 'vertigo': '현기증',
  'memory-loss': '기억 상실', 'confusion': '혼란', 'insomnia': '불면증',
  // neck
  'sore-throat': '인후통', 'stiff-neck': '목 뻣뻣함', 'cough': '기침',
  'trouble-swallowing': '삼킴 곤란', 'pain-when-i-swallow': '삼킬 때 통증',
  // chest
  'chest-pain': '흉통', 'sharp-chest-pain': '날카로운 흉통',
  'severe-chest-pain-pressure': '심한 흉통/압박감',
  'shortness-of-breath': '호흡 곤란', 'palpitations': '심계항진',
  'heartburn': '속쓰림', 'dry-cough': '마른 기침', 'wet-cough': '습한 기침',
  // arm
  'arm-pain': '팔 통증', 'shoulder-pain': '어깨 통증',
  'elbow-pain': '팔꿈치 통증', 'wrist-pain': '손목 통증', 'hand-is-numb': '손 저림',
  // abdomen
  'nausea': '메스꺼움',
  'upper-stomach-pain': '상복부 통증', 'lower-stomach-pain': '하복부 통증',
  'stomach-cramps': '복부 경련', 'diarrhea': '설사',
  'indigestion': '소화 불량', 'bloated-belly': '복부 팽만감', 'reflux': '역류',
  // pelvis
  'groin-pain': '사타구니 통증', 'hip-hurts': '고관절 통증',
  'hip-tenderness': '고관절 압통', 'pain-while-peeing': '배뇨 시 통증',
  // back
  'back-pain': '요통', 'low-back-pain': '하부 요통',
  'upper-back-pain': '상부 등 통증', 'severe-back-pain': '심한 요통',
  'stiff-back': '뻣뻣한 등', 'pain-in-tailbone': '꼬리뼈 통증',
  // buttocks
  'sciatic-nerve-pain': '좌골 신경통', 'constipation': '변비',
  'hemorrhoid': '치질', 'butt-pain': '엉덩이 통증',
  // leg
  'knee-hurts': '무릎 통증', 'leg-hurts': '다리 통증',
  'calf-pain': '종아리 통증', 'ankle-pain': '발목 통증', 'foot-hurts': '발 통증',
  'leg-cramp': '다리 경련', 'calf-muscle-cramp': '종아리 경련',
  // skin / general
  'rash-all-over': '전신 발진', 'rash-in-one-area': '국소 발진',
  'itching': '가려움', 'hives': '두드러기', 'bruise': '멍',
  'irritated-skin': '자극된 피부',
  'fever': '발열', 'chills': '오한', 'fatigue': '피로',
  'night-sweats': '식은땀', 'loss-of-appetite': '식욕 부진',
  'weight-loss': '체중 감소', 'weight-gain': '체중 증가',
  'numbness': '저림', 'muscle-cramp': '근육 경련',
  'pain-in-arm-or-leg': '팔/다리 통증',
};
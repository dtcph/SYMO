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

export const allergyKo: Record<string, string> = {
  'penicillin': '페니실린',
  'peanuts': '땅콩',
  'tree-nuts': '견과류',
  'shellfish': '갑각류',
  'fish': '생선',
  'eggs': '달걀',
  'milk': '우유 / 유제품',
  'soy': '대두',
  'wheat': '밀 / 글루텐',
  'sesame': '참깨',
  'aspirin': '아스피린',
  'nsaids': '비스테로이드성 소염진통제 (NSAIDs)',
  'sulfa': '설파제',
  'latex': '라텍스',
  'bee-stings': '벌침 / 곤충 침',
  'pollen': '꽃가루',
  'dust-mites': '집먼지진드기',
  'pet-dander': '동물 비듬',
  'mold': '곰팡이',
  'contrast-dye': '조영제 / 요오드',
};

export const medicationKo: Record<string, string> = {
  'aspirin': '아스피린',
  'ibuprofen': '이부프로펜',
  'acetaminophen': '아세트아미노펜 (타이레놀)',
  'metformin': '메트포르민 (당뇨약)',
  'lisinopril': '리시노프릴 (혈압약)',
  'amlodipine': '암로디핀 (혈압약)',
  'statin': '스타틴 (고지혈증약)',
  'levothyroxine': '레보티록신 (갑상선약)',
  'ppi': '양성자펌프억제제 (오메프라졸)',
  'inhaler': '천식 흡입기 (알부테롤)',
  'insulin': '인슐린',
  'blood-thinner': '항응고제 (와파린)',
  'antibiotic': '항생제',
  'antihistamine': '항히스타민제',
  'birth-control': '경구 피임약',
  'antidepressant': '항우울제 (SSRI)',
  'anxiety-med': '항불안제',
  'steroid': '스테로이드 (프레드니솔론)',
  'adhd-med': 'ADHD 치료제',
  'sleep-med': '수면제',
};

export const historyKo: Record<string, string> = {
  'asthma': '천식',
  'diabetes-t1': '1형 당뇨병',
  'diabetes-t2': '2형 당뇨병',
  'hypertension': '고혈압',
  'high-cholesterol': '고콜레스테롤혈증',
  'heart-disease': '심장 질환',
  'stroke': '뇌졸중',
  'cancer': '암 (병력)',
  'thyroid-disease': '갑상선 질환',
  'kidney-disease': '신장 질환',
  'liver-disease': '간 질환',
  'anemia': '빈혈',
  'depression': '우울증',
  'anxiety-disorder': '불안 장애',
  'arthritis': '관절염',
  'migraine': '편두통',
  'epilepsy': '간질 / 발작 질환',
  'gerd': '위식도 역류 질환 (GERD)',
  'copd': '만성폐쇄성폐질환 (COPD)',
  'pregnancy': '임신 (현재)',
};
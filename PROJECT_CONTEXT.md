# Catlife Insight - Project Context

## 1. 프로젝트 개요

Catlife Insight는 고양이 사료 및 관련 제품의 공개된 원재료와 영양정보를 구조화하여,
사용자가 원하는 조건으로 제품을 탐색하고 비교할 수 있도록 만드는 정보형 웹사이트이다.

단순 후기·평점 중심 사이트가 아니라 다음을 핵심으로 한다.

- 공식 제품 정보 기반 데이터 구축
- 피하고 싶은 원료를 제외하는 Finder
- 생애주기, 사료 형태, 브랜드 등에 따른 제품 탐색
- 제품별 원재료 및 보증성분 정보 제공
- 두 제품 간 비교 기능
- 원료 분류 기준 및 원료 사전 제공
- 향후 제품 데이터의 지속적인 확장

메인 메시지:

> 피하고 싶은 원료를 제외하고 우리 고양이에게 맞는 사료를 찾아보세요.

---

## 2. 배포 및 저장소

- GitHub Repository: `bizformula/catlife-insight`
- Production: Vercel
- 기본 브랜치: `main`

개발 시 GitHub의 최신 `main` 브랜치를 기준으로 작업한다.

---

## 3. 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- JSON 기반 제품 데이터
- Vercel 배포

주요 명령어:

```bash
npm run dev
npm run validate:products
npm run build
```

## 4. 주요 디렉터리

```text
app/
  finder/
  products/
  compare/
  ingredients/
  ...

components/
  finder/
  compare/
  ...

content/
  products/
  ingredient-dictionary.json
  ...

lib/
  products.ts
  ...

public/
  images/
    products/

scripts/
  validate-products.mjs

types/
  product.ts

PROJECT_CONTEXT.md
```

### 각 디렉터리 역할

#### `content/products/`

제품 1개당 JSON 파일 1개를 저장한다.

예:

```text
content/products/royal-canin-babycat-milk.json
```

#### `public/images/products/`

제품 이미지를 저장한다.

예:

```text
public/images/products/royal-canin-babycat-milk.png
```

#### `types/product.ts`

제품 JSON 전체 구조 및 TypeScript 타입 정의.

#### `scripts/validate-products.mjs`

제품 JSON 데이터의 필드, 값, 원료 분류 등을 검증한다.

#### `lib/products.ts`

`content/products`의 JSON 파일을 읽어 전체 제품 목록과 개별 제품 정보를 제공한다.

---

## 5. 현재 제품 데이터 상태

현재 등록 제품 수:

**21개**

제품 데이터는 `content/products/*.json` 형태로 관리한다.

각 제품은 가능한 한 공식 제조사 또는 공식 제품 페이지의 공개 정보를 기준으로 작성한다.

제품 추가 시 제품 이미지와 JSON 파일이 서로 대응하도록 한다.

---

## 6. 제품 기본 분류 체계

### Product Type

```text
food
treat
```

- `food` : 사료
- `treat` : 간식

### Food Form

```text
dry
wet
powder
```

표시명:

```text
dry    → 건식
wet    → 습식
powder → 분말
```

`powder`는 Royal Canin Babycat Milk 등록 과정에서 추가되었다.

Finder, 제품 목록, 제품 상세페이지, 비교 화면 모두 `powder`를 지원해야 한다.

### Product Purpose

```text
complete
supplementary
```

- `complete` : 주식 / 완전사료
- `supplementary` : 보조사료

### Life Stage

```text
kitten
adult
senior
all
```

---

## 7. 주요 제품 JSON 구조

제품 JSON의 기본 형태:

```json
{
  "slug": "product-slug",
  "name": "제품명",
  "brand": "브랜드명",
  "summary": "제품 설명",
  "image": "/images/products/product-image.png",

  "productType": "food",
  "foodForm": "dry",
  "purpose": "complete",

  "lifeStage": [
    "adult"
  ],

  "isVeterinaryDiet": false,
  "dietaryUses": [],

  "mainProteins": [],
  "ingredients": [],
  "ingredientDetails": [],

  "ingredientStatus": {},

  "guaranteedAnalysis": {},
  "analysisBasis": {},

  "sourceUrl": "",
  "checkedAt": "YYYY-MM-DD",

  "notes": ""
}
```

제품별 실제 정보에 따라 선택 필드는 생략할 수 있다.

---

## 8. 원료 분류 체계

현재 주요 Ingredient Group:

```text
chicken
turkey
duck
quail
beef
pork
fish
dairy
egg
grain
legume
pseudograin
starch
vegetable
```

원료 상태는 세 가지를 사용한다.

```text
contains
not-listed
unknown
```

### 의미

#### `contains`

공식 원재료 목록에 해당 원료 또는 해당 원료군이 명시되어 있는 경우.

#### `not-listed`

확인한 공식 원재료 목록에 해당 원료가 표시되어 있지 않은 경우.

이 값은 다음 의미가 아니다.

> 절대로 포함되지 않는다.

정확한 의미는:

> 확인한 공개 원재료 목록에서는 해당 원료가 확인되지 않았다.

#### `unknown`

공개 정보만으로 포함 여부를 신뢰성 있게 판단하기 어려운 경우.

---

## 9. 원료 판정 원칙

원료 분류는 추측하지 않는다.

다음 우선순위를 사용한다.

1. 제조사 공식 제품 페이지
2. 제조사가 공개한 제품 라벨 또는 성분표
3. 공식 수입사·유통사 정보
4. 필요한 경우 신뢰할 수 있는 보조 출처

공식 원재료가 불분명한 경우 임의로 `contains` 또는 `not-listed`로 결정하지 않고
필요하면 `unknown`을 사용한다.

원료명은 공식 표기를 최대한 보존한다.

---

## 10. Ingredient Detail 작성 원칙

`ingredientDetails`는 원재료를 구조화할 필요가 있을 때 사용한다.

기본 항목:

```text
name
sourceText
form
group
specificity
aliases
```

### Ingredient Form

```text
fresh
raw
dried
whole
organ
bone
fat
oil
hydrolyzed
starch
extract
fiber
supplement
other
```

### Specificity

```text
specific
group-only
```

공통적인 원료 별칭은 가능한 한 개별 제품 JSON에서 반복 관리하지 않고
`content/ingredient-dictionary.json`에서 관리한다.

---

## 11. 보증성분

지원하는 주요 성분:

```text
protein
fat
fiber
ash
moisture
calcium
phosphorus
taurine
```

`analysisBasis`는 다음 값을 사용한다.

```text
min
max
typical
```

공식 자료에서 수치가 공개되지 않았다면 임의로 값을 추정하지 않는다.

---

## 12. 제품 이미지 규칙

제품 이미지는 다음 위치에 저장한다.

```text
public/images/products/
```

권장 파일명:

```text
{product-slug}.png
```

예:

```text
royal-canin-babycat-milk.png
```

JSON 연결:

```json
"image": "/images/products/royal-canin-babycat-milk.png"
```

가능하면 JSON의 `slug`와 이미지 파일명을 동일하게 유지한다.

---

## 13. Finder 기능

Finder의 목적은 단순 제품 검색이 아니라
사용자가 피하고 싶은 원료를 제외하고 조건에 맞는 제품을 탐색하게 하는 것이다.

현재 주요 조건:

- 제외 원료
- 사료 형태
  - 건식
  - 습식
  - 분말
- 생애주기
- 브랜드
- 기타 제품 속성

`foodForm` 필터는 Product 타입과 직접 연결되어 있으므로
새로운 사료 형태를 추가할 경우 타입, Validator, Finder, 제품 목록,
상세페이지, 비교페이지를 함께 확인한다.

---

## 14. Compare 기능

제품 비교는 선택한 제품의 핵심 정보를 동일한 기준으로 표시한다.

비교 항목에는 다음과 같은 정보가 포함될 수 있다.

- 브랜드
- 제품 형태
- 생애주기
- 원재료
- 주요 단백질
- 보증성분
- 기타 제품 특성

새 필드 또는 enum 값을 추가한 경우 Compare 화면의 표시 로직도 반드시 확인한다.

---

## 15. 새 제품 추가 표준 절차

새로운 제품을 등록할 때는 아래 순서를 따른다.

```text
1. 공식 제품 페이지 확인
2. 공식 원재료 및 영양성분 확인
3. 제품 slug 결정
4. 제품 JSON 작성
5. 제품 이미지 저장
6. ingredientStatus 검토
7. npm run validate:products
8. npm run build
9. npm run dev
10. localhost에서 화면 확인
11. Finder 동작 확인
12. Compare 동작 확인
13. git status 확인
14. git add
15. git commit
16. git push
17. Vercel 배포 확인
```

---

## 16. 필수 검증

제품을 추가하거나 구조를 변경한 경우 반드시 실행한다.

```bash
npm run validate:products
```

목표:

```text
오류 0개
경고 0개
```

다음으로:

```bash
npm run build
```

Build가 성공해야 GitHub에 push한다.

---

## 17. Git 작업 원칙

작업 전후에 항상 확인:

```bash
git status
```

작업 중 예상하지 못한 파일이 있으면 무조건 `git add .` 하지 않는다.

변경 파일이 모두 의도된 작업 결과임을 확인한 경우에는:

```bash
git add .
git commit -m "커밋 내용"
git push
```

사용 가능.

큰 기능 변경과 제품 데이터 추가는 가능하면 별도 커밋으로 구분한다.

---

## 18. 개발 시 중요 원칙

### 기존 기능 보존

기능을 추가할 때 기존 동작을 불필요하게 변경하지 않는다.

특히 다음을 유지한다.

- 모바일 화면
- 다크모드
- Finder
- Compare
- 제품 목록
- 제품 상세페이지
- 기존 JSON 데이터
- 기존 URL 구조

### 최소 수정

간단한 기능 추가를 위해 대규모 리팩터링을 하지 않는다.

먼저 현재 코드 구조를 확인하고 필요한 부분만 수정한다.

### 데이터 우선

제품 정보는 UI보다 데이터 정확성이 우선이다.

공식 자료에 없는 성분이나 수치는 추정하여 입력하지 않는다.

### 제품 스키마 일관성

새 제품은 기존 제품 JSON을 참고하여 동일한 구조를 유지한다.

---

## 19. 코드 변경 시 확인해야 할 파일

제품 데이터의 enum 또는 표시 값을 변경할 경우 다음 파일을 우선 확인한다.

```text
types/product.ts
scripts/validate-products.mjs
components/finder/ProductFinder.tsx
app/products/page.tsx
app/products/[slug]/page.tsx
components/compare/ProductComparison.tsx
```

예를 들어 `powder`를 추가할 때 위 파일들의 타입, 검증 및 표시 로직을 함께 수정했다.

---

## 20. 현재 완료된 주요 기능

현재까지 확인된 주요 기능:

- 제품별 JSON 데이터 관리
- 제품 이미지 표시
- 제품 목록
- 제품 상세페이지
- Finder
- 원료 제외 검색
- 브랜드 및 제품 조건 필터링
- 제품 비교
- 원료 분류 체계
- 원료 사전
- 제품 데이터 Validator
- dry / wet / powder 지원
- Vercel 배포

---

## 21. 향후 ChatGPT 작업 방법

새로운 Chat에서 Catlife Insight 작업을 시작할 경우 다음과 같이 요청한다.

> GitHub의 bizformula/catlife-insight 저장소와 PROJECT_CONTEXT.md를 먼저 확인하고 현재 코드 구조를 유지하면서 작업을 계속해줘.

중요:

- 기억에 의존하여 코드를 작성하지 않는다.
- 변경 전에 GitHub의 최신 파일을 먼저 확인한다.
- 사용자가 이미 작성한 코드를 임의로 전체 교체하지 않는다.
- 가능한 한 한 파일씩 안전하게 수정한다.
- 제품 정보는 공식 출처 확인 후 작성한다.
- 작업 완료 후 반드시 validate와 build를 확인한다.

---

## 22. 현재 프로젝트 상태

기준일: 2026-08-24

- 등록 제품: 21개
- 제품 Validator: 정상
- Build: 정상
- `powder` 사료 형태 지원 완료
- Royal Canin Babycat Milk 분말 제품 Finder 검색 확인 완료
- 제품 이미지 및 JSON 대응 완료
- GitHub + Vercel 기반 운영

향후에는 제품 데이터 확대와 Finder/Compare 기능 고도화를 진행한다.
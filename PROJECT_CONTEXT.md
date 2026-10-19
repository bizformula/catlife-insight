# Catlife Insight - Project Context

최종 갱신: 2026-10-19

> **최신 운영 기준:** 아래 **36~41절(2026-10-19 업데이트)**을 우선 적용한다. 기존 1~35절 및 2026-10-07/08 기록은 작성 당시의 이력으로 보존하며, 충돌 시 최신 운영 기준과 실제 `main` 브랜치의 코드·Production 상태를 기준으로 한다.

## 1. 프로젝트 개요

Catlife Insight는 고양이의 먹거리와 생활환경을 더 꼼꼼히 살펴보고,

보호자가 선택에 필요한 정보를 찾고 비교할 수 있도록 정리하는 정보형 웹사이트이다.

현재 사이트의 핵심 데이터 기능은 고양이 사료와 간식의 공개된 원재료 및 영양정보를 구조화하여

사용자가 원하는 조건으로 제품을 탐색하고 비교할 수 있도록 하는 것이다.

단순 후기나 별점 중심 사이트가 아니라 다음을 핵심으로 한다.

- 공식 제품 정보 기반 사료·간식 데이터 구축

- 피하고 싶은 원료를 제외하는 Finder

- 생애주기, 사료 형태, 브랜드 등에 따른 제품 탐색

- 제품별 원재료 및 영양성분 정보 제공

- 두 제품 간 비교 기능

- 원료 분류 기준 및 원료 사전 제공

- 고양이 영양, 사료 표시, 간식 관련 정보성 블로그 운영

- 모래를 포함한 고양이 생활환경 관련 콘텐츠 운영

- 반려묘 폴라와 함께 실제로 확인하고 경험한 변화 과정 기록

- 제품 데이터와 콘텐츠의 지속적인 확장과 갱신

메인 메시지:

\> 피하고 싶은 원료를 제외하고 우리 고양이에게 맞는 사료를 찾아보세요.

Finder와 Compare 등 현재 구조화 데이터 기능의 중심은 사료와 간식이다.

블로그와 사이트 전체 콘텐츠 범위는 먹거리에만 한정하지 않고,

모래와 생활환경처럼 고양이가 일상적으로 사용하는 제품과 환경까지 확장할 수 있다.

제품을 자동으로 평가하거나 특정 제품을 좋은 제품 또는 나쁜 제품으로 단정하는 것이 목적이 아니다.

확인 가능한 데이터를 구조화하고,

사용자가 자신의 조건에 맞게 후보를 찾고 비교할 수 있도록 하는 것이 핵심이다.

폴라의 실제 경험을 콘텐츠로 다룰 수 있지만,

제품이나 환경의 변경과 건강 상태 사이의 인과관계가 확인되지 않은 경우

이를 치료 효과나 직접적인 원인처럼 표현하지 않는다.

**---**

## 2. 저장소 및 배포

GitHub Repository:

```text

bizformula/catlife-insight

```

기본 브랜치:

```text

main

```

Production:

```text

https://catlife.happy-insight.com

```

Cloudflare Worker:

```text

https://catlife-insight.baobob0304.workers.dev

```

현재 실제 Production 배포 환경은:

```text

Cloudflare Workers

```

Next.js 프로젝트를 vinext를 통해 Cloudflare Workers용으로 빌드한다.

기존 문서에 남아 있던 Vercel 배포 정보는 과거 정보이므로

현재 배포 작업에서는 사용하지 않는다.

**---**

## 3. 기술 스택

현재 주요 기술 스택:

```text

Next.js 16.2.4

React 19.2.8

TypeScript 5

Tailwind CSS 4

vinext 1.0.0-beta

Cloudflare Workers

Wrangler 4

Vite 8

```

콘텐츠 처리:

```text

gray-matter

remark

remark-gfm

remark-html

reading-time

```

제품 데이터:

```text

JSON

```

블로그 원본:

```text

Markdown

```

**---**

## 4. 주요 npm 명령어

### 전체 콘텐츠 생성

```bash

npm run generate:content

```

내부적으로 다음을 실행한다.

```bash

npm run generate:products

npm run generate:posts

```

### 로컬 Next.js 개발

```bash

npm run dev

```

### 제품 데이터 검증

```bash

npm run validate:products

```

### 일반 Next.js Build

```bash

npm run build

```

### Cloudflare용 vinext Build

```bash

npm run build:vinext

```

실제 동작:

```text

npm run generate:content

→ vinext build

```

### vinext 로컬 실행

```bash

npm run dev:vinext

```

### Worker 로컬 실행

```bash

npm run start:vinext

```

### Production 배포

Windows 환경에서 현재 가장 안정적으로 사용하는 명령:

```bash

npx wrangler deploy --config dist/server/wrangler.json

```

`npm run deploy:vinext` 명령도 존재하지만,

과거 Windows 환경에서 빌드 이후 Wrangler 프로세스가 비정상 종료된 사례가 있었으므로

현재는 위의 직접 Wrangler 배포 명령을 우선 사용한다.

**---**

## 5. 주요 디렉터리

```text

app/

  about/

  blog/

  category/

  compare/

  contact/

  finder/

  ingredient-standards/

  privacy/

  products/

  layout.tsx

  page.tsx

  robots.ts

  sitemap.ts

components/

  blog/

  compare/

  finder/

  layout/

content/

  products/

  posts/

  ingredient-dictionary.json

generated/

  products.json

  posts.json

lib/

  markdown.ts

  posts.ts

  products.ts

  site.ts

public/

  images/

    products/

    posts/

scripts/

  generate-products.mjs

  generate-posts.mjs

  validate-products.mjs

types/

  product.ts

  post.ts

PROJECT_CONTEXT.md

```

`generated/` 데이터는 원본 콘텐츠에서 자동 생성되므로

직접 편집하는 파일로 사용하지 않는다.

**---**

## 6. 현재 제품 데이터 상태

현재 등록 제품 수:

```text

160개

```

제품 원본:

```text

content/products/\*.json

```

제품 한 개당 JSON 파일 한 개를 사용한다.

예:

```text

content/products/royal-canin-babycat-milk.json

```

제품 이미지는:

```text

public/images/products/

```

에 저장한다.

가능하면 제품 slug와 이미지 파일명을 동일하게 유지한다.

예:

```text

slug:

royal-canin-babycat-milk

image:

public/images/products/royal-canin-babycat-milk.png

```

현재 구조화 제품 데이터는 사료와 간식을 대상으로 한다.

모래나 기타 생활용품을 블로그에서 다루는 것과

구조화 제품 데이터에 새로운 Product Type을 추가하는 것은 별개의 작업이다.

생활용품을 구조화 데이터에 추가하려면

기존 food/treat 모델에 억지로 넣지 말고

데이터 구조와 UI 영향을 먼저 검토한다.

**---**

## 7. 제품 기본 분류

### Product Type

```text

food

treat

```

의미:

```text

food  → 사료

treat → 간식

```

### Food Form

```text

dry

wet

powder

```

표시:

```text

dry    → 건식

wet    → 습식

powder → 분말

```

`powder`는 Royal Canin Babycat Milk 등록 과정에서 추가되었다.

새로운 Food Form을 추가할 때는 타입만 수정하지 말고

Validator, Finder, 제품 목록, 상세페이지, Compare까지 확인해야 한다.

### Product Purpose

```text

complete

supplementary

```

의미:

```text

complete      → 주식 / 완전사료

supplementary → 보조사료

```

### Life Stage

```text

kitten

adult

senior

all

```

**---**

## 8. 제품 JSON 주요 구조

기본적인 제품 구조:

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

제품별 실제 공개 정보에 따라 선택 필드는 생략할 수 있다.

**---**

## 9. 원료 분류 체계

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

원료 상태:

```text

contains

not-listed

unknown

```

### contains

공개된 원재료 목록에서 해당 원료 또는 해당 원료군이 명시적으로 확인된 경우.

### not-listed

확인한 공개 원재료 목록에서 해당 원료가 확인되지 않은 경우.

다음 의미가 아니다.

```text

절대로 포함되지 않는다.

```

정확한 의미:

```text

확인한 공개 원재료 목록에서는 해당 원료가 표시되어 있지 않았다.

```

### unknown

공개된 정보만으로 해당 원료의 포함 여부를 신뢰성 있게 판단하기 어려운 경우.

예:

```text

동물성 유지

동물성 단백질

가수분해 동물성 단백질

출처가 불명확한 복합 원료

일부 향미 원료

```

추측해서 `contains` 또는 `not-listed`로 결정하지 않는다.

**---**

## 10. 원료 판정 원칙

원료 정보는 다음 우선순위로 확인한다.

1\. 제조사 공식 제품 페이지

2\. 제조사가 공개한 공식 제품 라벨 또는 포장

3\. 공식 수입사 또는 공식 유통사

4\. 필요한 경우 신뢰할 수 있는 보조 자료

기본 원칙:

- 공식 표기를 가능한 한 그대로 보존한다.

- 원료명을 임의로 더 구체적인 원료로 바꾸지 않는다.

- 공개되지 않은 동물 종을 추정하지 않는다.

- 공개되지 않은 배합 비율을 추정하지 않는다.

- `not-listed`를 `free from` 또는 `절대 없음`으로 표현하지 않는다.

- 정보가 불충분하면 `unknown`을 사용한다.

- 실제 구매 제품의 최신 포장이 사이트 데이터보다 우선한다.

**---**

## 11. Ingredient Detail

`ingredientDetails`는 원재료를 구조화할 필요가 있을 때 사용한다.

주요 필드:

```text

name

sourceText

form

group

specificity

aliases

```

Ingredient Form:

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

Specificity:

```text

specific

group-only

```

공통 별칭은 가능한 한 개별 제품 JSON마다 반복하지 않고:

```text

content/ingredient-dictionary.json

```

에서 관리한다.

**---**

## 12. 영양성분 데이터

주요 지원 항목:

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

`analysisBasis`:

```text

min

max

typical

```

예:

```text

protein → min

fat → min

fiber → max

moisture → max

```

제품마다 표시 기준은 다를 수 있으므로 공식 자료를 확인한다.

공식 자료에 없는 수치는 추정하지 않는다.

특히 다음 값을 임의 계산해서 실제 제품 분석값처럼 저장하지 않는다.

```text

calcium

phosphorus

carbohydrate

taurine

```

**---**

## 13. Finder

Finder 목적:

```text

사용자가 피하고 싶은 원료와 조건을 적용해 제품 후보를 좁히는 것

```

현재 주요 검색 조건:

- 제외 원료

- 사료 형태

- 생애주기

- 브랜드

- 기타 제품 속성

중요:

Finder 결과는 특정 원료가 절대로 없음을 보증하지 않는다.

Finder는 등록된 공개 제품 데이터를 기준으로 작동한다.

특정 원료를 반드시 피해야 하는 경우:

```text

Finder로 후보 검색

→ 제품 상세 확인

→ 제조사 최신 정보 확인

→ 실제 포장 원재료 최종 확인

```

순서를 권장한다.

현재 Finder는 사료·간식 데이터 탐색 기능이다.

생활환경 콘텐츠 범위가 확대되더라도

Finder를 자동으로 생활용품 검색 기능으로 확대하지 않는다.

**---**

## 14. Compare

Compare는 두 제품 중 하나를 자동으로 더 좋은 제품으로 판정하는 기능이 아니다.

동일한 기준의 정보를 한 화면에 나란히 표시하는 기능이다.

주요 비교 항목:

- 브랜드

- 제품 형태

- 생애주기

- 제품 용도

- 원재료

- 주요 단백질

- 보증성분

- 수분

- 기타 제품 특성

새 필드 또는 enum을 추가할 때 Compare 표시 로직도 반드시 확인한다.

현재 Compare의 중심도 구조화된 사료·간식 데이터다.

**---**

## 15. 블로그 시스템

블로그 원본:

```text

content/posts/\*.md

```

현재 글 수:

```text

14개

```

현재 글:

```text

cat-food-age-labels-7-11-15.md

cat-food-protein-guide.md

cat-treat-feeding-guide.md

chicken-ingredient-guide.md

dry-matter-basis.md

dry-vs-wet-cat-food.md

farmina-nd-cat-food-lineup-guide.md

hills-science-diet-cat-food-lineup-guide.md

how-to-read-cat-food-label.md

how-to-read-product-analysis.md

instinct-cat-food-lineup-guide.md

pola-food-change-story.md

purina-pro-plan-liveclear-cat-allergy-guide.md

wet-food-gravy-vs-jelly.md

```

2026-08-27 ~ 2026-08-28에 기존 7개 글의 내용 정비를 완료했다.

정비 방향:

- 검색 의도에 맞는 제목

- description 개선

- 공식 또는 신뢰할 수 있는 출처 보강

- 내부 링크 강화

- 중복 내용 정리

- 과도한 인과관계 표현 제거

- 의료적 판단과 일반 정보 구분

- 최신 수정일 `updated` 적용

블로그 주제는 기존의 고양이 사료, 간식, 영양, 제품 표시 정보에 더해

고양이의 생활환경까지 확장할 수 있다.

향후 다룰 수 있는 생활환경 콘텐츠 예:

```text

고양이 모래 선택과 변경 과정

모래 종류와 표시 정보

먼지와 사용환경을 살펴보는 방법

화장실 환경 관리

생활용품 변경 경험

폴라와 함께 실제로 관찰한 변화 과정

```

폴라의 경험을 다루는 글에서는:

```text

제품 또는 환경을 변경한 사실

변경 전후에 관찰한 사실

개인적인 경험과 해석

의학적으로 확인된 사실

인과관계

```

을 구분한다.

특정 사료, 모래 또는 생활환경의 변경이

알레르기 검사 결과나 건강 상태를 직접 개선했다고

근거 없이 단정하지 않는다.

**---**

## 16. 블로그 Frontmatter

기본 구조:

```yaml

---

title: "글 제목"

date: "YYYY-MM-DD"

updated: "YYYY-MM-DD"

category: "category-name"

description: "글 설명"

thumbnail: "/images/posts/image-name.webp"

---

```

`updated`는 선택 필드다.

TypeScript:

```text

types/post.ts

```

에서 다음과 같이 관리한다.

```text

date: string

updated?: string

```

새 글은 실제 수정 이력이 없다면 `updated`를 억지로 추가하지 않아도 된다.

**---**

## 17. 블로그 콘텐츠 생성

Markdown 원본은 다음 스크립트로:

```text

scripts/generate-posts.mjs

```

처리된다.

생성 결과:

```text

generated/posts.json

```

`updated`가 없으면 생성 데이터에서는 기본적으로 `date`를 수정일 기준으로 사용할 수 있도록 처리되어 있다.

콘텐츠를 변경한 뒤에는:

```bash

npm run build:vinext

```

실행 시 제품과 블로그 데이터가 모두 다시 생성된다.

**---**

## 18. BlogPosting 구조화 데이터

모든 블로그 상세 글은:

```text

app/blog/[slug]/page.tsx

```

에서 공통 `BlogPosting` JSON-LD를 생성한다.

주요 필드:

```text

@type: BlogPosting

headline

description

image

datePublished

dateModified

author

publisher

mainEntityOfPage

url

articleSection

inLanguage

```

수정일:

```text

dateModified = post.updated ?? post.date

```

Author와 Publisher:

```text

Organization

Catlife Insight

```

현재 공식 로고가 확정되지 않았기 때문에

구조화 데이터 publisher logo는 임의로 추가하지 않는다.

Google Rich Results Test에서 BlogPosting이 정상 인식되는 것을 확인했다.

날짜가 `YYYY-MM-DD` 형태일 때 표시되는 시간대 관련 권고는 선택 사항이며,

실제 발행 시간을 알 수 없는 경우 임의의 시간을 만들어 넣지 않는다.

**---**

## 19. 블로그 페이지 기능

현재 블로그 상세 페이지는 다음 기능을 지원한다.

- Markdown 렌더링

- 자동 목차

- 모바일 목차

- 데스크톱 목차

- 관련 글

- 대표 이미지

- 읽는 시간

- canonical URL

- BlogPosting JSON-LD

- 본문 광고 위치

- 사이드바

현재 화면 상단에는 최초 작성일인 `post.date`가 표시된다.

`updated`는 구조화 데이터에는 반영되지만

화면에는 별도로 표시하지 않는다.

향후 품질 개선 항목으로

수정일이 발행일과 다른 경우에만 화면에 수정일을 표시하는 방안을 검토할 수 있다.

**---**

## 20. 사이트 SEO

기본 사이트 URL:

```text

https://catlife.happy-insight.com

```

`app/layout.tsx`의 `metadataBase`도 해당 도메인을 사용한다.

블로그 상세 페이지에는 canonical URL을 설정한다.

검색 엔진 관련 파일:

```text

app/robots.ts

app/sitemap.ts

```

Production sitemap:

```text

https://catlife.happy-insight.com/sitemap.xml

```

Google Search Console에 sitemap을 제출한 상태다.

SEO 작업 시 기존 URL을 불필요하게 변경하지 않는다.

특히 이미 공개된 블로그 slug는 특별한 이유가 없는 한 유지한다.

사이트의 핵심 검색 기능은 현재 사료 Finder이므로

사이트 전체 콘텐츠 범위를 생활환경으로 확대하더라도

기존 사료 관련 검색 의도와 핵심 페이지의 SEO 정체성을 불필요하게 약화시키지 않는다.

**---**

## 21. Google Analytics

현재 GA4 측정 ID:

```text

G-VQE5R4HP9E

```

전역 설정 위치:

```text

app/layout.tsx

```

모든 페이지에서 GA4가 로드된다.

GA 관련 코드를 변경할 때 중복 로딩이 생기지 않도록 확인한다.

**---**

## 22. Google AdSense

현재 AdSense Publisher:

```text

pub-3781508655873635

```

Client:

```text

ca-pub-3781508655873635

```

전역 AdSense 스크립트 위치:

```text

app/layout.tsx

```

현재 설정:

```text

data-overlays="bottom"

```

을 사용해 모바일 Anchor 광고를 활성화한 상태다.

블로그에는 수동 광고 영역도 존재한다.

관련 구성 요소 예:

```text

components/blog/AdPlaceholder

Sidebar

```

광고 코드를 수정할 때는:

- 기존 모바일 Anchor 광고

- 블로그 본문 광고

- 사이드바 광고

- 모바일 레이아웃

을 함께 확인한다.

**---**

## 23. 운영 정보 페이지 및 문의

Footer에서 다음 페이지로 접근할 수 있다.

```text

/about

/privacy

/contact

```

Footer 문구:

```text

고양이의 먹거리와 생활환경, 더 나은 선택을 위한 정보

```

### About

`/about`은 Catlife Insight의 시작 배경과 운영 원칙을 설명한다.

주요 방향:

- 폴라의 알레르기 검사와 건강검진을 계기로 정보 확인 시작

- 사료와 원재료 정보 확인

- 모래와 생활환경까지 함께 살펴본 과정

- 개인적인 경험과 인과관계를 구분

- Finder와 Compare의 역할 안내

- 특정 제품을 자동으로 좋고 나쁘다고 평가하지 않음

### Privacy

`/privacy`는 현재 실제 운영 환경을 기준으로 작성되어 있다.

주요 내용:

- 회원가입 및 로그인 기능 없음

- 문의 이메일을 통한 정보 처리

- Cloudflare Workers

- Google Analytics 4

- Google AdSense

- 쿠키 및 localStorage

- 외부 사이트 링크

- 건강 및 검사 정보 관련 안내

현재 시행일:

```text

2026년 8월 28일

```

법률 전문 검토를 받은 문서라고 단정하지 않는다.

서비스 구조나 광고·분석 도구가 변경되면

개인정보처리방침도 다시 검토한다.

### Contact

공개 문의 이메일:

```text

contact\@happy-insight.com

```

Cloudflare Email Routing을 통해 실제 수신 가능한 상태이며

2026-08-28에 테스트 수신을 완료했다.

문의 페이지에서는 다음 유형의 연락을 안내한다.

- 사료·간식 제품 정보 오류

- 공식 출처 변경

- 사이트 이용 관련 의견

- 모래 및 생활환경 관련 콘텐츠 의견

- 광고 및 제휴 문의

검사표, 진료기록, 제품 포장 사진 등을 받을 때

불필요한 개인정보를 보내지 않도록 안내한다.

**---**

## 24. Production 배포 절차

일반적인 콘텐츠 또는 코드 수정 후:

```text

1\. 파일 수정

2\. npm run validate:products

   - 제품 데이터 변경이 있을 때

3\. npm run build:vinext

4\. 생성 데이터 확인

5\. git status

6\. 의도한 파일만 git add

7\. git commit

8\. git push origin main

9\. npx wrangler deploy --config dist/server/wrangler.json

10\. Production 페이지 확인

```

블로그 Markdown만 수정한 경우에도:

```bash

npm run build:vinext

```

로 생성 및 Cloudflare용 build를 확인한다.

**---**

## 25. 새 제품 추가 표준 절차

```text

1\. 제조사 공식 제품 페이지 확인

2\. 공식 원재료 확인

3\. 공식 영양성분 확인

4\. 제품 slug 결정

5\. 제품 JSON 작성

6\. 제품 이미지 저장

7\. ingredientStatus 작성 및 검토

8\. ingredientDetails 필요 여부 검토

9\. sourceUrl 기록

10\. checkedAt 기록

11\. npm run validate:products

12\. npm run build:vinext

13\. Finder 확인

14\. 제품 목록 확인

15\. 제품 상세 확인

16\. Compare 확인

17\. git status

18\. 의도한 파일만 git add

19\. git commit

20\. git push origin main

21\. Wrangler 배포

22\. Production 확인

```

이 절차는 현재 구조화 데이터 대상인 사료와 간식에 적용한다.

**---**

## 26. 새 블로그 글 작성 절차

```text

1\. 검색 의도와 주제 결정

2\. 주제에 맞는 공식·전문 출처 조사

3\. 경험 기반 글이면 관찰 사실과 해석을 구분

4\. content/posts/{slug}.md 작성

5\. title 작성

6\. date 작성

7\. 필요하면 updated 작성

8\. category 작성

9\. description 작성

10\. thumbnail 연결

11\. 내부 링크 추가

12\. 과도한 단정 표현 확인

13\. 의료적 내용이 있으면 진단·치료 표현 주의

14\. 제품 또는 환경 변경과 건강 상태의 인과관계 표현 확인

15\. npm run build:vinext

16\. generated/posts.json 확인

17\. git status

18\. 의도한 파일만 git add

19\. commit / push

20\. Wrangler 배포

21\. Production 확인

22\. 필요하면 BlogPosting 구조화 데이터 확인

```

생활환경이나 모래 관련 글도

제품 홍보성 주장보다 확인 가능한 정보와 실제 경험의 구분을 우선한다.

**---**

## 27. Git 작업 원칙

작업 전후:

```bash

git status

```

를 반드시 확인한다.

예상하지 못한 파일이 존재할 때:

```bash

git add .

```

를 사용하지 않는다.

가능하면 실제 수정한 파일을 명시한다.

예:

```bash

git add content/posts/example.md

```

여러 파일을 의도적으로 함께 수정한 경우:

```bash

git add file1 file2 file3

```

형식으로 추가한다.

큰 기능 변경과 단순 데이터 추가는 가능하면 서로 다른 커밋으로 구분한다.

**---**

## 28. 코드 변경 시 우선 확인할 파일

제품 필드, enum 또는 표시 방식을 변경할 때 우선 확인:

```text

types/product.ts

scripts/validate-products.mjs

components/finder/ProductFinder.tsx

app/products/page.tsx

app/products/[slug]/page.tsx

components/compare/ProductComparison.tsx

```

블로그 데이터 구조를 변경할 때 우선 확인:

```text

types/post.ts

scripts/generate-posts.mjs

lib/posts.ts

app/blog/page.tsx

app/blog/[slug]/page.tsx

app/sitemap.ts

```

전역 SEO, Analytics, AdSense 변경:

```text

app/layout.tsx

app/robots.ts

app/sitemap.ts

```

운영 정보 페이지 변경:

```text

app/about/page.tsx

app/privacy/page.tsx

app/contact/page.tsx

components/layout/Footer.tsx

```

**---**

## 29. 개발 시 중요 원칙

### 데이터 정확성 우선

UI보다 데이터 정확성이 우선이다.

공식 자료에 없는 값을 채우기 위해 추정하지 않는다.

### 사실과 해석 구분

다음은 반드시 구분한다.

```text

공식 표시 정보

관찰한 사실

계산한 값

일반적인 해석

개인적인 경험

의학적 판단

```

### 경험과 인과관계 구분

폴라에게 실제로 관찰된 경험은 기록할 수 있다.

하지만 다음과 같은 관계가 확인되지 않았다면 인과관계로 단정하지 않는다.

```text

사료 변경 → 건강 개선

간식 변경 → 검사 결과 변화

모래 변경 → 알레르기 개선

생활환경 변경 → 특정 질환 개선

```

시간적으로 변경 후 어떤 현상이 관찰되었다는 사실과

그 변경이 원인이라는 판단은 별개다.

### 최소 수정

간단한 기능을 추가하기 위해 전체 구조를 대규모로 리팩터링하지 않는다.

현재 동작을 먼저 확인하고 필요한 부분만 수정한다.

### 기존 기능 보존

특히 다음을 유지한다.

- 모바일 화면

- 다크모드

- Finder

- Compare

- 제품 목록

- 제품 상세

- 블로그

- 기존 URL

- AdSense

- Analytics

- Footer 운영 페이지

### 의료 관련 표현

질환, 알레르기, 검사 결과, 처방식 등과 관련된 내용은

특정 원료, 사료, 모래 또는 생활환경이

질환의 원인 또는 치료 효과가 있다고 임의로 단정하지 않는다.

시간적 선후관계와 인과관계를 구분한다.

질환별 식이 선택이나 의료적 판단은 담당 수의사의 판단이 우선한다.

**---**

## 30. 현재 완료된 주요 기능

현재 완료 및 확인된 기능:

- 제품별 JSON 데이터 관리

- 제품 이미지

- 160개 제품 데이터

- 제품 목록

- 제품 상세페이지

- Finder

- 원료 제외 검색

- 브랜드 및 조건 필터

- dry / wet / powder 지원

- Compare

- 원료 분류 체계

- 원료 사전

- 제품 Validator

- Markdown 블로그

- 블로그 14개

- 자동 목차

- 관련 글

- 블로그 WebP 대표 이미지

- 블로그 canonical URL

- 블로그 Open Graph / Twitter metadata

- Sitemap

- robots.txt

- BlogPosting JSON-LD

- dateModified 지원

- Google Analytics 4

- Google AdSense

- 모바일 Anchor 광고

- About 페이지

- 개인정보처리방침 페이지

- 문의 페이지

- Footer 운영 정보 링크

- 실제 수신 가능한 contact\@happy-insight.com 문의 주소

- Cloudflare Email Routing

- Cloudflare Workers Production 배포

**---**

## 31. 현재 우선순위

현재 큰 기반 기능은 구축된 상태다.

앞으로는 다음 순서의 개선을 우선 고려한다.

### 1. 제품 데이터 확대

공식 제조사 정보를 기준으로 등록 제품 수를 지속적으로 늘린다.

현재 구조화 데이터 확장의 우선 대상은 사료와 간식이다.

### 2. 기존 제품 정보 갱신

`checkedAt`이 오래된 제품부터 리뉴얼 여부를 확인한다.

### 3. 원료 사전 확대

제품이 늘어나면서 등장하는 새로운 원료와 별칭을 정리한다.

### 4. 블로그 콘텐츠 확대

Finder와 Compare 사용에 실질적으로 도움이 되는 먹거리 콘텐츠와

폴라의 실제 경험에서 출발한 생활환경 콘텐츠를 함께 확대한다.

먹거리 관련 예:

```text

특정 원료 읽는 법

보증성분 이해

칼슘·인 정보 읽는 법

열량 비교

생애주기별 사료 표시

처방식 표시 이해

간식과 보조사료 구분

```

생활환경 관련 예:

```text

고양이 모래를 바꾸게 된 과정

모래 종류와 특성 비교

모래 변경 전후 관찰 기록

고양이 화장실 환경

먼지와 사용환경 확인

생활용품 변경 경험

```

생활환경 콘텐츠를 추가한다고 해서

현재 Finder와 Compare 데이터 모델을 즉시 생활용품까지 확대하지 않는다.

블로그 콘텐츠 확장과 구조화 제품 데이터 확장은 각각 별도로 검토한다.

### 5. Search Console 인덱싱 상태 확인

Sitemap은 이미 제출되어 있다.

주요 페이지와 대표 블로그 글의 색인 상태를 확인하고

필요한 경우 URL 검사를 통해 색인 요청을 진행한다.

### 6. 구조화 데이터 확장 검토

현재 BlogPosting은 적용 완료.

향후 필요하면 다음을 검토할 수 있다.

```text

Organization

WebSite

BreadcrumbList

제품 관련 구조화 데이터

```

구조화 데이터를 추가하기 위해 실제로 존재하지 않는 정보나

공식 로고 등을 만들어 넣지 않는다.

**---**

## 32. 작업 시작 시 반드시 확인

Catlife Insight 관련 작업을 새로 시작할 때는

항상 GitHub `main` 브랜치의 최신:

```text

PROJECT_CONTEXT.md

```

를 먼저 확인한다.

그다음 실제 관련 코드와 데이터를 읽고 작업한다.

PROJECT_CONTEXT의 설명과 실제 저장소 코드가 다를 경우

실제 최신 코드와 Production 동작을 우선 확인하고

필요하면 PROJECT_CONTEXT도 함께 갱신한다.

## 33. On-Page & Content SEO 작성 원칙

2026-09-03부터 Catlife Insight의 새 블로그 글과 기존 글의 SEO 개선에는 다음 원칙을 적용한다.

### 핵심 방향

Catlife Insight는 `고양이 사료`, `고양이 사료 추천` 같은 대형 키워드만 직접 공략하지 않는다.

신규 사이트가 실제 검색 의도에 맞는 문서로 평가받을 수 있도록 **\*\*구체적인 롱테일 키워드와 제품 DB 기반의 고유 분석\*\***을 우선한다.

예:

```text

파미나 N&D 고양이 사료 비교

파미나 N&D 프라임 오션 차이

중성화 고양이 저지방 사료 비교

닭고기 없는 고양이 사료 찾는 법

고양이 사료 단백질 지방 함량 비교

고양이 습식 건식 단백질 비교

```

### 1. 한 글은 하나의 핵심 검색 의도를 우선한다

글을 작성하기 전에 다음을 먼저 정한다.

```text

Primary keyword: 핵심 롱테일 키워드 1개

Secondary keywords: 관련 보조 키워드 3~6개

Search intent: 검색자가 이 글에서 해결하려는 질문 1개

```

한 글에 서로 관계없는 키워드를 과도하게 넣지 않는다.

### 2. 롱테일 키워드를 우선한다

초기에는 검색량이 큰 단어보다 검색 의도가 명확한 3~5단어 수준의 조합을 우선한다.

예:

```text

고양이 사료

```

보다:

```text

파미나 N&D 고양이 사료 비교

닭고기 알러지 고양이 사료 원료 확인

중성화 고양이 사료 지방 함량 비교

```

처럼 사용자가 원하는 답이 명확한 키워드를 우선한다.

### 3. Title 작성 원칙

- Primary keyword를 가능한 한 제목 앞부분에 자연스럽게 배치한다.

- 제목은 검색자가 페이지 내용을 즉시 이해할 수 있도록 구체적으로 작성한다.

- 클릭을 유도하더라도 과장된 표현이나 낚시성 제목을 사용하지 않는다.

- `TOP 10`, `무조건`, `최고`, `완벽한`, `100% 안전` 같은 근거 없는 표현을 피한다.

- 고정된 30자 규칙을 기계적으로 적용하지 않는다. 검색 의도 전달과 가독성을 우선한다.

- 이미 공개된 글의 slug는 SEO만을 이유로 불필요하게 변경하지 않는다.

예:

```text

파미나 N&D 고양이 사료 비교: 6개 라인 차이

```

### 4. Meta Description 작성 원칙

- 핵심 키워드와 글에서 실제 제공하는 답을 1~2문장으로 요약한다.

- 검색자가 클릭하기 전에 비교 범위와 얻을 수 있는 정보를 알 수 있게 한다.

- 키워드를 반복적으로 나열하지 않는다.

- 실제 본문에 없는 내용을 description에서 약속하지 않는다.

- Google이 검색어에 따라 본문을 스니펫으로 사용할 수 있으므로 본문 첫 문단도 독립적으로 이해되게 작성한다.

### 5. 본문 첫 부분에서 답을 먼저 제공한다

서론을 길게 끌지 않는다.

가능하면 첫 1~3문단 안에서:

```text

검색 질문에 대한 핵심 답

비교 대상

가장 중요한 구분 기준

```

을 먼저 제공한다.

그다음 세부 근거와 제품별 차이를 설명한다.

### 6. H2/H3는 실제 검색 질문 중심으로 구성한다

단순한 장식용 소제목보다 사용자가 검색할 수 있는 질문을 사용한다.

예:

```text

파미나 N&D 오션은 모두 그레인프리인가?

퀴노아는 곡물인가?

닭고기 알러지가 있으면 양고기 제품을 선택해도 될까?

중성화 고양이용 제품은 무엇이 다른가?

```

FAQ 성격의 질문도 본문 내용과 실제 검색 의도에 부합할 때만 사용한다.

### 7. Catlife Insight 제품 DB를 콘텐츠의 핵심 차별점으로 사용한다

제조사 설명을 단순 번역·재작성하는 글을 만들지 않는다.

가능하면 등록된 제품 DB를 활용하여 다음과 같은 고유 정보를 제공한다.

```text

전체 원재료 비교

제품명에 나타나지 않는 동물성 원료 확인

ingredientStatus 비교

주요 단백질원 비교

grain / legume / pseudograin / starch 구분

단백질·지방·섬유·수분 비교

공식 열량 비교

건식·습식 형태 차이

일반식·처방식 구분

생애주기·중성화 여부 비교

```

예:

```text

양고기 제품이라도 닭 지방이 표시될 수 있다.

메추라기 제품이라도 청어유가 포함될 수 있다.

Ocean 라인이라도 일부 제품은 스펠트·귀리를 포함할 수 있다.

```

이처럼 **\*\*제품명만으로 알기 어려운 실제 원재료 차이\*\***를 데이터 기반으로 설명하는 것을 우선한다.

### 8. 숫자는 공식 자료에 있는 값만 사용한다

단백질, 지방, 섬유, 칼슘, 인, 타우린, 열량 등은 제조사 공식 자료 또는 신뢰할 수 있는 출처가 있을 때만 사용한다.

공식 자료에 없는 숫자를 SEO 콘텐츠를 풍부하게 만들기 위해 추정하지 않는다.

계산값을 사용할 경우:

```text

공식 표시값

계산한 값

```

을 명확히 구분한다.

### 9. 건식과 습식은 필요하면 DMB로 비교한다

수분 함량이 크게 다른 건식과 습식의 단백질·지방 비율을 단순 수치로 비교하지 않는다.

필요하면 Dry Matter Basis(DMB)를 사용하고 기존 글:

```text

/blog/dry-matter-basis

```

로 내부 링크한다.

실제 급여 판단에서는 DMB뿐 아니라 열량과 급여량도 함께 확인한다.

### 10. 질환·알러지 관련 검색어는 정보 제공 중심으로 작성한다

다음과 같은 의료·질환 관련 키워드는 검색량만을 이유로 과도하게 `추천` 형태로 작성하지 않는다.

예:

```text

신부전 고양이 사료 추천 TOP 10

요로결석을 치료하는 사료

알러지를 없애는 사료

```

대신:

```text

신장질환 고양이 사료에서 확인할 표시 항목

일반 유리너리 사료와 처방식의 차이

알러지 원료를 확인하는 방법

```

처럼 정보 확인과 선택 기준을 설명한다.

질환의 진단·치료·처방식 선택은 담당 수의사의 판단이 우선한다.

### 11. 내부 링크를 반드시 설계한다

새 블로그 글은 내용에 따라 다음 페이지로 자연스럽게 연결한다.

```text

/products/{slug}

/finder

/compare

/blog/how-to-read-cat-food-label

/blog/dry-matter-basis

기타 관련 블로그

```

내부 링크는 SEO를 위한 무작위 링크가 아니라 사용자가 다음 질문을 해결할 수 있는 페이지로 연결한다.

특히 제품 비교 글에서는:

```text

제품 상세 → Finder → 관련 성분 가이드

```

흐름을 우선 고려한다.

### 12. Topic Cluster 방식으로 콘텐츠를 확장한다

하나의 브랜드 또는 주제를 한 글로 끝내지 않고 검색 의도가 분명히 다른 경우 관련 롱테일 글로 확장한다.

예:

```text

Pillar:

파미나 N&D 고양이 사료 비교

Cluster:

파미나 N&D 프라임 오션 차이

파미나 N&D 중성화 사료 비교

파미나 N&D 그레인프리 제품 확인

파미나 N&D 닭고기 원료 포함 제품 확인

파미나 N&D 퀴노아 라인 차이

```

단, 검색 의도가 사실상 같은 글을 키워드만 바꿔 중복 생성하지 않는다.

### 13. 키워드 밀도보다 자연스러운 문맥을 우선한다

Primary keyword를 제목, description, 서론, 관련 H2와 본문에 자연스럽게 사용할 수 있지만 정해진 횟수를 채우기 위해 반복하지 않는다.

다음과 같은 keyword stuffing은 피한다.

```text

파미나 사료 추천, 파미나 고양이 사료 추천, 파미나 N&D 추천, N&D 사료 추천...

```

검색어가 없어도 독자가 자연스럽게 읽을 수 있는 문장을 우선한다.

### 14. 출처 우선순위

제품 관련 글의 출처 우선순위는 제품 데이터와 동일하게 적용한다.

1\. 제조사 공식 페이지

2\. 제조사 공식 라벨·포장

3\. 공식 수입사·공식 유통사

4\. 수의학·영양학 관련 전문 자료

5\. 필요한 경우 신뢰할 수 있는 보조 자료

제품 배합이 국가별로 다를 경우 어느 국가의 공식 페이지를 기준으로 했는지 밝힌다.

### 15. 폴라 썸네일 원칙

Catlife Insight 블로그의 대표 이미지와 썸네일은 **\*\*반려묘 폴라를 핵심 시각 요소이자 사이트의 일관된 브랜드 캐릭터로 사용한다.\*\***

- 일반적인 스톡 고양이를 폴라 대신 메인 이미지로 사용하지 않는다.

- 폴라의 외형은 사용자가 제공한 실제 사진을 우선 참고한다.

- 제품·원료·아이콘·배경 요소는 글 주제에 맞게 변경할 수 있다.

- 썸네일에서도 폴라가 중심 시각 요소로 인식되어야 한다.

- 기존 블로그 이미지 경로 규칙을 유지하고 WebP 사용을 우선한다.

예:

```text

/images/posts/farmina-nd-cat-food-lineup-guide.webp

```

### 16. 발행 전 SEO 체크리스트

새 글 발행 전에 최소한 다음을 확인한다.

```text

[ ] Primary keyword 1개가 명확한가?

[ ] Search intent를 한 문장으로 설명할 수 있는가?

[ ] Title 앞부분에서 핵심 주제를 이해할 수 있는가?

[ ] Description이 실제 글 내용을 정확히 요약하는가?

[ ] 첫 1~3문단에서 검색 질문에 먼저 답했는가?

[ ] H2/H3가 실제 독자의 질문을 반영하는가?

[ ] 제조사 설명을 그대로 반복하지 않고 DB 기반 분석이 있는가?

[ ] 제품명에 나타나지 않는 원료도 확인했는가?

[ ] 수치와 원료 정보에 출처가 있는가?

[ ] 건식·습식 수치를 부적절하게 직접 비교하지 않았는가?

[ ] 질환·처방식·알러지 표현이 과도하지 않은가?

[ ] 제품 상세 또는 Finder로 유용한 내부 링크가 있는가?

[ ] 기존 관련 글과 중복되지 않는가?

[ ] 폴라가 썸네일의 핵심 시각 요소인가?

[ ] 기존 공개 URL을 불필요하게 변경하지 않았는가?

```

### 17. 일일 콘텐츠 운영 흐름

현재 기본 운영 목표인:

```text

제품 20개 등록

+ 블로그 글 1개 작성

```

을 서로 분리된 작업으로 보지 않는다.

가능하면 당일 등록한 제품군을 활용하여:

```text

제품 데이터 구축

→ 공통 검색 의도 발굴

→ 롱테일 키워드 선정

→ DB 기반 비교·분석 글 작성

→ 제품 상세 내부 링크

→ Finder 연결

```

의 흐름으로 콘텐츠를 만든다.

이 방식으로 제품 데이터 축적 자체가 블로그의 원본 분석 자산이 되도록 한다.
---

## 34. 블로그 주제 선정 및 검색 유입 확대 기본 로직

2026-09-25부터 사용자가 별도의 SEO 전략을 설명하지 않고 `블로그 글 하나 추가해줘`, `다음 글 써줘`, `검색 노출용 글을 만들어줘`처럼 요청하더라도 아래 로직을 **기본값으로 자동 적용한다.**

### 핵심 목표

Catlife Insight는 광범위한 반려동물 포털을 따라가는 것이 아니라 **고양이 사료·간식·원재료·영양정보 분야에서 검색 진입점을 촘촘하게 늘리고, 그 유입을 제품 DB, Finder, Compare로 연결하는 전문 사이트**를 목표로 한다.

콘텐츠 양을 늘리는 것 자체가 목적이 아니다. 다음 두 가지를 동시에 만족하는 글을 우선한다.

```text
1. 사용자가 실제로 검색할 가능성이 높은 구체적인 질문
2. Catlife Insight의 제품 DB와 기능으로 일반 정보 글보다 더 깊게 답할 수 있는 주제
```

### 1. 글을 쓰기 전에 기존 콘텐츠와 DB부터 확인한다

새 글을 제안하거나 작성하기 전에 특별한 이유가 없는 한 다음을 먼저 확인한다.

```text
PROJECT_CONTEXT.md
content/posts/
content/products/
관련 Finder / Compare 기능
기존 관련 블로그 글
```

목적:

- 이미 작성한 글과 검색 의도가 겹치지 않는지 확인
- 기존 Pillar 글을 보강할 Cluster 주제가 있는지 확인
- 현재 등록 제품 데이터로 실제 비교·분석이 가능한지 확인
- 새 글에서 연결할 제품 상세, Finder, Compare, 관련 가이드를 미리 정함

이미 같은 검색 의도를 충분히 다룬 글이 있으면 키워드만 바꾼 유사 글을 새로 만들지 말고 기존 글 개선을 우선 검토한다.

### 2. 사용자가 주제를 지정하지 않으면 검색 수요가 있는 롱테일 주제를 자동 발굴한다

사용자가 정확한 주제를 지정하지 않은 경우 단순히 생각나는 주제를 고르지 않는다.

가능하면 최신 웹 검색을 통해 현재 검색결과와 경쟁 콘텐츠를 확인하고 다음 유형의 검색어를 우선 발굴한다.

```text
기본 질문형:
고양이 사료 급여량
키튼 사료 언제까지
고양이 사료 칼로리 보는 법

성분·영양형:
고양이 사료 단백질 함량
고양이 사료 조지방
고양이 사료 탄수화물 계산
고양이 사료 칼슘 인 비율
고양이 사료 조회분

원료형:
닭고기 없는 고양이 사료
생선 없는 고양이 사료
곡물 없는 고양이 사료
가수분해 단백질
완두콩 렌틸콩 원료

선택·사용 문제형:
건식 습식 같이 먹여도 될까
사료 바꾸는 방법
새 사료를 안 먹을 때
사료를 섞어 먹여도 될까
```

검색량이 큰 대형 키워드 하나에만 의존하지 않고 **검색자의 질문이 분명한 여러 롱테일 검색 진입점**을 지속적으로 확보한다.

### 3. 경쟁 사이트에서는 '검색 질문 발굴 방식'만 참고한다

경쟁 사이트 분석의 목적은 글의 문체나 제목을 복제하는 것이 아니다.

확인할 것은 다음이다.

```text
어떤 구체적인 질문을 개별 글로 분리했는가
어떤 롱테일 검색 의도를 아직 Catlife가 다루지 않았는가
검색 결과 상위 문서들이 공통적으로 답하는 핵심 질문은 무엇인가
기존 상위 문서에서 부족한 정보는 무엇인가
Catlife의 DB로 추가할 수 있는 고유 정보는 무엇인가
```

경쟁 사이트의 다음 요소를 근거 없이 따라 하지 않는다.

```text
TOP 5 / TOP 10 남발
최고 / 무조건 / 완벽한 같은 단정
실제 확인하지 않은 리뷰 개수
사용하지 않은 제품의 체험 후기
확인하지 않은 가격·판매량·인기 순위
과도한 공포 또는 질환 치료 표현
```

### 4. Catlife의 검색 전략은 '좁고 깊게' 유지한다

검색 유입을 늘리기 위해 다음과 같은 광범위한 반려동물 포털 주제로 무분별하게 확장하지 않는다.

```text
일반적인 고양이 질병 백과
고양이 행동 전반
강아지 정보
반려동물 뉴스 전반
사이트 핵심 기능과 연결되지 않는 잡다한 생활정보
```

우선순위는 계속 다음 영역에 둔다.

```text
고양이 사료
고양이 간식
원재료
보증성분·영양성분
건식·습식 차이
생애주기별 표시
브랜드·라인업 차이
사료 선택 과정
Finder와 Compare를 활용할 수 있는 문제
```

생활환경 글은 프로젝트 방향에 따라 추가할 수 있지만 사료 관련 검색 정체성을 약화시키지 않도록 별도의 콘텐츠 축으로 관리한다.

### 5. 주제 선택 시 '검색 가능성 × Catlife 차별성 × 내부 연결성'을 함께 본다

후보 주제가 여러 개라면 아래 세 요소를 함께 검토한다.

```text
검색 가능성:
사용자가 실제 검색창에 입력할 만한 구체적인 질문인가?

Catlife 차별성:
제품 DB, 원재료 구조, 보증성분, DMB, 공식 자료 등을 활용해
일반적인 설명보다 더 구체적으로 답할 수 있는가?

내부 연결성:
Finder, Compare, 제품 상세, 기존 관련 글로 자연스럽게 이어지는가?
```

세 요소가 모두 좋은 주제를 먼저 작성한다. 검색량이 있어 보여도 Catlife가 추가 가치를 주기 어려운 주제는 우선순위를 낮춘다.

### 6. 블로그는 검색 유입에서 기능 페이지로 이어지는 중간 허브 역할을 한다

새 글은 가능하면 다음 사용자 흐름을 만든다.

```text
Google / Naver 검색
→ 블로그 글
→ 관련 제품 상세 또는 Finder
→ 후보 제품 확인
→ Compare
→ 관련 성분·영양 가이드
```

모든 글에 모든 링크를 억지로 넣지는 않는다. 검색자가 다음 단계에서 실제로 필요로 할 페이지를 선택해서 연결한다.

예:

```text
"닭고기 없는 고양이 사료 찾는 법"
→ Finder의 원료 제외 기능

"건식과 습식 단백질 비교"
→ DMB 가이드
→ Compare

"특정 브랜드 라인업 차이"
→ 해당 제품 상세
→ Compare
```

### 7. Pillar + Cluster 방식으로 검색 진입점을 확장한다

하나의 큰 글만 만들고 끝내지 않는다.

예:

```text
Pillar:
고양이 사료 성분표 보는 법

Cluster:
고양이 사료 단백질 함량 보는 법
고양이 사료 지방 함량 보는 법
고양이 사료 조회분이란
고양이 사료 칼슘·인 보는 법
고양이 사료 열량 보는 법
```

또는:

```text
Pillar:
특정 브랜드 고양이 사료 라인업 비교

Cluster:
키튼 제품 차이
중성화 제품 차이
그레인프리 제품 확인
특정 단백질원 포함 여부
라인별 원재료 차이
```

단, 검색 의도가 사실상 동일하면 별도 글로 쪼개지 않는다.

### 8. 기본 작성 방식은 '답 먼저, 근거와 비교는 뒤에'로 한다

새 글은 가능한 한 다음 순서를 따른다.

```text
제목
→ 검색 질문에 대한 짧은 핵심 답
→ 핵심 요약
→ 사용자가 가장 궁금해할 세부 질문
→ 공식 자료 / 제품 DB 기반 설명
→ 실제 비교 예시
→ Finder / Compare / 관련 글 내부 링크
→ FAQ
→ 참고 자료
→ 정리
```

검색자를 오래 붙잡기 위해 불필요한 서론을 늘리지 않는다.

### 9. 기존 글과의 키워드 경쟁을 피한다

새 글을 만들기 전 기존 글의 Primary intent와 겹치는지 확인한다.

예:

```text
"고양이 사료 성분표 보는 법"
와
"고양이 사료 성분 확인하는 방법"
```

처럼 사실상 같은 검색 의도를 가진 글을 별도로 만들지 않는다. 대신 기존 Pillar 글에서 충분히 다루기 어려운 하위 질문을 Cluster로 분리한다.

### 10. 사용자가 단순히 '블로그 글 하나 써줘'라고 해도 자동으로 수행할 것

별도 지시가 없어도 다음 순서로 진행한다.

```text
1. 최신 PROJECT_CONTEXT.md 확인
2. 현재 content/posts 목록 확인
3. 필요하면 관련 제품 DB 확인
4. 최신 검색결과와 경쟁 콘텐츠 조사
5. 아직 비어 있는 검색 의도 후보 발굴
6. 기존 글과 중복 여부 확인
7. Primary keyword / Search intent 결정
8. Catlife DB로 줄 수 있는 고유 가치 결정
9. 내부 링크 구조 결정
10. 글 전체 작성
11. 폴라 중심 WebP 썸네일 방향 제안 또는 생성
12. 발행 전 SEO 체크리스트 검토
```

사용자가 특정 주제를 이미 지정한 경우에는 주제를 임의로 바꾸지 않되, 위 로직을 사용해 검색 의도, 중복 여부, 구조, 내부 링크, 근거를 자동 보강한다.

### 11. 기본 목표

Catlife Insight의 콘텐츠 확장은 다음 방향을 지향한다.

```text
소수의 대형 키워드만 노리는 사이트
X

고양이 사료와 관련된 수십 개의 실제 질문에
각각 정확한 답을 제공하는 전문 사이트
O
```

따라서 블로그 콘텐츠가 늘어날수록:

```text
검색 진입점 증가
→ 주제 전문성 강화
→ 제품 DB 노출 증가
→ Finder 사용
→ Compare 사용
→ 관련 글 재탐색
```

으로 이어지는 구조를 만든다.

콘텐츠 수 자체보다 **검색 의도 커버리지와 사이트 기능 연결성**을 우선한다.

---


---

## 35. 티스토리 일일 홍보 콘텐츠 기본 루틴

2026-10-06부터 Catlife Insight의 외부 검색 유입과 사이트 홍보를 위해 티스토리 블로그 콘텐츠를 지속적으로 작성한다.

사용자가 별도의 형식이나 주제를 지정하지 않고 다음과 같이 요청하면:

```text
블로그에 글 써줘
오늘 블로그 글 써줘
티스토리 글 써줘
오늘 글 하나 작성해줘
```

기본적으로 **Catlife Insight 홍보 및 검색 유입을 위한 티스토리 콘텐츠 1세트**를 작성한다.

### 1. 요청 해석 우선순위

별도 설명이 없는:

```text
블로그에 글 써줘
오늘 블로그 글 써줘
오늘 글 하나 작성해줘
```

요청은 기본적으로 **티스토리 홍보용 글 작성**으로 해석한다.

Catlife Insight 사이트 내부의 Markdown 원본 글을 원하는 경우에는 다음과 같이 명시한다.

```text
Catlife 블로그 글 추가해줘
Catlife 원본 글 작성해줘
사이트 원본 글 작성해줘
```

따라서 단순한 `블로그 글 써줘` 요청에서는 본 항목의 티스토리 콘텐츠 작성 규칙을 우선 적용한다.

### 2. 하루 기본 산출물

티스토리 글 1개를 작성할 때 특별한 요청이 없어도 다음을 한 세트로 제공한다.

```text
1. 티스토리 제목
2. Primary keyword
3. Secondary keywords
4. Search intent
5. 티스토리 HTML 본문
6. Catlife Insight 연결 URL
7. 링크용 앵커 텍스트
8. 티스토리 태그 5~8개
9. 썸네일 이미지 1개
10. 본문 설명 이미지 3개
11. 각 이미지 파일명
12. 각 이미지 대체 텍스트(alt)
13. 각 이미지 삽입 위치
14. 각 이미지에 연결할 Catlife URL
```

기본 이미지 수는:

```text
썸네일 1개
+
본문 이미지 3개
=
총 4개
```

로 한다.

사용자가 이미지를 별도로 요청하지 않아도 티스토리 글 작성 작업에 포함된 것으로 간주한다.

### 3. 티스토리 본문은 HTML로 작성

티스토리 콘텐츠는 Markdown이 아니라 **티스토리 에디터의 HTML 모드에 바로 붙여넣을 수 있는 HTML 형식**으로 작성한다.

기본적으로 다음 태그를 사용할 수 있다.

```html
<p>
<h2>
<h3>
<strong>
<ul>
<li>
<a>
<div>
```

본문에 들어가는 Catlife Insight 링크는 상대경로가 아니라 실제 절대 URL을 사용한다.

예:

```text
https://catlife.happy-insight.com/finder
https://catlife.happy-insight.com/compare
https://catlife.happy-insight.com/blog/...
https://catlife.happy-insight.com/products/...
```

Catlife 홈페이지로 무조건 연결하지 않고 글의 검색 의도와 가장 관련 있는 페이지로 직접 연결한다.

예:

```text
사료 추천·조건 검색
→ https://catlife.happy-insight.com/finder

제품 비교
→ https://catlife.happy-insight.com/compare

단백질 관련
→ https://catlife.happy-insight.com/blog/cat-food-protein-guide

건식·습식 관련
→ https://catlife.happy-insight.com/blog/dry-vs-wet-cat-food

특정 제품
→ https://catlife.happy-insight.com/products/{slug}
```

### 4. 이미지 삽입 방식

티스토리는 이미지 업로드 후 자체 이미지 URL을 생성하므로 HTML 본문에 존재하지 않는 이미지 `src`를 임의로 작성하지 않는다.

대신 HTML 본문에 다음과 같이 이미지 삽입 위치를 표시한다.

```html
<!-- 썸네일 이미지 삽입 위치 -->
```

```html
<!-- 본문 이미지 1 삽입 위치 -->
```

```html
<!-- 본문 이미지 2 삽입 위치 -->
```

```html
<!-- 본문 이미지 3 삽입 위치 -->
```

이미지를 생성한 뒤 각 이미지에 대해 다음 정보를 함께 제공한다.

```text
이미지 용도
파일명
대체 텍스트
삽입 위치
연결할 Catlife URL
```

### 5. 썸네일 이미지 원칙

티스토리 썸네일은 Daum 및 블로그 목록에서 글의 주제가 바로 보이도록 만든다.

기본 구성은 다음과 같다.

```text
Primary keyword를 가장 크게 표시
핵심 메시지를 보조 문구로 표시
고양이를 주요 시각 요소로 사용
Catlife Insight 브랜드명은 작게 보조적으로 표시
```

Catlife Insight라는 브랜드명이 핵심 검색 키워드보다 더 크게 보이지 않게 한다.

썸네일이 광고 배너처럼 보이지 않도록 하고, 검색자가 어떤 내용의 글인지 즉시 이해할 수 있게 한다.

### 6. 본문 이미지 원칙

본문 이미지 3개는 단순 장식용 사진보다 글 내용을 이해하는 데 도움이 되는 **설명형 이미지**를 우선한다.

예:

```text
건식 vs 습식 비교
원재료 확인 방법
조단백질·조지방 표시 읽는 법
급여량 확인 요소
사료 변경 과정
제품 선택 조건
원료군 비교
제품 성분표 읽는 방법
```

각 이미지는 서로 다른 내용을 설명하도록 한다.

같은 디자인과 같은 내용을 반복하는 이미지를 만들지 않는다.

### 7. 이미지 파일명과 대체 텍스트

이미지 파일명은 가능하면 이미지 주제를 이해할 수 있는 한글 또는 영문 파일명을 사용한다.

예:

```text
고양이_건식_vs_습식_사료_비교.png
고양이_사료_원재료_확인_가이드.png
고양이_사료_영양성분_제대로_보기.png
```

대체 텍스트는 이미지 안의 문구를 그대로 반복하기보다 이미지가 설명하는 내용을 자연스럽게 요약한다.

예:

```text
고양이 건식 사료와 습식 사료의 수분 함량 차이와 비교 방법

고양이 사료 원재료 목록에서 닭고기, 곡물, 유제품, 콩류를 확인하는 방법

고양이 사료 조단백질과 조지방 표시값, 건물 기준 DMB 비교 방법
```

### 8. 이미지 링크 원칙

티스토리 본문 이미지는 내용과 관련된 Catlife Insight 페이지로 연결할 수 있다.

모든 이미지를 홈페이지 하나로 연결하지 않는다.

예:

```text
건식 vs 습식 이미지
→ https://catlife.happy-insight.com/blog/dry-vs-wet-cat-food

원재료 확인 이미지
→ https://catlife.happy-insight.com/finder
또는 관련 원료 가이드

영양성분 이미지
→ https://catlife.happy-insight.com/blog/cat-food-protein-guide

사료 검색 썸네일
→ https://catlife.happy-insight.com/finder
```

이미지의 내용과 링크 목적지가 자연스럽게 이어져야 한다.

### 9. 티스토리 태그

티스토리 글마다 주제와 직접 관련된 태그를 기본적으로 5~8개 제공한다.

Primary keyword와 주요 보조 키워드를 포함하되 관련성이 낮은 태그를 과도하게 넣지 않는다.

예:

```text
고양이사료
고양이사료추천
고양이사료성분
고양이사료고르는법
고양이사료단백질
고양이건식사료
고양이습식사료
캣라이프인사이트
```

태그 자체를 검색순위 상승의 핵심 수단으로 보지 않고 글의 주제를 명확하게 분류하는 보조 요소로 사용한다.

### 10. 주제를 지정하지 않으면 자동 선정

사용자가 티스토리 글의 주제를 지정하지 않으면 별도의 질문 없이 오늘 작성할 주제를 자동으로 선정한다.

우선순위:

```text
1. 사용자가 제공한 Daum 연관검색어
2. 최근 확인한 검색 연관 키워드
3. 기존 Catlife Insight 콘텐츠와 연결할 수 있는 검색어
4. Finder / Compare / 제품 DB 기능으로 해결할 수 있는 검색 의도
5. 기존 티스토리 글과 중복되지 않는 주제
```

현재 확인된 주요 검색 후보 예:

```text
고양이 사료 추천
고양이 사료 급여량
고양이 사료 하루급여량
고양이 사료거부
고양이 사료 토
로얄캐닌 고양이 사료
고양이 사료 단백질
고양이 습식 사료
고양이 사료 성분표
고양이 사료 알레르기
```

대형 키워드를 사용할 때도 단순 제품 순위형 글보다 Catlife Insight의 차별점과 연결되는 검색 의도를 우선한다.

예:

```text
고양이 사료 추천
→ 인기 순위보다 우리 고양이 조건으로 찾는 방법

고양이 사료 단백질
→ 조단백질 몇 %인지보다 표시값을 읽는 방법

고양이 사료 급여량
→ 하루 급여량을 정할 때 확인해야 할 요소
```

### 11. Daum 검색 유입을 고려한 티스토리 작성

티스토리 글은 Daum 검색 유입을 주요 목표 중 하나로 고려한다.

다만 검색 상위 노출만을 위해 키워드를 과도하게 반복하거나 본문과 관련 없는 이미지·태그를 넣지 않는다.

기본적으로 다음을 적용한다.

```text
제목에 핵심 검색어를 자연스럽게 포함
첫 부분에서 검색 질문에 빠르게 답변
H2/H3에 관련 검색 질문을 자연스럽게 배치
본문 중간에 설명 이미지 배치
글의 검색 의도에 맞는 Catlife 링크 사용
검색어를 억지로 반복하지 않음
```

### 12. Catlife 원본과 티스토리 글은 중복 작성하지 않는다

Catlife Insight 사이트의 원본 블로그 글을 티스토리에 그대로 복사하지 않는다.

역할은 다음처럼 구분한다.

```text
Catlife Insight
→ 상세 원본 정보
→ 제품 DB
→ Finder
→ Compare
→ 장기 검색 자산

Tistory
→ 특정 검색 질문에 집중
→ 내용을 간결하게 설명
→ Catlife의 상세 콘텐츠 또는 기능으로 연결
→ 외부 검색 진입점 역할
```

같은 주제를 다루더라도 제목, 문장, 구성과 검색 의도를 다르게 설계한다.

Catlife 원문의 전체 본문을 그대로 복사하지 않는다.

### 13. Catlife 연결 앵커 텍스트

외부 링크의 앵커 텍스트는 단순히:

```text
바로가기
사이트 방문
Catlife Insight
```

처럼 작성하기보다 링크를 클릭했을 때 무엇을 할 수 있는지 알 수 있도록 구체적으로 작성한다.

예:

```text
피하고 싶은 원료와 단백질·지방 조건으로 고양이 사료 찾기

고양이 건식 사료와 습식 사료 차이 확인하기

고양이 사료 단백질 표시값 읽는 방법

두 고양이 사료의 원재료와 영양성분 비교하기
```

### 14. 기본 유입 흐름

티스토리 콘텐츠는 다음 흐름을 목표로 한다.

```text
Daum / Google 검색
→ Tistory 정보글
→ Catlife 관련 블로그 또는 Finder
→ 제품 상세
→ Compare
```

Catlife 홈페이지 방문 자체를 목표로 하기보다 검색자가 다음 행동을 할 수 있는 구체적인 페이지로 연결한다.

### 15. 질환·건강 관련 주제

고양이 질환, 검사 수치, 알레르기, 구토 등 건강과 관련된 검색어는 검색 유입을 위해 과도한 치료·효과 표현을 사용하지 않는다.

피해야 하는 표현:

```text
간수치를 낮추는 고양이 사료
알레르기를 치료하는 사료
구토를 멈추는 사료
무조건 좋은 사료
이 사료를 먹으면 좋아진다
```

대신 다음 방향으로 작성한다.

```text
사료에서 확인할 영양성분
제품 선택 시 확인할 조건
원재료 확인 방법
수의사와 정한 조건으로 후보를 찾는 방법
```

질환의 진단·치료·처방식 선택은 담당 수의사의 판단이 우선한다.

### 16. Threads와의 연계

티스토리 글을 작성한 경우 같은 주제를 Threads에서도 사용할 수 있도록 짧은 파생 소재를 만들 수 있다.

사용자가 별도로 요청하지 않아도 활용 가치가 높은 경우 티스토리 글의 핵심 내용에서 Threads용 짧은 소재 3~5개를 함께 제안할 수 있다.

Threads 콘텐츠는 티스토리 글을 그대로 축약하지 않고 다음 구조를 우선한다.

```text
실제 경험
→ 흥미로운 사실 또는 질문
→ 짧은 설명
→ Catlife 기능 또는 관련 글 연결
```

광고성 문구보다 실제 보호자가 궁금해할 만한 질문과 경험을 중심으로 작성한다.

### 17. 기본 작업 완료 형태

사용자가 단순히:

```text
블로그에 글 써줘
```

라고 요청하면 추가 질문 없이 가능한 한 한 번에 다음 작업을 완료한다.

```text
주제 자동 선정
→ 제목 선정
→ Primary / Secondary keyword 선정
→ Search intent 정의
→ 티스토리 HTML 본문 작성
→ Catlife 링크 및 앵커 텍스트 삽입
→ 태그 5~8개 제공
→ 썸네일 이미지 1개 생성
→ 본문 이미지 3개 생성
→ 이미지 파일명 제공
→ 각 이미지 alt 텍스트 제공
→ 이미지 삽입 위치 제공
→ 이미지별 연결 URL 제공
```

특별한 이유가 없는 한 위 작업을 여러 번의 확인 질문으로 나누지 않는다.

### 18. 일일 운영 목표

기본 목표는 하루에 티스토리 글 1개를 꾸준히 작성하는 것이다.

콘텐츠 수를 무조건 늘리는 것보다 다음을 우선한다.

```text
검색 의도가 분명한 주제
기존 글과 중복되지 않는 주제
Catlife의 실제 기능과 연결되는 주제
검색자가 Catlife에서 추가 행동을 할 수 있는 주제
```

티스토리 글이 쌓이면서 동일한 Catlife 페이지에 지나치게 같은 앵커 텍스트만 반복되지 않도록 문맥에 맞게 표현을 조금씩 다양화한다.

---

---

## 2026-10-07 Catlife 운영 및 SEO 업데이트

최종 갱신: 2026-10-07

### 1. Production 및 기본 환경

Production:

```text
https://catlife.happy-insight.com

Catlife Insight는 고양이 사료·간식의 성분표를 쉽게 읽고 비교할 수 있도록 정보를 제공하는 콘텐츠·데이터 기반 사이트다.
현재 운영 방향:
콘텐츠 품질
→ 검색 유입
→ 제품 탐색·비교
→ 브랜드 신뢰 형성
→ 향후 제휴/어필리에이트 수익화

AdSense는 Money Insight보다 보수적으로 운영하며, Catlife는 콘텐츠·브랜드·제휴를 우선하고 광고는 보조적으로 활용한다.
2. Catlife 프로젝트 기본 구조
Catlife는 Money Insight와 달리 src 폴더가 없는 Next.js App Router 구조를 사용한다.
주요 구조:
app/
components/
lib/
generated/
types/

Root layout:
app/layout.tsx

블로그:
app/blog/page.tsx

블로그 데이터 관련:
lib/posts.ts
generated/posts.json
types/post.ts

GA4:
G-VQE5R4HP9E

AdSense Publisher:
ca-pub-3781508655873635

3. Root Metadata 및 네이버 소유확인
2026-10-07 네이버 서치어드바이저 사이트 소유확인 완료.
파일:
app/layout.tsx

Metadata에 다음 네이버 인증값 적용:
verification: {
  other: {
    "naver-site-verification":
      "befb838fb33b41a2fbe2591c81c26a148cdc97d1",
  },
},

Production 페이지 소스에서 실제 meta tag 출력 확인:
<meta
  name="naver-site-verification"
  content="befb838fb33b41a2fbe2591c81c26a148cdc97d1"
/>

네이버 서치어드바이저:
사이트 소유확인
완료

Next.js Metadata API 방식이 정상 동작하므로 별도 HTML 파일 방식으로 변경하지 않는다.
4. 현재 Root Metadata 주요 설정
사이트 기본 URL:
https://catlife.happy-insight.com

기본 title:
Catlife Insight

기본 description:
고양이 사료와 간식의 성분표를 쉽게 읽고 비교하는 곳

OG 기본 이미지:
/images/social/catlife-og-home-v2.png

favicon:
/images/catlife-favicon-512-v3.png

Root Metadata 기본 구성:
metadataBase
title
description
openGraph
twitter
icons
verification

Root layout에는 Google Analytics 및 AdSense 글로벌 스크립트가 포함되어 있다.
5. Catlife AdSense 운영 전략
Catlife와 Money Insight는 광고 운영 전략을 구분한다.
Money Insight:
AdSense 적극 활용
Auto Ads + 수동 In-page 광고 병행

Catlife Insight:
콘텐츠·브랜드·제휴 중심
AdSense는 보조적으로 활용

현재 Root layout의 AdSense 글로벌 스크립트는 유지한다.
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3781508655873635"
  data-overlays="collapsed-bottom"
  crossOrigin="anonymous"
/>

Publisher:
ca-pub-3781508655873635

2026-10-07 기준 happy-insight.com AdSense Auto Ads 페이지 제외 대상:
catlife.happy-insight.com
dream.happy-insight.com
info.happy-insight.com
life.happy-insight.com
tech.happy-insight.com

따라서 현재 Catlife는 Money Insight처럼 적극적인 Auto Ads 대상이 아니다.
향후 기본 방향:
브랜드 및 콘텐츠 경험 유지
→ 제품 비교/검색 기능 강화
→ 제휴 링크 및 어필리에이트 검토
→ 필요한 위치에만 제한적 AdSense 적용

Catlife에도 필요 시 광고를 일부 확대할 수 있으나, Money Insight와 동일한 수준으로 광고 밀도를 높이지 않는 방향을 기본 원칙으로 한다.
Vignette 전면광고는 현재 Catlife의 기본 운영 전략으로 사용하지 않는다.
6. 네이버 서치어드바이저 등록 현황
2026-10-07 네이버 검색 등록 작업 수행.
Production:
https://catlife.happy-insight.com

현재 완료 상태:
사이트 소유확인
완료

robots.txt
확인 완료

sitemap.xml
정상 접근 확인

sitemap.xml
네이버 제출 완료

주요 페이지 웹페이지 수집 요청
10개 완료

rss.xml
생성 및 Production 배포 완료

RSS
네이버 제출 완료

7. robots.txt 확인
Production:
https://catlife.happy-insight.com/robots.txt

브라우저에서 정상 접근 확인 완료.
robots.txt는 검색로봇의 사이트 접근 허용 및 sitemap 위치 안내 용도로 사용한다.
향후 robots 관련 변경 시 다음 검색로봇의 접근을 불필요하게 차단하지 않도록 주의한다.
Googlebot
Yeti / Naver
일반 User-agent

8. sitemap.xml 확인 및 제출
Production:
https://catlife.happy-insight.com/sitemap.xml

2026-10-07 정상 접근 확인 완료.
네이버 서치어드바이저에 sitemap 제출 완료.
검색엔진 등록 운영 원칙:
전체 URL
→ sitemap.xml

최신 콘텐츠
→ RSS

중요 페이지
→ 네이버 수동 웹페이지 수집 요청

전체 페이지를 반복적으로 수동 요청하지 않는다.
9. 네이버 주요 URL 10개 수집 요청
2026-10-07 네이버 서치어드바이저에서 주요 URL 10개 웹페이지 수집 요청 완료.
기본 우선순위:
홈
→ 제품 목록
→ 비교 페이지
→ 핵심 블로그/가이드
→ 대표 제품 상세

수동 수집 요청은 sitemap과 RSS를 보조하는 용도로 사용한다.
모든 제품 URL을 수동 요청하지 않는다.
제품 상세 페이지가 다수 존재하므로 다음 구조를 통해 검색로봇이 자연스럽게 발견하도록 한다.
/products
+
sitemap.xml
+
내부링크

10. Catlife RSS 신규 구축
2026-10-07 Catlife RSS 신규 구축 완료.
Production RSS:
https://catlife.happy-insight.com/rss.xml

파일:
app/rss.xml/route.ts

Catlife는 src 폴더가 없으므로 다음 경로를 사용한다.
app/
└─ rss.xml/
   └─ route.ts

RSS 대상은 블로그 게시글이다.
기존 블로그 데이터 구조:
generated/posts.json
→ lib/posts.ts
→ getAllPosts()
→ 블로그 화면 및 RSS

RSS 역시 기존 getAllPosts()를 사용한다.
11. lib/posts.ts 구조
블로그 데이터 관리 파일:
lib/posts.ts

주요 함수:
getPostSlugs()
getPostBySlug()
getAllPosts()
getCategories()
getPostsByCategory()
getPopularPosts()

getAllPosts()는 게시글을 날짜 기준 최신순으로 정렬하여 반환한다.
따라서 RSS에서 별도의 게시글 목록을 수동 관리하지 않는다.
RSS는 기존 블로그 데이터 소스를 그대로 재사용한다.
12. Catlife RSS 기본 구성
RSS 형식:
RSS 2.0

Production:
https://catlife.happy-insight.com/rss.xml

Content-Type:
application/rss+xml; charset=utf-8

Feed title:
Catlife Insight

최대 게시글:
최신 30개

각 RSS item 기본 구성:
title
link
guid
description
pubDate

게시글 URL:
https://catlife.happy-insight.com/blog/{slug}

게시글 description은 가능한 경우 다음 순서로 사용한다.
description
→ excerpt
→ 기본 설명

RSS 응답 cache:
s-maxage=3600
stale-while-revalidate=86400

2026-10-07 완료:
app/rss.xml/route.ts 생성

Production 배포

https://catlife.happy-insight.com/rss.xml
정상 출력 확인

네이버 서치어드바이저 RSS 제출
완료

13. 블로그 페이지 구조
블로그 페이지:
app/blog/page.tsx

블로그 데이터:
lib/posts.ts

블로그 목록은:
getAllPosts()

를 사용한다.
페이지당 게시글 수:
6개

Pagination:
/blog
/blog?page=2
/blog?page=3
...

Canonical:
/blog
/blog?page={page}

현재 블로그 pagination 구조와 canonical 설정은 유지한다.
14. Catlife 검색엔진 발견 구조
2026-10-07 이후 Catlife 검색엔진 발견 구조:
robots.txt
        ↓
sitemap.xml
        ↓
전체 페이지 발견

RSS
        ↓
최신 블로그 글 발견

내부링크
        ↓
제품/콘텐츠 연결

네이버 URL 수집 요청
        ↓
중요 페이지 초기 수집 보조

검색 유입 목표 구조:
Google / Naver 검색
        ↓
블로그 / 가이드
        ↓
제품 상세
        ↓
제품 목록 / 비교
        ↓
사용자의 제품 판단

15. 네이버 검색 등록 최종 상태
2026-10-07 기준:
네이버 서치어드바이저 사이트 등록
완료

naver-site-verification
완료

robots.txt
확인 완료

sitemap.xml
확인 및 제출 완료

주요 URL 10개 수집 요청
완료

rss.xml
신규 생성 완료

rss.xml Production 확인
완료

네이버 RSS 제출
완료

현재는 추가 제출보다 네이버의 수집 및 색인 반영을 기다리는 단계다.
향후 확인:
네이버 서치어드바이저
→ 수집 현황
→ 색인 현황
→ 수집 제외 URL
→ 사이트 진단
→ 실제 네이버 검색 노출

16. 향후 Catlife SEO 운영 원칙
신규 블로그 글 추가 시 확인 항목:
title
description
canonical
Open Graph
내부링크
sitemap 포함
RSS 포함
Production 정상 접근

신규 글 발행 시 RSS 파일을 직접 수정하지 않는다.
게시글이 기존 데이터 흐름에 정상 포함되면 RSS에도 자동 포함되도록 현재 구조를 유지한다.
generated/posts.json
→ lib/posts.ts
→ getAllPosts()
→ RSS 자동 반영

신규 제품 추가 시에도 모든 제품을 네이버에 수동 제출하지 않는다.
기본 흐름:
제품 데이터 등록
→ 제품 목록 노출
→ sitemap 포함
→ 내부링크 연결
→ 검색엔진 자동 발견

17. Catlife 향후 우선순위
2026-10-07 이후 우선순위:
1. 네이버 수집·색인 상태 확인

2. Google Search Console 및 네이버 실제 검색 유입 확인

3. 핵심 블로그 title / description / canonical 점검

4. 블로그 → 관련 제품 내부링크 강화

5. 제품 상세 → 관련 가이드 내부링크 강화

6. 제품 비교 기능 강화

7. 콘텐츠 지속 확대

8. 제휴/어필리에이트 수익화 구조 검토

9. 사용자 경험을 해치지 않는 범위에서 AdSense 보조 적용

Catlife의 장기 콘텐츠 방향:
검색용 얇은 콘텐츠 대량 생산
지양

실제 고양이 보호자가
사료와 간식의 성분을 이해하고
제품을 비교하는 데 도움이 되는 콘텐츠
우선

18. 2026-10-07 작업 요약
오늘 Catlife 작업:
네이버 서치어드바이저 사이트 등록
→ 소유확인 meta 적용
→ Production 배포
→ 페이지 소스에서 verification 확인
→ 네이버 소유확인 성공

robots.txt
→ 정상 확인

sitemap.xml
→ 정상 확인
→ 네이버 제출 완료

주요 URL
→ 10개 수집 요청 완료

RSS
→ app/rss.xml/route.ts 신규 생성
→ getAllPosts() 연계
→ Production 배포
→ /rss.xml 정상 출력 확인
→ 네이버 RSS 제출 완료

AdSense
→ Catlife를 Auto Ads 페이지 제외 대상으로 유지
→ 콘텐츠/브랜드/제휴 우선 전략 유지

19. 다음 세션 연결 시 반드시 기억할 사항
Catlife는 src 폴더가 없는 구조

Root layout:
app/layout.tsx

블로그:
app/blog/page.tsx

게시글 데이터:
lib/posts.ts
generated/posts.json

RSS:
app/rss.xml/route.ts

RSS 데이터 소스:
getAllPosts()

Production:
https://catlife.happy-insight.com

RSS:
https://catlife.happy-insight.com/rss.xml

Naver 소유확인:
완료

robots.txt:
확인 완료

sitemap.xml:
네이버 제출 완료

주요 URL 10개:
수집 요청 완료

RSS:
네이버 제출 완료

광고 전략:
Money Insight보다 보수적
콘텐츠·브랜드·제휴 우선
AdSense는 보조적으로 활용


그리고 Catlife 기존 `PROJECT_CONTEXT.md` 상단에 날짜가 있다면:

```markdown
최종 갱신: 2026-10-07

# Catlife Insight — PROJECT_CONTEXT.md 업데이트

**업데이트 기준일:** 2026-10-08  
**프로젝트:** Catlife Insight  
**운영 URL:** https://catlife.happy-insight.com  
**기술 스택:** Next.js, TypeScript, Tailwind CSS, Cloudflare Workers  
**현재 상태:** 디자인 개선 및 구매처 안내 기능 반영 후 운영 배포 완료, 사용자 확인 완료

---

## 1. 프로젝트 운영 현황

Catlife Insight는 고양이 사료와 간식의 원재료, 영양성분, 제조사 공개정보를 검색하고 비교할 수 있도록 제공하는 정보형 웹사이트임.

주요 기능:

- 원료 및 영양성분 조건에 따른 제품 검색
- 급여 연령, 사료 형태, 브랜드별 필터
- 피하고 싶은 원료의 개별 입력 및 분류별 제외
- 제품 2개 비교
- 제품 상세정보 및 제조사 공개정보 확인
- 네이버쇼핑 구매처 검색 연결
- 고양이 사료·건강·생활 관련 블로그
- 반응형 PC·모바일 화면
- 라이트·다크모드
- 브라운·블루 2종 계절별 테마

2026-10-08 기준 주요 기능과 디자인 변경 사항에 대한 운영 배포 및 사용자 확인 완료.

## 2. 디자인 및 계절별 테마

### 2.1 두 가지 테마 운영

계절별 홈페이지 테마는 다음 두 종류로 고정.

| 구분 | Brown | Blue |
|---|---|---|
| 운영 계절 | 가을·겨울 | 봄·여름 |
| 기본 강조색 | `#93613F` | `#2563EB` |
| 기본 배경 | `#F7F2EB` | `#F8FAFF` |
| 강조 배경 | `#F3E9DD` | `#EFF6FF` |
| 제목·본문 | 검정색 중심 | 검정색 중심 |

- 계절별 색상은 `app/globals.css`의 CSS 변수로 관리.
- `app/layout.tsx`의 `data-season="brown"` 또는 `"blue"` 설정으로 전환.
- 제목, 제품명, 블로그 제목, 일반 본문은 계절에 관계없이 검정색 중심 유지.
- 계절별 강조색은 버튼, 링크, 선택 상태, 호버 등에 제한적으로 적용.
- 제품 사진과 블로그 썸네일에는 계절별 색상 필터를 적용하지 않음.
- 기존 다크모드 기능은 별도로 유지.

### 2.2 파비콘 및 브랜드 로고

공식 파비콘은 차콜 블랙 고양이 아이콘으로 고정.

파일:

`public/images/catlife-favicon-charcoal-v1.png`

`app/layout.tsx`의 `metadata.icons`에서 동일 이미지 사용.

- `icon`, `shortcut`, `apple` 모두 동일 파비콘 경로 사용.
- 브라운·블루 테마를 전환하더라도 파비콘은 변경하지 않음.
- 헤더에서도 동일한 고양이 아이콘 사용.
- 헤더의 `Catlife Insight` 글자는 기본적으로 계절별 강조색 적용.
- 마우스 호버 시 글자색은 `var(--foreground)`로 변경.
- 향후 Happy Insight 통합 운영에 대비해 사이트별 브랜드 식별성을 유지.

### 2.3 홈페이지 디자인

홈페이지는 다음 4개 영역으로 구성.

1. 폴라의 경험에서 시작했습니다 — 브랜드 스토리 및 대표 이미지
2. 원하는 조건으로 제품 탐색 — Finder·Compare 이동
3. 등록 사료 미리보기 — 대표 제품 카드
4. 새로운 읽을거리 — 최신 블로그 게시글 카드

디자인 원칙:

- 각 주요 섹션에 둥근 테두리 적용.
- 큰 섹션 간 세로 간격 24px로 통일.
- 이미지 원본 색상 유지.
- 주요 제목은 검정색.
- 불필요한 중복 버튼 및 안내 문구 최소화.

## 3. 블로그 개선

관련 파일:

- `app/blog/page.tsx`
- `components/blog/PostCard.tsx`
- `components/layout/Sidebar.tsx`
- `app/blog/[slug]/page.tsx`
- `app/category/[name]/page.tsx`

주요 변경:

- 블로그 목록의 게시글 제목 검정색 적용.
- 긴 게시글 제목의 가독성을 고려해 목록 제목 크기 축소.
- 제목 호버 시 계절별 강조색 적용.
- 추천 글과 카테고리 링크는 기본 검정색 중심.
- Sidebar의 버튼 및 링크에 공통 테마 변수 적용.
- 기존 블로그 메타데이터, 카테고리 구조, SEO 관련 기능 유지.

**주의:** 카테고리 동적 경로는 `app/category/[slug]/page.tsx`가 아니라 `app/category/[name]/page.tsx`임.

## 4. 사료 찾기(Finder) 기능 개선

주요 파일:

`components/finder/ProductFinder.tsx`

### 4.1 검색 필터 화면 구성

검색 화면은 상단에 전체 필터를 배치하고, 하단에 검색 결과를 표시하는 구조.

필터 순서:

1. 기본 조건
   - 급여 연령
   - 사료 형태
   - 브랜드
2. 피하고 싶은 원료
   - 개별 원료 직접 입력
   - 원료 분류별 제외 버튼
3. 영양성분 조건
   - 조단백질 표시값
   - 조지방 표시값

기존의 `조건 선택 / 사료 필터` 중복 제목 제거.

상단 제목은 **사료 필터** 하나로 통일.

직접 입력과 원료 분류 선택을 한 영역으로 통합하되, 기존 검색 판정 로직은 유지.

### 4.2 제외 원료 검색

- 직접 입력한 개별 원료명에 대한 검색 지원.
- 쉼표를 이용한 다중 원료 입력 지원.
- 원료 사전의 유사 명칭·별칭 활용.
- 원료 분류 버튼을 이용한 제외 조건 지원.
- 동일 원료의 직접 입력과 분류 선택 조합 동작 확인.
- 서로 다른 원료를 직접 입력하고 분류 버튼으로 추가 선택하는 조합 동작 확인.

### 4.3 영양성분 검색

- 조단백질·조지방의 최소값 및 최대값 설정.
- 사료 형태를 먼저 선택하도록 하는 기존 검색 정책 유지.
- 최소값이 최대값보다 큰 경우 오류 표시.
- 수치 입력창의 위·아래 화살표 증감 단위는 기본 1%로 변경.
- 소수 입력이 필요한 경우 직접 입력은 허용하는 방향.
- 영양성분의 이상·이하·대표값 관련 안내문 유지.

### 4.4 검색 결과 화면

하단 제목은 **검색 결과**로 고정.

기존의 `사료 탐색` 보조 제목 제거.

검색 전 안내:

- 제목: `검색 조건을 선택해 주세요`
- 설명: `위쪽의 필터에서 원하는 조건을 선택하면 이곳에 해당 제품이 표시됩니다.`

검색 전 안내 박스 높이를 기존보다 축소하여 시각적 부담 완화.

`전체 제품 보기` 링크는 결과 영역 상단에 한 번만 표시.

검색 결과 카드에는 다음 기능 유지:

- 제품 이미지와 제품명
- 급여 연령 및 주단백질
- 영양성분 표시
- 상세정보 보기
- 구매처 보기
- 비교 선택

## 5. 제품 비교 기능

관련 파일:

- `app/compare/page.tsx`
- `components/compare/ProductComparison.tsx`

변경 사항:

- 비교표의 제조사명·제품명·항목명·데이터를 검정색 중심으로 통일.
- 표의 밝은 배경과 연한 테두리 유지.
- 제품 2개 선택 및 비교 기능 유지.
- 브라운·블루 테마와 다크모드 대응 유지.

## 6. 구매처 안내 기능

### 6.1 도입 목적

사료 검색 및 제품 비교 이후 사용자가 해당 제품의 구매 가능한 판매처를 찾아갈 수 있도록 연결.

현재 단계에서는 제휴마케팅 없이 일반 구매처 정보를 제공하는 방식으로 운영.

### 6.2 주요 기능

- Finder 제품 카드에 `구매처 보기` 링크 추가.
- 제품 상세페이지에 `구매처 안내` 영역 신설.
- 확인된 개별 판매처를 등록할 수 있도록 제품 데이터 구조 확장.
- 구매처가 별도로 등록되지 않은 제품에는 쇼핑몰 검색 링크 제공.
- 제조사 정보 출처와 판매처 링크는 별도 관리.

### 6.3 쇼핑몰 검색 운영 정책

**현재 기본 검색 경로는 네이버쇼핑만 사용.**

- 네이버쇼핑 검색 링크 정상 동작 확인.
- 쿠팡 검색 링크는 페이지 접근 권한 오류로 인해 제외.
- 링크 표기는 실제 판매가 확정된 것처럼 표현하지 않고 `네이버쇼핑에서 제품 검색` 등으로 안내.
- 가격·재고·배송 여부는 해당 쇼핑몰에서 확인하도록 안내.
- 추후 검증된 공식몰 또는 판매처별 상품 링크를 추가할 수 있도록 구조 유지.

### 6.4 관련 파일

- `types/product.ts`
- `lib/purchase-links.ts` — 신규 구매처 링크 처리 파일
- `lib/products.ts`
- `components/finder/ProductFinder.tsx`
- `app/products/[slug]/page.tsx`

제품 데이터는 `lib/products.ts`에서 `generated/products.json`을 읽는 구조임.

제품별 구매처를 정식으로 관리하려면 향후 원본 제품 데이터 및 JSON 생성 과정과 연계할 필요가 있음.

### 6.5 제품 정보 출처

기존의 `정보 출처 확인` 버튼은 구매 링크와 혼동될 수 있으므로 `제품 정보 원문 보기` 등 보다 명확한 명칭으로 변경.

`sourceUrl`은 제품 공개정보의 출처를 의미하며, 실제 구매처와 혼용하지 않음.

## 7. SEO 및 광고 관련 유지 사항

이번 UI 수정에서는 기존 검색엔진·광고 관련 설정을 유지하는 것을 원칙으로 함.

주요 설정:

- Google Analytics: 기존 GA4 측정 코드 유지
- Google AdSense: 기존 광고 스크립트 유지
- Google Search Console 및 네이버 서치어드바이저 관련 사이트 확인 설정 유지
- 페이지별 메타데이터 및 canonical 유지
- 블로그 상세페이지의 구조화 데이터 유지
- 카테고리 페이지의 기존 영구 리디렉션 로직 유지

**운영 배포 성공과 별개로**, 검색 색인 상태 및 광고 노출 성과는 각 관리 도구에서 주기적으로 확인 필요.

## 8. 개발 및 배포 절차

### 로컬 개발

```bash
npm run dev
```

### 최종 빌드

```bash
npm run build:vinext
```

### Cloudflare Workers 수동 배포

```bash
npx wrangler deploy --config dist/server/wrangler.json
```

GitHub 자동 배포가 설정된 경우 중복 배포 여부를 확인할 것.

주요 화면과 기능은 로컬에서 확인한 후 운영 배포하는 것을 원칙으로 함.

2026-10-08 기준 최종 운영 배포 및 사용자 확인 완료.

## 9. 코드 수정 및 파일 제공 원칙

향후 코드 수정 시 다음 규칙을 적용.

- 부분 코드보다 전체 교체 가능한 TSX/CSS 파일 제공 선호.
- 실제 로컬 최신 파일을 기준으로 수정.
- 기존 검색·필터·비교 로직의 불필요한 변경 금지.
- 브라운·블루 테마 변수를 유지.
- 페이지별 하드코딩된 색상을 가급적 추가하지 않음.
- 광고, SEO, Analytics 관련 기존 코드는 특별한 요청 없이 변경하지 않음.
- 수정 후 로컬 기능 테스트와 빌드 검증을 구분하여 보고.
- 배포 전에는 파일 경로 및 변경 범위 확인.

## 10. 향후 작업 과제

### 우선순위 1 — 운영 안정화

- Google Search Console 색인 및 사이트맵 상태 확인
- 네이버 서치어드바이저 등록·수집 상태 점검
- Google Analytics 유입 및 사용자 행동 확인
- AdSense 광고 표시 및 정책 관련 상태 점검
- Finder 모바일 사용성 및 검색 결과 확인

### 우선순위 2 — 제품 정보 확대

- 신규 사료 및 간식 제품 등록
- 원료 및 영양성분 정보 최신화
- 제품별 공식 판매처 데이터 확보
- 구매처 링크의 유효성 점검
- 제품 데이터 생성 과정과 구매처 데이터 연결

### 우선순위 3 — 콘텐츠 및 브랜드 운영

- 사료 비교·성분 분석 블로그 콘텐츠 확대
- 기존 글의 내부 링크와 관련 글 연결 개선
- 계절별 브라운·블루 테마 운영
- 차콜 블랙 파비콘 고정 유지
- 향후 Happy Insight 통합 브랜드 운영 구조 검토

---

## 11. 현재 확정 사항 요약

- **운영 상태:** Cloudflare Workers 배포 완료
- **기본 테마:** Brown
- **대체 테마:** Blue
- **공식 파비콘:** Charcoal Black
- **블로그 제목:** 검정색 및 축소된 글씨
- **홈페이지 섹션 간격:** 24px
- **Finder:** 기본 조건 → 제외 원료 → 영양성분 → 검색 결과
- **제품 비교:** 검정색 중심 비교표
- **구매처 안내:** 네이버쇼핑 검색 연결
- **쿠팡:** 검색 링크 제외
- **제휴마케팅:** 현재 미적용
- **개발 원칙:** 기능 유지, 전체 파일 교체, CSS 변수 기반 테마 관리

**다음 작업 시작점:** 운영 SEO·색인 상태 및 광고 운영 안정화 점검.

---

## 36. 2026-10-19 운영 현황 및 기준 우선순위

**확정·사용자 확인(2026-10-19):**

- 운영 URL: `https://catlife.happy-insight.com`
- 운영 저장소: `bizformula/catlife-insight`, 운영 브랜치 `main`
- 로컬 운영 작업 경로(사용자 Windows): `C:\Users\kdu\Desktop\애드센스\my-blog\my-blog`
- GitHub 업로드 커밋: `39708e7` (`Update Catlife posts and products`), 당시 `HEAD -> main, origin/main` 일치 확인
- **제품 JSON 165개**: 사용자 로컬 `npm run validate:products` 출력 기준 **오류 0개·경고 0개**
- 원료 사전 **51개 항목** 검증 완료
- Vinext 빌드 및 Cloudflare Workers 배포 완료, 사용자가 운영 사이트에서 **165개 제품과 추가 게시글 표시** 확인
- 사용자가 첨부한 `products(1).zip`의 JSON 165개를 별도 파싱·브랜드 집계함. 파싱 오류 0개. ZIP은 이 날짜의 **중복 검사용 스냅샷**이며, 이후 실제 최신 로컬/원격 데이터가 우선함.
- **블로그 총 게시글 수**는 최신 전체 `content/posts` 목록이 제공되지 않아 이 절에서 확정하지 않음. 이전 기록의 `14개`는 9월 기준 과거 수치임.
- 별도 로컬 경로 `C:\Users\kdu\Desktop\애드센스\catlife`는 `feature/catlife-v2` 브랜치의 미커밋 개발 변경사항을 포함했던 것으로 확인됨. **운영 `main`과 혼동하여 일괄 커밋·배포 금지**.

### 최신 정보 적용 규칙

- 구문서의 `제품 160개`, `일일 제품 20개`는 과거 상태·과거 목표로 취급하고, **현재 일일 납품 기준은 신규 제품 5개**를 우선한다.
- `PROJECT_CONTEXT.md` 설명보다 실물 코드(`types/product.ts`, `scripts/validate-products.mjs` 등)와 Production 동작을 우선 검증한다.
- 최신 ZIP·저장소 접근이 없으면 **기존 등록 제품/글과의 중복 검증을 완료했다고 단정하지 않는다.**

## 37. 매일 19:30 KST 콘텐츠 패키지 표준 (2026-10-19 확정)

**제작 기준 시각:** 매일 **19:30, Asia/Seoul (KST)**. 사용자는 **20:00~23:00**에 결과를 최종 확인하고 파일 배치·GitHub 업로드·빌드·Cloudflare 배포를 **직접 수행**한다. 제작 측에서 외부 발행, GitHub 업로드 또는 Cloudflare 배포를 실행하지 않는다. 정시 작업은 실제 예약 실행 환경이 설정된 경우에만 자동화된 것으로 간주한다.

매일 패키지 필수 구성:

1. **완성형 Markdown 게시글 1개** (`content/posts/<slug>.md`): 개요·초안·발행 설명문이 아니라 실제 게시 가능한 완전한 본문.
2. **실제 폴라 참고사진 기반 WEBP 썸네일 1개** (`public/images/posts/<slug>.webp`): 가능하면 1200×675, 폴라가 주인공.
3. **신규 사료 JSON 5개** (`content/products/<product-slug>.json`): 1제품 1파일. 등록이 적거나 미등록된 브랜드 우선.
4. **출처·검증 메모 1건** (`verification/verification-notes-YYYY-MM-DD.md`): 제품별 공식 출처·검토 결과·보류 사유·배치 및 배포 매뉴얼.
5. **신규 5제품의 제조사 공식 상세페이지 링크 5개**를 결과 메시지와 검증 메모에 모두 표시. 브랜드 홈페이지가 아니라 **해당 제품 상세 페이지**를 우선하여 사용자가 사진을 직접 확인·복사할 수 있게 한다.

- 파일이 실제로 생성되면 ZIP과 개별 다운로드 링크 제공. 생성·경로 확인 전에는 파일을 만들었다고 주장하지 않음.
- **핵심 정보 확인이 남거나 폴라 썸네일이 없으면 '즉시 발행 가능'으로 표시하지 않고 '배포 보류' 및 미완료 항목 명시.**
- 게시글 본문에는 TODO, 검토 메모, 임의 수치, 설명용 placeholder를 넣지 않음. 불확실성·배포 보류 사유는 별도의 검증 메모에 기록.
- 원료/영양/공식 링크/국가별 레시피가 확인되지 않은 제품은 임의로 보완하지 않고 출처 메모에 개별 표시.

### Markdown 및 이미지 파일 규칙

```yaml
---
title: "게시글 제목"
date: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
category: "nutrition-guide"
description: "검색 질문에 직접 답하는 소개 문장"
thumbnail: "/images/posts/<slug>.webp"
---
```

- 일일 산출물에는 `title`, `date`, `updated`, `category`, `description`, `thumbnail`을 모두 기재한다. **`category`는 기존 코드에서 허용되는 실제 값**만 사용한다. 위 `nutrition-guide`는 기존 게시글에서 확인된 예시일 뿐, 전 카테고리 목록을 뜻하지 않는다.
- 게시글과 WEBP는 **동일 영문 소문자·하이픈 slug**: `<slug>.md`, `<slug>.webp`; 이미지 URL은 `/images/posts/<slug>.webp`.
- 기존 게시글과 *검색 의도*까지 중복 비교하고, 첫 1~3문단 즉답, 정확한 설명·FAQ, 공식 근거, 유효한 내부 링크(`/blog/...`, `/products/...`, `/finder`, `/compare`) 포함. 임의의 내부 URL 생성 금지.
- 폴라는 사용자가 실제 제공한 사진을 기준으로 사용한다. 일반 고양이로 대체하거나 미확인 이미지를 폴라라고 주장하지 않음. 사진에 접근할 수 없으면 참고사진 재첨부가 필요하다고 표시한다.
- 참고로 2026-10-19 보완한 과거 게시글의 기존 이미지 경로: `cat-food-age-labels-7-11-15.webp`, `cat-food-storage-after-opening.webp` (모두 `public/images/posts/`).

## 38. 신규 제품 5개 JSON과 PNG 이미지 규칙

- **기존 `content/products/*.json` 및 `types/product.ts` 실사용 스키마 준수**. `slug`, `name`, `brand`, `summary`, `productType`, `foodForm`, `purpose`, `lifeStage`, `ingredients`, `ingredientStatus`, `guaranteedAnalysis`, `analysisBasis`, `sourceUrl`, `checkedAt` 등 실제 필요 필드 확인.
- 사료는 `"productType": "food"` 필수. 현재 Validator에서 허용된 Product Type은 `food`, `treat`이며, 모래·영양제용 enum은 아직 허용된 것으로 **간주하지 않음**.
- 가능하다면 제조사 제품 상세페이지에서 실제 제품 이미지를 확보하여 `public/images/products/<product-slug>.png`로 저장. JSON은 `"image": "/images/products/<product-slug>.png"`; **JSON 파일명과 PNG의 확장자 제외 파일명이 정확히 일치**해야 한다.
- **이미지 파일을 실제 확보하지 못하면 `image` 필드를 넣지 않는다.** 가짜 경로 금지. 공식 제품 상세 링크는 이미지 수동 확보용으로 별도 제공. 확보 이미지는 제품·포장 일치 및 이용 권한·출처를 검토.
- 공식 원재료 전체 목록과 보증성분(최소·최대·대표값 `min`, `max`, `typical`)을 출처 기준 그대로 반영. 공개되지 않은 수치·배합비·열량은 임의 추정하지 않는다.
- `ingredientStatus`는 **14개 그룹 모두 명시**: `chicken`, `turkey`, `duck`, `quail`, `beef`, `pork`, `fish`, `dairy`, `egg`, `grain`, `legume`, `pseudograin`, `starch`, `vegetable`.
- 값은 `contains`, `not-listed`, `unknown`만 허용. `not-listed`는 **공식 원료 목록에 명시되지 않음**이지 무함유·알레르기 안전성 보증이 아님. 원료 불명확 시 `unknown`.
- `ingredientDetails`와 `ingredientStatus`의 그룹 일치 검증. `sourceUrl`은 제조사 정보 출처이며 네이버쇼핑 같은 **구매처 URL과 혼용 금지**. 국내 판매 제품과 해외 공식 레시피·표시가 다른지 별도 점검.
- 일일 결과물 작성 후 `npm run validate:products`로 데이터 검증을 사용자 로컬에서 재실행하고, **오류 0개·경고 0개**를 목표로 한다. 2026-10-19 신규 5제품의 최초 경고 42개는 `ingredientStatus` 보완 후 사용자 로컬에서 최종 **0/0** 확인.

## 39. 165개 제품 브랜드별 베이스라인 및 선정 규칙

**근거:** 사용자가 첨부한 `products(1).zip`의 `content/products` JSON 165개(2026-10-19 집계). 실제 브랜드 문자열 기준 15종.

| 브랜드 (`brand` 원문) | 등록 수 |
|---|---:|
| 로얄캐닌 | 47 |
| 파미나 | 21 |
| 뉴트로 | 21 |
| 인스팅트 | 20 |
| 퓨리나 프로플랜 | 20 |
| 힐스 사이언스 다이어트 | 18 |
| 오리젠 | 5 |
| 아카나 | 4 |
| 힐스 | 2 |
| 지위픽 | 2 |
| 눌로 | 1 |
| 퓨어네이쳐 | 1 |
| 티키캣 | 1 |
| 웰니스 | 1 |
| 워루바 | 1 |
| **합계** | **165** |

- 우선 확장 후보(각 1개 등록): **티키캣, 눌로, 워루바, 웰니스, 퓨어네이쳐**. 그 다음은 2개 등록 브랜드(지위픽, 힐스) 등.
- `힐스`(2개)와 `힐스 사이언스 다이어트`(18개)는 **별도 문자열로 집계**됨. 동일 브랜드·제품군 여부와 데이터 규칙을 확인한 후 통일 검토; 자동 치환 금지.
- 신규 선정 시 **최신 전체 JSON 기준 slug·제품명·브랜드·사양(맛, 건식/습식, 생애주기)**으로 중복 검사. 현재 165개 ZIP은 기준 스냅샷일 뿐 매일 실시간 목록이 아님.
- 미등록 브랜드도 공식 제품 정보가 충분하면 후보에 포함. 각 브랜드의 신규 등록 후 개수와 제외 사유를 검증 메모에 기록.
- 등록 편중 완화는 목표지만 공식 정보의 정확성을 희생해 5개를 억지로 채우지 않는다.

## 40. 사용자 수동 GitHub 업로드 및 Cloudflare Workers 배포 절차

**운영 폴더** `C:\Users\kdu\Desktop\애드센스\my-blog\my-blog`에서만 운영 배포. `catlife` v2 feature 브랜치는 별도 검증·병합 전 배포 대상 아님.

```powershell
# 1. 파일을 각 원본 디렉터리에 복사, 폴라/제품 이미지 실제 존재 확인
cd "C:\Users\kdu\Desktop\애드센스\my-blog\my-blog"
git branch --show-current
git status

# 2. 제품 검증 및 Vinext 빌드 (성공 확인 후 다음 단계 진행)
npm run validate:products
npm run build:vinext

# 3. 의도한 콘텐츠 파일만 스테이징 및 검토
git add content/posts content/products public/images/posts public/images/products
git diff --cached --stat
git diff --cached --name-status

# 4. 변경 파일이 의도한 것과 일치할 때만 커밋/푸시
git commit -m "Update Catlife daily content"
git push origin main

# 5. Cloudflare Worker 수동 배포 (Cloudflare 자동배포 설정 여부 사전 확인)
npx wrangler deploy --config dist/server/wrangler.json

# 6. 운영 확인
git status
```

- 기존 문서의 Windows **우선 배포 명령은 `npx wrangler deploy --config dist/server/wrangler.json`**. `npm run deploy:vinext`도 `package.json`에 존재하지만, 기존 문서가 기록한 Windows 실행 이력 때문에 **우선 명령을 임의로 교체하지 않음**.
- `wrangler.jsonc`: Worker 이름 `catlife-insight`, `main`은 `vinext/server/fetch-handler`, `assets.directory`는 `dist/client`; 실제 빌드 후 배포는 `dist/server/wrangler.json`을 사용.
- GitHub 커밋/푸시 성공이 Cloudflare 배포 성공을 의미하지 않음. 배포 로그·운영 페이지를 별도로 확인.
- 배포 후 `/blog/<slug>`, `/products/<product-slug>`, `/finder`, `/compare` 및 각 이미지 URL의 200 응답과 표시 결과 확인. 기존 기능, 모바일, SEO, AdSense, Analytics에 문제가 없는지도 확인.
- `git add .` 금지(예상 외 변경 시). `git diff --cached --stat`로 **삭제/이름변경**까지 확인. JSON/이미지 수정만 있다면 해당 파일만 스테이징 가능.
- PowerShell에서 LF→CRLF는 일반적으로 줄바꿈 안내이지만 데이터 파싱·파일명 변경 등 실제 오류는 구분해서 검토. `git diff` 출력이 `(END)`에 멈추면 `q`로 종료.
- `git status`가 깨끗하면 이미 커밋되었을 수 있으므로 중복 커밋을 강행하지 않음. 마지막 커밋·파일 포함 여부는 `git log -3 --oneline`, `git ls-tree -r --name-only HEAD`로 확인.

## 41. 일일 검증 메모 필수 목차 및 배포 보류 규칙

매일 `verification/verification-notes-YYYY-MM-DD.md`는 아래 항목을 포함한다.

1. 제작 날짜/기준 저장소 커밋 또는 ZIP 스냅샷 시점, 총 제품·브랜드 등록 수, 실제 중복 검사 범위
2. 게시글 주제·키워드·검색 의도, YAML Front Matter 및 실제 내부 링크 확인
3. 폴라 원본 참고 여부, 썸네일 파일명·크기·WEBP 생성/저장 상태
4. 신규 사료 5종: 브랜드별 기존 등록 수, 신규 제품 slug 및 제품명, 제조사 **공식 상세페이지 직접 링크**, 이미지 확보 여부·이미지 파일 경로
5. 공식 원료·영양성분·분석 기준·국가별 레시피 확인 근거, 불확실한 내용과 보류 사유
6. `ingredientStatus` 14개 전수 검사, `image` 경로의 물리 파일 유무, JSON 구조 및 `validate:products` 검사 결과(실제 실행 여부 구분)
7. Markdown/제품/이미지 파일 배치 경로, 명시적 `git add`·커밋·푸시 명령과 Vinext 빌드·Wrangler 배포 명령
8. 빌드·배포 전 체크리스트, 운영 블로그·제품 상세·Finder/Compare·이미지 실물 확인 체크리스트
9. 상태 표시: **제작 완료 / 로컬 검증 필요 / 배포 보류 / 배포 확인 완료** 등, 확인한 근거에 한해 표기

**실행 경계:** 제작자는 결과 파일과 사용 설명만 제공하고 GitHub 업로드·외부 발행·Cloudflare Production 배포는 **사용자의 명시적 별도 요청이 없는 한 수행하지 않음**. 현재 확정된 일일 운영 모델은 **사용자 직접 배포**임.

# Catlife Insight - Project Context

최종 갱신: 2026-08-28

## 1. 프로젝트 개요

Catlife Insight는 고양이 사료와 간식의 공개된 원재료 및 영양정보를 구조화하여,
사용자가 원하는 조건으로 제품을 탐색하고 비교할 수 있도록 만드는 정보형 웹사이트이다.

단순 후기나 별점 중심 사이트가 아니라 다음을 핵심으로 한다.

- 공식 제품 정보 기반 데이터 구축
- 피하고 싶은 원료를 제외하는 Finder
- 생애주기, 사료 형태, 브랜드 등에 따른 제품 탐색
- 제품별 원재료 및 영양성분 정보 제공
- 두 제품 간 비교 기능
- 원료 분류 기준 및 원료 사전 제공
- 고양이 영양 및 사료 표시 관련 정보성 블로그 운영
- 제품 데이터의 지속적인 확장과 갱신

메인 메시지:

> 피하고 싶은 원료를 제외하고 우리 고양이에게 맞는 사료를 찾아보세요.

제품을 자동으로 평가하거나 특정 제품을 좋은 사료 또는 나쁜 사료로 단정하는 것이 목적이 아니다.

확인 가능한 데이터를 구조화하고,
사용자가 자신의 조건에 맞게 후보를 찾고 비교할 수 있도록 하는 것이 핵심이다.

---

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

---

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

---

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

---

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

---

## 6. 현재 제품 데이터 상태

현재 등록 제품 수:

```text
21개
```

제품 원본:

```text
content/products/*.json
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

---

## 7. 제품 기본 분류

### Product Type

```text
food
treat
```

의미:

```text
food  → 사료
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
dry    → 건식
wet    → 습식
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
complete      → 주식 / 완전사료
supplementary → 보조사료
```

### Life Stage

```text
kitten
adult
senior
all
```

---

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

---

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

---

## 10. 원료 판정 원칙

원료 정보는 다음 우선순위로 확인한다.

1. 제조사 공식 제품 페이지
2. 제조사가 공개한 공식 제품 라벨 또는 포장
3. 공식 수입사 또는 공식 유통사
4. 필요한 경우 신뢰할 수 있는 보조 자료

기본 원칙:

- 공식 표기를 가능한 한 그대로 보존한다.
- 원료명을 임의로 더 구체적인 원료로 바꾸지 않는다.
- 공개되지 않은 동물 종을 추정하지 않는다.
- 공개되지 않은 배합 비율을 추정하지 않는다.
- `not-listed`를 `free from` 또는 `절대 없음`으로 표현하지 않는다.
- 정보가 불충분하면 `unknown`을 사용한다.
- 실제 구매 제품의 최신 포장이 사이트 데이터보다 우선한다.

---

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

---

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

---

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

---

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

---

## 15. 블로그 시스템

블로그 원본:

```text
content/posts/*.md
```

현재 글 수:

```text
7개
```

현재 글:

```text
cat-treat-feeding-guide.md
chicken-ingredient-guide.md
dry-matter-basis.md
dry-vs-wet-cat-food.md
how-to-read-cat-food-label.md
how-to-read-product-analysis.md
pola-food-change-story.md
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

---

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

---

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

---

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

---

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

---

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

---

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

---

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

---

## 23. Production 배포 절차

일반적인 콘텐츠 또는 코드 수정 후:

```text
1. 파일 수정
2. npm run validate:products
   - 제품 데이터 변경이 있을 때
3. npm run build:vinext
4. 생성 데이터 확인
5. git status
6. 의도한 파일만 git add
7. git commit
8. git push origin main
9. npx wrangler deploy --config dist/server/wrangler.json
10. Production 페이지 확인
```

블로그 Markdown만 수정한 경우에도:

```bash
npm run build:vinext
```

로 생성 및 Cloudflare용 build를 확인한다.

---

## 24. 새 제품 추가 표준 절차

```text
1. 제조사 공식 제품 페이지 확인
2. 공식 원재료 확인
3. 공식 영양성분 확인
4. 제품 slug 결정
5. 제품 JSON 작성
6. 제품 이미지 저장
7. ingredientStatus 작성 및 검토
8. ingredientDetails 필요 여부 검토
9. sourceUrl 기록
10. checkedAt 기록
11. npm run validate:products
12. npm run build:vinext
13. Finder 확인
14. 제품 목록 확인
15. 제품 상세 확인
16. Compare 확인
17. git status
18. 의도한 파일만 git add
19. git commit
20. git push origin main
21. Wrangler 배포
22. Production 확인
```

---

## 25. 새 블로그 글 작성 절차

```text
1. 검색 의도와 주제 결정
2. 공식·전문 출처 조사
3. content/posts/{slug}.md 작성
4. title 작성
5. date 작성
6. 필요하면 updated 작성
7. category 작성
8. description 작성
9. thumbnail 연결
10. 내부 링크 추가
11. 과도한 단정 표현 확인
12. 의료적 내용이 있으면 진단·치료 표현 주의
13. npm run build:vinext
14. generated/posts.json 확인
15. git status
16. 의도한 파일만 git add
17. commit / push
18. Wrangler 배포
19. Production 확인
20. 필요하면 BlogPosting 구조화 데이터 확인
```

---

## 26. Git 작업 원칙

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

---

## 27. 코드 변경 시 우선 확인할 파일

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

---

## 28. 개발 시 중요 원칙

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

### 의료 관련 표현

질환, 알레르기, 검사 결과, 처방식 등과 관련된 내용은
특정 원료나 사료가 질환의 원인 또는 치료 효과가 있다고 임의로 단정하지 않는다.

시간적 선후관계와 인과관계를 구분한다.

질환별 식이 선택은 담당 수의사의 판단이 우선한다.

---

## 29. 현재 완료된 주요 기능

현재 완료 및 확인된 기능:

- 제품별 JSON 데이터 관리
- 제품 이미지
- 21개 제품 데이터
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
- 블로그 7개
- 자동 목차
- 관련 글
- Sitemap
- robots.txt
- canonical URL
- BlogPosting JSON-LD
- dateModified 지원
- Google Analytics 4
- Google AdSense
- 모바일 Anchor 광고
- Cloudflare Workers Production 배포

---

## 30. 현재 우선순위

현재 큰 기반 기능은 구축된 상태다.

앞으로는 다음 순서의 개선을 우선 고려한다.

### 1. 제품 데이터 확대

공식 제조사 정보를 기준으로 등록 제품 수를 지속적으로 늘린다.

### 2. 기존 제품 정보 갱신

`checkedAt`이 오래된 제품부터 리뉴얼 여부를 확인한다.

### 3. 원료 사전 확대

제품이 늘어나면서 등장하는 새로운 원료와 별칭을 정리한다.

### 4. 블로그 콘텐츠 확대

Finder와 Compare 사용에 실질적으로 도움이 되는 주제를 우선한다.

예:

```text
특정 원료 읽는 법
보증성분 이해
칼슘·인 정보 읽는 법
열량 비교
생애주기별 사료 표시
처방식 표시 이해
간식과 보조사료 구분
```

### 5. 구조화 데이터 확장 검토

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

---

## 31. 작업 시작 시 반드시 확인

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

Catlife Insight: purchase source update

교체/추가할 파일:
- types/product.ts (교체)
- lib/products.ts (내용 그대로, 교체 불필요)
- lib/purchase-links.ts (신규)
- components/finder/ProductFinder.tsx (교체)
- app/products/[slug]/page.tsx (교체)

기능:
- 제품 상세: 구매처 안내 (쇼핑몰 검색 링크 + 검증된 판매처 선택 표시)
- Finder: 구매처 보기 -> 해당 상세페이지 구매처 영역
- sourceUrl 제품정보 원문 별도 보존
- 실제 판매처 확정 정보는 product.purchaseLinks에 저장
- 구매 가능/재고를 확정하지 않음, 제휴 링크 사용하지 않음
- 기존 브라운/블루 CSS 변수 사용

주의: generated/products.json은 자동생성 데이터이므로 이 파일을 직접 바꾸지 말고 원본 제품 데이터에 purchaseLinks를 추가하세요. 제품 생성 파이프라인은 별도 확인이 필요합니다.

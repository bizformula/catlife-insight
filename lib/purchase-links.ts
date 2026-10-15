import type { Product, PurchaseLink } from "@/types/product";

/** 직접 확인된 판매처만 '구매처'로 표시합니다. */
export function getVerifiedPurchaseLinks(product: Product): PurchaseLink[] {
  return (product.purchaseLinks ?? []).filter((item) => {
    if (!item.name?.trim()) return false;
    try {
      const url = new URL(item.url);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  });
}

/** 검색 결과로 이동할 뿐, 입점이나 재고를 보증하지 않습니다. */
export function getPurchaseSearchLinks(product: Product): PurchaseLink[] {
  const query = encodeURIComponent(`${product.brand} ${product.name}`);
  return [
    { name: "네이버쇼핑에서 검색", url: `https://search.shopping.naver.com/search/all?query=${query}` },
  ];
}

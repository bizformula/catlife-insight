// About page describing blog purpose and content strategy.
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl rounded-md border border-[var(--border)] p-6">
      <h1 className="mb-4 text-3xl font-bold">블로그 소개</h1>
      <p className="mb-3">
        이 블로그는 검색 트래픽 기반 수익화를 목표로, 실무형 정보와 검증된 팁을 마크다운으로
        발행합니다.
      </p>
      <p>콘텐츠는 정적 생성(SSG)으로 제공되어 빠른 로딩과 SEO 친화적인 구조를 유지합니다.</p>
    </section>
  );
}

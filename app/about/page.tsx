import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개 | Catlife Insight",
  description:
    "Catlife Insight를 시작한 이유와 제품 정보를 정리하는 원칙을 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          ABOUT CAT LIFE INSIGHT
        </p>

        <h1 className="mb-4 text-3xl font-bold">
          Catlife Insight 소개
        </h1>

        <p className="text-lg leading-8 text-[var(--foreground)]">
          고양이의 먹거리와 생활용품을 선택할 때 필요한 정보를
          더 쉽게 찾고 비교할 수 있도록 정리합니다.
        </p>
      </header>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-2xl font-bold">
          폴라의 사료를 찾으며 시작했습니다
        </h2>

        <div className="space-y-4 leading-8">
          <p>
            반려묘 폴라의 알레르기 검사 결과와 건강검진 결과를
            확인한 뒤, 기존 사료를 계속 먹여도 될지 고민하게
            되었습니다.
          </p>

          <p>
            하지만 제품마다 원재료 표시 방식이 달랐고, 피하고
            싶은 원료가 들어 있는지 확인하려면 여러 제품의
            성분표를 하나씩 읽고 대조해야 했습니다.
          </p>

          <p>
            이후 사료를 변경하고 재검사를 진행했을 때 검사
            수치가 낮아진 것을 확인했습니다. 다만 이것은 폴라에게
            관찰된 개인적인 경험이며, 특정 사료가 수치를 낮췄다는
            인과관계나 치료 효과를 의미하지 않습니다.
          </p>

          <p>
            이 과정에서 겪은 불편을 줄이고, 다른 보호자도 제품
            표시사항을 조금 더 쉽게 확인할 수 있도록
            Catlife Insight를 만들었습니다.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-5 text-2xl font-bold">
          정보를 정리하는 원칙
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              출처를 함께 기록합니다
            </h3>

            <p className="text-sm leading-6">
              제조사 공식 페이지와 제품 표시사항을 우선 확인하고,
              정보 출처와 확인 날짜를 제품 정보에 함께 기록합니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              모르는 것은 추정하지 않습니다
            </h3>

            <p className="text-sm leading-6">
              원료가 표시되지 않은 경우와 정보가 부족해 확인할
              수 없는 경우를 구분합니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              원료 형태를 구분합니다
            </h3>

            <p className="text-sm leading-6">
              원물뿐 아니라 가수분해 단백질, 지방, 오일, 전분,
              추출물 등의 형태도 가능한 범위에서 구분합니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              광고와 정보 기준을 분리합니다
            </h3>

            <p className="text-sm leading-6">
              향후 제휴 링크가 포함되더라도 수수료 여부가 검색
              결과나 제품 정보의 판정 기준에 영향을 주지 않도록
              운영합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="mb-8 rounded-xl bg-[var(--muted)] p-6">
        <h2 className="mb-3 text-xl font-bold">
          검색 결과의 의미
        </h2>

        <div className="space-y-3 text-sm leading-6">
          <p>
            사료 찾기의 결과는 확인한 원재료 표시에서 사용자가
            선택한 원료를 대조한 결과입니다.
          </p>

          <p>
            ‘표시 원재료에 없음’은 제조 과정의 교차 접촉이나
            복합 원료 안의 포함 가능성까지 없다는 보장이 아닙니다.
          </p>

          <p>
            알레르기 검사 결과, 증상, 질환에 따른 진단이나 사료
            처방을 제공하지 않으며 수의사의 진료와 상담을 대신하지
            않습니다.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/finder"
          className="rounded-lg bg-[#2563EB] px-5 py-3 font-semibold !text-white"
        >
          사료 찾기
        </Link>

        <Link
          href="/compare"
          className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold !text-[var(--foreground)]"
        >
          제품 비교
        </Link>
      </div>
    </main>
  );
}ㅞㅡ
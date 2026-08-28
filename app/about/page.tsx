import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description:
    "폴라와 함께 사료, 간식, 모래와 생활환경을 살펴보며 시작한 Catlife Insight의 이야기와 정보 정리 원칙을 소개합니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          ABOUT CATLIFE INSIGHT
        </p>

        <h1 className="mb-4 text-3xl font-bold">
          Catlife Insight 소개
        </h1>

        <p className="text-lg leading-8 text-[var(--foreground)]">
          고양이의 먹거리와 생활환경을 더 꼼꼼히 살펴보고,
          선택에 필요한 정보를 찾고 비교할 수 있도록 정리합니다.
        </p>
      </header>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-2xl font-bold">
          폴라를 위해 하나씩 확인하면서 시작했습니다
        </h2>

        <div className="space-y-4 leading-8">
          <p>
            반려묘 폴라의 알레르기 검사와 건강검진 결과를
            확인하면서, 평소 먹이던 사료와 생활환경을 하나씩
            다시 살펴보기 시작했습니다.
          </p>

          <p>
            사료를 고를 때는 제품마다 원재료 표시 방식이 달랐고,
            피하고 싶은 원료가 포함되어 있는지 확인하려면 여러
            제품의 원재료와 영양정보를 하나씩 찾아보고 비교해야
            했습니다.
          </p>

          <p>
            고민은 먹거리에서 끝나지 않았습니다. 폴라가 매일
            사용하는 모래와 주변 생활환경도 함께 살펴보게 되었고,
            실제로 사용하는 제품을 바꾸면서 변화 과정을 기록하고
            확인하기 시작했습니다.
          </p>

          <p>
            사료나 모래를 바꾼 뒤 관찰된 변화는 폴라에게서 있었던
            개인적인 경험입니다. 특정 제품이나 특정 변경이 검사
            결과나 건강 상태를 직접 변화시켰다는 인과관계를
            의미하지는 않습니다.
          </p>

          <p>
            이렇게 하나씩 확인하면서 겪은 불편과 경험을 바탕으로,
            다른 보호자도 고양이의 먹거리와 생활환경을 살펴볼 때
            필요한 정보를 조금 더 쉽게 찾을 수 있도록
            Catlife Insight를 만들었습니다.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-5 text-2xl font-bold">
          지금 Catlife Insight에서 하는 일
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              사료 정보를 구조화합니다
            </h3>

            <p className="text-sm leading-6">
              제조사에 공개된 원재료, 영양성분, 제품 형태,
              생애주기 등의 정보를 일정한 기준으로 정리합니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              원하는 조건으로 찾아봅니다
            </h3>

            <p className="text-sm leading-6">
              Finder를 이용해 피하고 싶은 원료, 사료 형태,
              생애주기 등의 조건으로 제품 후보를 살펴볼 수 있습니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              같은 기준으로 비교합니다
            </h3>

            <p className="text-sm leading-6">
              Compare에서 두 제품의 원재료와 주요 영양정보를
              같은 기준으로 나란히 확인할 수 있습니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              폴라의 경험도 기록합니다
            </h3>

            <p className="text-sm leading-6">
              사료와 간식뿐 아니라 모래와 생활환경을 바꾸면서
              직접 확인하고 경험한 과정도 과장 없이 기록합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-5 text-2xl font-bold">
          정보를 정리하는 원칙
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              확인할 수 있는 정보를 우선합니다
            </h3>

            <p className="text-sm leading-6">
              제품 정보는 제조사 공식 페이지와 제품 표시사항을
              우선 확인하고, 가능한 경우 출처와 확인 날짜를 함께
              기록합니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              모르는 것은 추정하지 않습니다
            </h3>

            <p className="text-sm leading-6">
              공개된 정보만으로 확인할 수 없는 내용은 임의로
              단정하거나 추정해서 채우지 않습니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              경험과 인과관계를 구분합니다
            </h3>

            <p className="text-sm leading-6">
              폴라에게 실제로 관찰된 경험은 기록하되, 제품 변경과
              건강 상태 사이의 인과관계가 확인되지 않은 경우 이를
              치료 효과처럼 표현하지 않습니다.
            </p>
          </article>

          <article className="rounded-xl border border-[var(--border)] p-5">
            <h3 className="mb-2 font-bold">
              광고와 정보 기준을 분리합니다
            </h3>

            <p className="text-sm leading-6">
              광고나 향후 제휴 여부가 제품 정보의 정리 기준,
              Finder 결과 또는 비교 기준에 영향을 주지 않도록
              운영합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="mb-8 rounded-xl bg-[var(--muted)] p-6">
        <h2 className="mb-3 text-xl font-bold">
          사이트의 정보를 볼 때 알아두세요
        </h2>

        <div className="space-y-3 text-sm leading-6">
          <p>
            Finder 결과는 Catlife Insight에서 확인한 제품의
            공개 원재료 정보와 사용자가 선택한 조건을 대조한
            결과입니다.
          </p>

          <p>
            ‘표시 원재료에 없음’은 확인한 원재료 목록에 해당
            원료가 표시되어 있지 않다는 의미이며, 제조 과정의
            교차 접촉이나 복합 원료 내부의 포함 가능성까지
            없다는 것을 보장하지 않습니다.
          </p>

          <p>
            제품 정보는 리뉴얼이나 표시 변경에 따라 달라질 수
            있으므로, 특정 원료를 반드시 피해야 하는 경우에는
            제조사의 최신 정보와 실제 제품 포장을 최종적으로
            확인해 주세요.
          </p>
        </div>
      </section>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-3 text-xl font-bold">
          Catlife Insight가 하지 않는 일
        </h2>

        <div className="space-y-3 text-sm leading-6">
          <p>
            특정 사료나 생활용품을 자동으로 좋은 제품 또는
            나쁜 제품으로 평가하거나 단정하지 않습니다.
          </p>

          <p>
            폴라의 경험을 모든 고양이에게 동일하게 적용되는
            결과처럼 설명하지 않습니다.
          </p>

          <p>
            개별 고양이의 검사 결과나 증상을 바탕으로 진단,
            치료 또는 처방을 제공하지 않으며 필요한 경우
            수의사의 진료와 상담을 대신하지 않습니다.
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

        <Link
          href="/blog"
          className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold !text-[var(--foreground)]"
        >
          블로그 보기
        </Link>
      </div>
    </main>
  );
}
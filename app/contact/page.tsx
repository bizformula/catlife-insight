import type { Metadata } from "next";

const CONTACT_EMAIL = "contact@happy-insight.com";

export const metadata: Metadata = {
  title: "문의",
  description:
    "Catlife Insight의 제품 정보 수정, 사이트 이용, 콘텐츠 및 제휴 관련 문의 안내입니다.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const subject = encodeURIComponent(
    "[Catlife Insight] 문의"
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          CONTACT
        </p>

        <h1 className="mb-4 text-3xl font-bold">
          문의
        </h1>

        <p className="leading-7">
          제품 정보의 오류, 출처 변경, 사이트 이용, 콘텐츠와
          관련된 의견을 보내주세요.
        </p>
      </header>

      <section className="mb-8 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-3 text-xl font-bold">
          이메일 문의
        </h2>

        <p className="mb-5 text-sm leading-7">
          아래 버튼을 누르면 사용 중인 이메일 프로그램이
          열립니다. 확인 후 순차적으로 답변드리며,
          답변에는 시간이 걸릴 수 있습니다.
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${subject}`}
          className="inline-block rounded-lg bg-[#2563EB] px-5 py-3 font-semibold !text-white"
        >
          이메일 보내기
        </a>

        <p className="mt-4 break-all text-sm text-[var(--muted-foreground)]">
          {CONTACT_EMAIL}
        </p>
      </section>

      <section className="rounded-xl bg-[var(--muted)] p-6">
        <h2 className="mb-3 text-xl font-bold">
          문의 전 확인해 주세요
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          <li>
            사료·간식 등 제품 정보의 오류를 제보할 때는
            제품명과 확인한 공식 출처 주소를 함께 보내주세요.
          </li>

          <li>
            모래나 생활환경 관련 제품과 콘텐츠에 대한 의견도
            보내실 수 있습니다.
          </li>

          <li>
            검사표, 진료기록 또는 제품 포장 사진을 보낼 때는
            보호자 이름, 연락처, 검사번호 등 개인정보를
            가려주세요.
          </li>

          <li>
            개별 반려묘에 대한 진단, 치료 또는 처방식 추천
            문의에는 답변하지 않습니다.
          </li>

          <li>
            광고 및 제휴 관련 문의는 해당 사실을 제목에
            표시해 주세요.
          </li>
        </ul>
      </section>
    </main>
  );
}
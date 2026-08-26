import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Catlife Insight",
  description:
    "Catlife Insight의 개인정보 처리 및 서비스 이용 기록에 관한 안내입니다.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm font-semibold text-[#2563EB]">
          PRIVACY POLICY
        </p>

        <h1 className="mb-4 text-3xl font-bold">
          개인정보처리방침
        </h1>

        <p className="leading-7">
          Catlife Insight는 이용자의 개인정보를 중요하게
          생각하며, 현재 제공하는 기능과 실제 운영 방식에 맞춰
          다음과 같이 안내합니다.
        </p>
      </header>

      <div className="space-y-8">
        <PolicySection title="1. 현재 제공하는 서비스">
          <p>
            현재 Catlife Insight는 회원가입, 로그인, 댓글,
            제품 구매 및 검사 결과 업로드 기능을 제공하지
            않습니다.
          </p>

          <p>
            사료 찾기에 입력한 제외 원료는 이용자의 브라우저에서
            검색 결과를 계산하는 데 사용되며 별도의 회원
            데이터베이스에 저장하지 않습니다.
          </p>
        </PolicySection>

        <PolicySection title="2. 문의 시 처리되는 정보">
          <p>
            이용자가 문의 기능 또는 이메일을 통해 직접 연락하는
            경우 이메일 주소, 문의 내용과 이용자가 자발적으로
            제공한 정보가 처리될 수 있습니다.
          </p>

          <p>
            해당 정보는 문의 확인과 답변 목적으로만 사용하며,
            관련 법령상 보관 의무가 있는 경우를 제외하고 목적
            달성 후 불필요한 정보는 삭제합니다.
          </p>
        </PolicySection>

        <PolicySection title="3. 자동으로 처리될 수 있는 정보">
          <p>
            사이트는 Vercel을 통해 제공됩니다. 서비스 운영,
            보안, 장애 확인 과정에서 IP 주소, 브라우저 정보,
            접속 시각, 요청 URL 등의 기술적인 접속 정보가
            호스팅 사업자에 의해 처리될 수 있습니다.
          </p>

          <a
            href="https://vercel.com/legal/privacy-notice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#2563EB] hover:underline"
          >
            Vercel 개인정보 안내 확인
          </a>
        </PolicySection>

        <PolicySection title="4. 테마 설정 저장">
          <p>
            밝은 모드와 어두운 모드 선택값은 이용자의 기기에 있는
            브라우저 저장공간(localStorage)에 저장됩니다.
          </p>

          <p>
            이 값은 화면 테마를 유지하기 위한 용도로만 사용하며,
            운영자의 서버로 별도 전송하지 않습니다.
          </p>
        </PolicySection>

        <PolicySection title="5. 외부 사이트 링크">
          <p>
            제품 정보의 출처 확인을 위해 제조사, 판매처 등 외부
            사이트로 연결되는 링크를 제공할 수 있습니다.
          </p>

          <p>
            외부 사이트에서 이루어지는 개인정보 처리는 해당
            사이트의 개인정보처리방침을 따릅니다.
          </p>
        </PolicySection>

        <PolicySection title="6. 광고 및 제휴 서비스">
          <p>
            현재 사이트에 Google AdSense 및 제휴 마케팅 서비스를
            적용하기 전이라면, 해당 서비스의 광고 쿠키와 제휴
            추적 기능은 사용하지 않습니다.
          </p>

          <p>
            향후 광고 또는 제휴 서비스를 도입할 경우 실제 사용
            서비스, 쿠키, 데이터 처리 및 이용자의 선택 방법을
            반영하여 본 방침을 개정하고 별도로 고지합니다.
          </p>
        </PolicySection>

        <PolicySection title="7. 건강 및 검사 정보">
          <p>
            Catlife Insight는 이용자의 반려동물 검사 결과나
            진료기록을 업로드받아 저장하는 기능을 현재 제공하지
            않습니다.
          </p>

          <p>
            문의 과정에서도 보호자 이름, 연락처, 검사번호,
            병원명 등 불필요한 개인정보나 민감한 기록을 보내지
            않도록 주의해 주세요.
          </p>
        </PolicySection>

        <PolicySection title="8. 이용자의 요청">
          <p>
            이용자는 자신이 문의 과정에서 제공한 정보에 대해
            열람, 정정 또는 삭제를 요청할 수 있습니다.
          </p>

          <Link
            href="/contact"
            className="inline-block text-[#2563EB] hover:underline"
          >
            문의 페이지로 이동
          </Link>
        </PolicySection>

        <PolicySection title="9. 방침의 변경">
          <p>
            서비스 기능, 광고·제휴 서비스 또는 관련 법령이
            변경되는 경우 본 방침을 수정할 수 있습니다. 중요한
            변경사항은 사이트를 통해 안내합니다.
          </p>
        </PolicySection>
      </div>

      <p className="mt-10 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-foreground)]">
        시행일: 2026년 8월 20일
      </p>
    </main>
  );
}

type PolicySectionProps = {
  title: string;
  children: React.ReactNode;
};

function PolicySection({
  title,
  children,
}: PolicySectionProps) {
  return (
    <section className="rounded-xl border border-[var(--border)] p-6">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="space-y-3 text-sm leading-7">
        {children}
      </div>
    </section>
  );
}
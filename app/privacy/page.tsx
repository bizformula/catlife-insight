import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "Catlife Insight의 개인정보 처리, 서비스 이용 기록, Google Analytics, Google AdSense 및 Cloudflare 이용에 관한 안내입니다.",
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
          Catlife Insight는 이용자의 개인정보와 서비스 이용 정보를
          중요하게 생각하며, 현재 제공하는 기능과 실제 운영 환경을
          기준으로 다음과 같이 안내합니다.
        </p>
      </header>

      <div className="space-y-8">
        <PolicySection title="1. 현재 제공하는 서비스">
          <p>
            현재 Catlife Insight는 회원가입, 로그인, 댓글, 제품
            구매 또는 이용자의 검사 결과와 진료기록을 업로드하여
            저장하는 기능을 제공하지 않습니다.
          </p>

          <p>
            사료 찾기에서 선택한 제외 원료는 제품 검색 결과를
            제공하기 위한 용도로 사용되며, 별도의 회원 계정
            정보로 저장하지 않습니다.
          </p>
        </PolicySection>

        <PolicySection title="2. 문의 시 처리되는 정보">
          <p>
            이용자가 문의 페이지에 안내된 이메일을 통해 직접
            연락하는 경우 이메일 주소, 문의 내용과 이용자가
            자발적으로 제공한 정보가 처리될 수 있습니다.
          </p>

          <p>
            해당 정보는 문의 확인과 답변을 위한 목적으로
            사용합니다. 관련 법령상 보관 의무가 있는 경우를
            제외하고, 보관 필요성이 없어진 정보는 불필요하게
            계속 보관하지 않습니다.
          </p>

          <Link
            href="/contact"
            className="inline-block text-[#2563EB] hover:underline"
          >
            문의 페이지로 이동
          </Link>
        </PolicySection>

        <PolicySection title="3. 호스팅 및 서비스 운영">
          <p>
            Catlife Insight는 Cloudflare Workers를 이용하여
            서비스를 제공합니다.
          </p>

          <p>
            사이트 제공, 네트워크 운영, 보안, 장애 확인 등의
            과정에서 IP 주소, 브라우저 및 기기 정보, 접속 시각,
            요청 URL과 같은 기술적인 정보가 Cloudflare에 의해
            처리될 수 있습니다.
          </p>

          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#2563EB] hover:underline"
          >
            Cloudflare 개인정보처리방침 확인
          </a>
        </PolicySection>

        <PolicySection title="4. Google Analytics">
          <p>
            Catlife Insight는 사이트 이용 현황을 파악하고
            콘텐츠와 서비스를 개선하기 위해 Google Analytics 4를
            사용합니다.
          </p>

          <p>
            이 과정에서 방문한 페이지, 접속 환경, 유입 경로,
            브라우저 및 기기 관련 정보, IP 주소를 기반으로 한
            일반적인 위치 정보 등 서비스 이용 정보가 처리될 수
            있습니다.
          </p>

          <p>
            Google Analytics와 관련된 정보의 처리 방식은
            Google의 개인정보처리방침과 Google 서비스를 사용하는
            사이트의 정보 처리 안내를 따릅니다.
          </p>

          <div className="flex flex-col items-start gap-2">
            <a
              href="https://policies.google.com/privacy?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              Google 개인정보처리방침 확인
            </a>

            <a
              href="https://policies.google.com/technologies/partner-sites?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              Google 서비스 사용 사이트의 정보 처리 안내
            </a>
          </div>
        </PolicySection>

        <PolicySection title="5. Google AdSense 및 광고">
          <p>
            Catlife Insight는 Google AdSense를 이용하여 광고를
            표시할 수 있습니다.
          </p>

          <p>
            Google 및 광고 파트너는 광고 제공, 광고 효과 측정,
            부정 이용 방지 등의 목적으로 쿠키 또는 유사한 기술을
            사용할 수 있습니다.
          </p>

          <p>
            Google 서비스를 사용하는 사이트를 방문하면 방문한
            페이지의 URL, IP 주소 등의 정보가 Google에 전송될 수
            있으며, 이용자의 설정과 적용되는 조건에 따라 광고
            표시 방식이 달라질 수 있습니다.
          </p>

          <div className="flex flex-col items-start gap-2">
            <a
              href="https://policies.google.com/technologies/partner-sites?hl=ko"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              Google의 사이트 및 광고 정보 처리 안내
            </a>

            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              Google 광고 설정
            </a>
          </div>
        </PolicySection>

        <PolicySection title="6. 쿠키 및 브라우저 저장공간">
          <p>
            Google Analytics와 Google AdSense 등 외부 서비스는
            서비스 제공 과정에서 쿠키 또는 유사 기술을 사용할 수
            있습니다.
          </p>

          <p>
            이용자는 사용하는 브라우저의 설정을 통해 쿠키를
            삭제하거나 차단할 수 있습니다. 다만 쿠키 설정에 따라
            일부 서비스의 동작이나 광고 표시 방식이 달라질 수
            있습니다.
          </p>

          <p>
            Catlife Insight의 밝은 모드와 어두운 모드 선택값은
            이용자의 브라우저 저장공간(localStorage)에 저장됩니다.
          </p>

          <p>
            테마 설정값은 화면 테마를 유지하기 위한 목적으로
            사용합니다.
          </p>
        </PolicySection>

        <PolicySection title="7. 외부 사이트 링크">
          <p>
            Catlife Insight는 제품 정보의 출처 확인 등을 위해
            제조사와 기타 외부 사이트로 연결되는 링크를 제공할 수
            있습니다.
          </p>

          <p>
            외부 사이트에서 이루어지는 개인정보 처리는 해당
            사이트의 개인정보처리방침과 운영 정책을 따릅니다.
          </p>
        </PolicySection>

        <PolicySection title="8. 건강 및 검사 정보">
          <p>
            Catlife Insight는 이용자의 반려동물 검사 결과,
            진료기록 또는 의료정보를 업로드받아 저장하는 기능을
            현재 제공하지 않습니다.
          </p>

          <p>
            문의 과정에서도 보호자 이름, 전화번호, 주소,
            검사번호, 병원 기록 등 문의에 필요하지 않은 개인정보를
            보내지 않도록 주의해 주세요.
          </p>

          <p>
            제품 정보와 사료 관련 콘텐츠는 일반적인 정보 제공을
            목적으로 하며, 개별 반려묘에 대한 진단이나 치료,
            처방을 대신하지 않습니다.
          </p>
        </PolicySection>

        <PolicySection title="9. 이용자의 요청">
          <p>
            이용자는 문의 과정에서 직접 제공한 자신의 정보에 대해
            확인, 정정 또는 삭제를 요청할 수 있습니다.
          </p>

          <p>
            개인정보와 관련된 문의 또는 요청은 문의 페이지에
            안내된 연락처를 이용해 주세요.
          </p>

          <Link
            href="/contact"
            className="inline-block text-[#2563EB] hover:underline"
          >
            개인정보 관련 문의
          </Link>
        </PolicySection>

        <PolicySection title="10. 개인정보처리방침의 변경">
          <p>
            서비스 기능, 이용하는 외부 서비스, 광고 운영 방식 또는
            관련 법령과 정책이 변경되는 경우 본 개인정보처리방침을
            수정할 수 있습니다.
          </p>

          <p>
            중요한 변경사항이 있는 경우 사이트를 통해 확인할 수
            있도록 안내합니다.
          </p>
        </PolicySection>
      </div>

      <p className="mt-10 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted-foreground)]">
        시행일: 2026년 8월 28일
      </p>
    </main>
  );
}

type PolicySectionProps = {
  title: string;
  children: ReactNode;
};

function PolicySection({
  title,
  children,
}: PolicySectionProps) {
  return (
    <section className="rounded-xl border border-[var(--border)] p-6">
      <h2 className="mb-4 text-xl font-bold">
        {title}
      </h2>

      <div className="space-y-3 text-sm leading-7">
        {children}
      </div>
    </section>
  );
}
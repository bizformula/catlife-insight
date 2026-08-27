"use client";

import { useEffect, useRef } from "react";

type AdPlaceholderProps = {
  position: string;
};

const ADSENSE_CLIENT = "ca-pub-3781508655873635";
const SIDEBAR_TOP_SLOT = "4353510646";

export default function AdPlaceholder({
  position,
}: AdPlaceholderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (position !== "사이드바 상단") return;
    if (initialized.current) return;

    initialized.current = true;

    try {
      const adsWindow = window as Window & {
        adsbygoogle?: Record<string, unknown>[];
      };

      adsWindow.adsbygoogle =
        adsWindow.adsbygoogle || [];

      adsWindow.adsbygoogle.push({});
    } catch (error) {
      console.error(
        "AdSense initialization failed:",
        error
      );
    }
  }, [position]);

  // 현재는 사이드바 상단만 실제 AdSense 광고로 사용
  if (position === "사이드바 상단") {
    return (
      <div className="my-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={SIDEBAR_TOP_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 나머지 광고 위치는 당분간 기존 자리표시자로 유지
  return (
    <div className="my-6 rounded-md border border-dashed border-[var(--point)] bg-[var(--muted)] p-4 text-center text-sm">
      광고 영역 ({position})
    </div>
  );
}
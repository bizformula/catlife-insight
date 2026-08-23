import Link from "next/link";
import type { IngredientGroup } from "@/types/product";

type GroupGuide = {
  group: IngredientGroup;
  name: string;
  description: string;
  examples: string[];
  cautions: string;
};

const groupGuides: GroupGuide[] = [
  {
    group: "chicken",
    name: "닭",
    description:
      "닭고기와 닭에서 유래한 내장·분말·가수분해 단백질 등을 포함합니다.",
    examples: [
      "닭고기",
      "계육",
      "건조 닭고기",
      "닭 부산물",
      "닭 간",
      "가수분해 닭 단백질",
    ],
    cautions:
      "닭 지방은 단백질 원료와 성격이 다르지만, 제품에 닭 유래 원료가 표시된 것으로 분류합니다.",
  },
  {
    group: "turkey",
    name: "칠면조",
    description:
      "칠면조고기와 칠면조에서 유래한 내장·분말 등을 포함합니다.",
    examples: [
      "칠면조",
      "칠면조고기",
      "터키",
      "건조 칠면조",
      "칠면조 간",
    ],
    cautions:
      "닭과 같은 가금류이지만 원료 제외 검색에서는 별도의 그룹으로 구분합니다.",
  },
  {
    group: "duck",
    name: "오리",
    description:
      "오리고기와 오리에서 유래한 내장·지방·분말 등을 포함합니다.",
    examples: [
      "오리고기",
      "오리",
      "건조 오리고기",
      "오리 간",
      "오리 지방",
    ],
    cautions:
      "제품에 단순히 ‘가금류’라고만 표시된 경우에는 오리 포함 여부를 확인할 수 없습니다.",
  },
  {
    group: "quail",
    name: "메추리",
    description:
      "메추리고기와 메추리에서 유래한 원료를 포함합니다.",
    examples: [
      "메추리",
      "메추리고기",
      "생 메추리",
      "퀘일",
    ],
    cautions:
      "가금류 또는 조류처럼 범위가 넓은 표시는 메추리 포함 여부를 확정할 수 없습니다.",
  },
  {
    group: "beef",
    name: "소",
    description:
      "소고기와 소에서 유래한 내장·뼈·지방·분말 등을 포함합니다.",
    examples: [
      "소고기",
      "우육",
      "비프",
      "소 간",
      "소 심장",
      "소 지방",
    ],
    cautions:
      "동물성 유지처럼 동물 종이 공개되지 않은 원료는 소 포함 여부를 확인할 수 없습니다.",
  },
  {
    group: "pork",
    name: "돼지",
    description:
      "돼지고기와 돼지에서 유래한 내장·지방·분말 등을 포함합니다.",
    examples: [
      "돼지고기",
      "돈육",
      "포크",
      "돼지 간",
      "돼지 부산물",
    ],
    cautions:
      "육류 및 동물성 부산물처럼 동물 종이 공개되지 않은 원료는 확인 불가로 처리합니다.",
  },
  {
    group: "fish",
    name: "생선·해산물",
    description:
      "생선, 갑각류, 패류와 그 가공 단백질·내장·오일을 포함합니다.",
    examples: [
      "연어",
      "참치",
      "대구",
      "고등어",
      "정어리",
      "청어",
      "새우",
      "게",
      "홍합",
      "생선 오일",
    ],
    cautions:
      "생선 또는 어류처럼 정확한 어종이 공개되지 않은 경우에도 이 그룹에는 포함되지만, 개별 어종 검색에서는 확인 불가로 처리될 수 있습니다.",
  },
  {
    group: "dairy",
    name: "유제품",
    description:
      "우유와 우유에서 유래한 단백질·지방·발효 제품을 포함합니다.",
    examples: [
      "우유",
      "유청",
      "카제인",
      "치즈",
      "요구르트",
      "버터",
    ],
    cautions:
      "유산균은 미생물이므로 그 자체만으로 유제품에 포함하지 않습니다.",
  },
  {
    group: "egg",
    name: "달걀",
    description:
      "달걀과 달걀에서 분리한 흰자·노른자·분말 등을 포함합니다.",
    examples: [
      "달걀",
      "계란",
      "전란",
      "난황",
      "난백",
      "건조 계란",
    ],
    cautions:
      "제품에 알류라고만 표시된 경우 정확한 조류의 종류는 확인할 수 없습니다.",
  },
  {
    group: "grain",
    name: "곡물",
    description:
      "벼과 곡류와 해당 곡물에서 유래한 분말·전분·단백질 등을 포함합니다.",
    examples: [
      "쌀",
      "현미",
      "밀",
      "보리",
      "귀리",
      "옥수수",
      "기장",
      "조",
    ],
    cautions:
      "완두콩과 렌틸콩은 콩류이며, 메밀과 퀴노아는 유사곡물로 별도 분류합니다.",
  },
  {
    group: "legume",
    name: "콩류",
    description:
      "콩과 식물의 종실과 그 가공 원료를 포함합니다.",
    examples: [
      "완두콩",
      "렌틸콩",
      "렌즈콩",
      "병아리콩",
      "대두",
      "강낭콩",
    ],
    cautions:
      "렌틸콩과 렌즈콩처럼 이름이 다른 동일 원료는 공통 별칭 사전으로 함께 검색합니다.",
  },
  {
    group: "pseudograin",
    name: "유사곡물",
    description:
      "곡물처럼 사용되지만 벼과 곡류가 아닌 종실을 별도로 분류합니다.",
    examples: [
      "메밀",
      "퀴노아",
      "아마란스",
    ],
    cautions:
      "제품이나 자료에 따라 곡물로 통칭되기도 하지만, Catlife Insight에서는 곡물과 구분합니다.",
  },
  {
    group: "starch",
    name: "전분류",
    description:
      "특정 원료에서 분리했거나 전분 공급원으로 사용된 원료를 포함합니다.",
    examples: [
      "감자전분",
      "타피오카",
      "카사바 전분",
      "완두전분",
      "쌀 전분",
    ],
    cautions:
      "쌀 전분은 전분류이면서 쌀 유래 원료입니다. 검색 목적에 따라 원재료의 출처 그룹도 함께 확인할 수 있습니다.",
  },
  {
    group: "vegetable",
    name: "채소류",
    description:
      "채소, 뿌리채소, 잎채소 및 관련 추출물을 포함합니다.",
    examples: [
      "감자",
      "고구마",
      "당근",
      "호박",
      "시금치",
      "케일",
      "치커리",
    ],
    cautions:
      "채소 추출물처럼 세부 종류가 공개되지 않은 경우에는 개별 채소 포함 여부를 확정할 수 없습니다.",
  },
];

const statusGuides = [
  {
    name: "표시 원재료에 포함",
    value: "contains",
    description:
      "제품의 공개된 원재료 목록에서 해당 그룹의 원료를 확인했습니다.",
  },
  {
    name: "표시 원재료에 없음",
    value: "not-listed",
    description:
      "확인한 공개 원재료 목록에 해당 그룹의 원료가 표시되지 않았습니다.",
  },
  {
    name: "확인 불가",
    value: "unknown",
    description:
      "동물성 유지, 육류 부산물, 생선 오일처럼 원료의 정확한 종류가 공개되지 않아 포함 여부를 판단할 수 없습니다.",
  },
];

export default function IngredientStandardsPage() {
  return (
    <main className="mx-auto max-w-5xl">
      <header className="mb-10">
        <h1 className="mb-3 text-3xl font-bold">
          원료 분류 기준
        </h1>

        <p className="max-w-3xl leading-7 text-[var(--muted-foreground)]">
          Catlife Insight가 제품의 표시 원재료를 분류하고
          사료 찾기 결과에 반영하는 기준입니다.
        </p>
      </header>

      <section className="mb-10 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-2xl font-bold">
          검색 결과를 이해하는 방법
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {statusGuides.map((status) => (
            <article
              key={status.value}
              className="rounded-lg bg-[var(--muted)] p-4"
            >
              <h3 className="mb-2 font-bold">
                {status.name}
              </h3>

              <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                {status.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-5 text-sm leading-6 text-[var(--muted-foreground)]">
          ‘표시 원재료에 없음’은 제조 과정의 교차 접촉이나
          복합 원료 내부의 미공개 성분까지 없다는 의미가
          아닙니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          원료 그룹
        </h2>

        <div className="space-y-4">
          {groupGuides.map((guide) => (
            <article
              key={guide.group}
              id={guide.group}
              className="rounded-xl border border-[var(--border)] p-5"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold">
                  {guide.name}
                </h3>

                <code className="rounded bg-[var(--muted)] px-2 py-1 text-xs">
                  {guide.group}
                </code>
              </div>

              <p className="mb-4 leading-7">
                {guide.description}
              </p>

              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold">
                  분류 예시
                </p>

                <div className="flex flex-wrap gap-2">
                  {guide.examples.map((example) => (
                    <span
                      key={example}
                      className="rounded-full bg-[var(--muted)] px-3 py-1 text-sm"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              <p className="rounded-lg bg-amber-50 p-3 text-sm leading-6 text-amber-900 dark:bg-amber-950 dark:text-amber-100">
                확인할 점: {guide.cautions}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-xl border border-[var(--border)] p-6">
        <h2 className="mb-4 text-2xl font-bold">
          별칭은 어떻게 처리하나요?
        </h2>

        <p className="mb-4 leading-7">
          동일한 원료가 제품마다 다른 이름으로 표시될 수 있어
          공통 원료 사전에 대표 이름과 별칭을 함께 등록합니다.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[var(--muted)]">
                <th className="border border-[var(--border)] p-3">
                  대표 원료
                </th>
                <th className="border border-[var(--border)] p-3">
                  함께 인식하는 이름
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-[var(--border)] p-3">
                  렌틸콩
                </td>
                <td className="border border-[var(--border)] p-3">
                  렌즈콩, 적렌틸콩, 녹렌틸콩
                </td>
              </tr>

              <tr>
                <td className="border border-[var(--border)] p-3">
                  닭고기
                </td>
                <td className="border border-[var(--border)] p-3">
                  닭, 치킨, 계육
                </td>
              </tr>

              <tr>
                <td className="border border-[var(--border)] p-3">
                  소고기
                </td>
                <td className="border border-[var(--border)] p-3">
                  소, 비프, 우육
                </td>
              </tr>

              <tr>
                <td className="border border-[var(--border)] p-3">
                  옥수수
                </td>
                <td className="border border-[var(--border)] p-3">
                  콘, 메이즈
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl bg-[var(--muted)] p-6">
        <h2 className="mb-3 text-xl font-bold">
          이용 전 확인해 주세요
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
          <li>
            분류 결과는 확인한 제품의 공개 표시사항을 기준으로
            합니다.
          </li>
          <li>
            제조 시기와 유통 국가에 따라 원료와 성분이 달라질
            수 있습니다.
          </li>
          <li>
            알레르기 검사 결과만으로 임상적인 식품 알레르기를
            확정할 수는 없습니다.
          </li>
          <li>
            처방식 선택과 질환이 있는 고양이의 식이 변경은
            수의사와 상담하세요.
          </li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/finder"
          className="rounded-lg bg-[#2563EB] px-5 py-3 text-sm font-semibold !text-white"
        >
          사료 찾기로 돌아가기
        </Link>

        <Link
          href="/products"
          className="rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold !text-[var(--foreground)]"
        >
          등록 제품 보기
        </Link>
      </div>
    </main>
  );
}
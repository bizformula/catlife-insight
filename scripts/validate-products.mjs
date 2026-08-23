import fs from "fs";
import path from "path";

const ALLOWED_SHORT_ALIASES = new Set([
  "닭",
  "덕",
  "소",
  "콘",
]);

const projectRoot = process.cwd();

const productsDirectory = path.join(
  projectRoot,
  "content",
  "products"
);

const dictionaryPath = path.join(
  projectRoot,
  "content",
  "ingredient-dictionary.json"
);

const publicDirectory = path.join(
  projectRoot,
  "public"
);

const ingredientGroups = [
  "chicken",
  "turkey",
  "duck",
  "quail",
  "beef",
  "pork",
  "fish",
  "dairy",
  "egg",
  "grain",
  "legume",
  "pseudograin",
  "starch",
  "vegetable",
];

const ingredientStatuses = [
  "contains",
  "not-listed",
  "unknown",
];

const productTypes = [
  "food",
  "treat",
];

const foodForms = [
  "dry",
  "wet",
  "powder",
];

const productPurposes = [
  "complete",
  "supplementary",
];

const lifeStages = [
  "kitten",
  "adult",
  "senior",
  "all",
];

let errorCount = 0;
let warningCount = 0;

function showError(message) {
  errorCount += 1;
  console.error(`❌ 오류: ${message}`);
}

function showWarning(message) {
  warningCount += 1;
  console.warn(`⚠️ 경고: ${message}`);
}

function normalize(value) {
  return String(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\u200B/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function readJson(filePath) {
  try {
    const contents = fs.readFileSync(
      filePath,
      "utf8"
    );

    return JSON.parse(contents);
  } catch (error) {
    showError(
      `${path.relative(
        projectRoot,
        filePath
      )} 파일을 읽을 수 없습니다: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`
    );

    return undefined;
  }
}

function isNonEmptyString(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.every(isNonEmptyString)
  );
}

function validateDictionary() {
  console.log("\n[원료 사전 검사]");

  if (!fs.existsSync(dictionaryPath)) {
    showError(
      "content/ingredient-dictionary.json 파일이 없습니다."
    );

    return;
  }

  const dictionary =
    readJson(dictionaryPath);

  if (!Array.isArray(dictionary)) {
    showError(
      "원료 사전의 최상위 구조는 배열이어야 합니다."
    );

    return;
  }

  const registeredNames = new Map();

  dictionary.forEach((item, index) => {
    const location =
      `원료 사전 ${index + 1}번째 항목`;

    if (
      !item ||
      typeof item !== "object"
    ) {
      showError(
        `${location}이 객체 형식이 아닙니다.`
      );

      return;
    }

    if (
      !isNonEmptyString(
        item.canonicalName
      )
    ) {
      showError(
        `${location}의 canonicalName이 비어 있습니다.`
      );
    }

    if (
      !ingredientGroups.includes(
        item.group
      )
    ) {
      showError(
        `${location}의 group "${item.group}"이 허용된 원료 그룹이 아닙니다.`
      );
    }

    if (!Array.isArray(item.aliases)) {
      showError(
        `${location}의 aliases는 배열이어야 합니다.`
      );

      return;
    }

    const names = [
      item.canonicalName,
      ...item.aliases,
    ].filter(isNonEmptyString);

    names.forEach((name) => {
      const normalizedName =
        normalize(name);

      const previous =
        registeredNames.get(
          normalizedName
        );

      if (
        previous &&
        previous !==
          item.canonicalName
      ) {
        showError(
          `원료명 "${name}"이 "${previous}"와 "${item.canonicalName}"에 중복 등록되어 있습니다.`
        );
      } else {
        registeredNames.set(
          normalizedName,
          item.canonicalName
        );
      }
    });

    const duplicateAliases =
      item.aliases
        .map(normalize)
        .filter(
          (alias, aliasIndex, aliases) =>
            aliases.indexOf(alias) !==
            aliasIndex
        );

    if (
      duplicateAliases.length > 0
    ) {
      showWarning(
        `"${item.canonicalName}"의 aliases에 중복된 별칭이 있습니다.`
      );
    }

       item.aliases.forEach((alias) => {
      const normalizedAlias =
        normalize(alias);

      if (
        normalizedAlias.length === 1 &&
        !ALLOWED_SHORT_ALIASES.has(
          normalizedAlias
        )
      ) {
        showWarning(
          `"${item.canonicalName}"의 별칭 "${alias}"은 너무 짧아 잘못 검색될 가능성이 있습니다.`
        );
      }
    });
  });

  console.log(
    `원료 사전 ${dictionary.length}개 항목 확인 완료`
  );
}

function validateProduct(
  product,
  fileName,
  registeredSlugs
) {
  const location =
    `content/products/${fileName}`;

  if (
    !product ||
    typeof product !== "object"
  ) {
    showError(
      `${location}: 제품 데이터가 객체 형식이 아닙니다.`
    );

    return;
  }

  const requiredStringFields = [
    "slug",
    "name",
    "brand",
    "sourceUrl",
    "checkedAt",
  ];

  requiredStringFields.forEach(
    (field) => {
      if (
        !isNonEmptyString(
          product[field]
        )
      ) {
        showError(
          `${location}: ${field} 값이 없거나 비어 있습니다.`
        );
      }
    }
  );

  if (isNonEmptyString(product.slug)) {
    const expectedFileName =
      `${product.slug}.json`;

    if (fileName !== expectedFileName) {
      showError(
        `${location}: 파일명은 slug와 같은 "${expectedFileName}"이어야 합니다.`
      );
    }

    if (
      registeredSlugs.has(
        product.slug
      )
    ) {
      showError(
        `${location}: slug "${product.slug}"가 다른 제품과 중복됩니다.`
      );
    }

    registeredSlugs.add(
      product.slug
    );
  }

  if (
    !productTypes.includes(
      product.productType
    )
  ) {
    showError(
      `${location}: productType은 "food" 또는 "treat"이어야 합니다.`
    );
  }

  if (
    !foodForms.includes(
      product.foodForm
    )
  ) {
    showError(
      `${location}: foodForm은 "dry", "wet" 또는 "powder"이어야 합니다.`
    );
  }

  if (
    !productPurposes.includes(
      product.purpose
    )
  ) {
    showError(
      `${location}: purpose 값이 올바르지 않습니다.`
    );
  }

  if (
    !Array.isArray(
      product.lifeStage
    ) ||
    product.lifeStage.length === 0
  ) {
    showError(
      `${location}: lifeStage가 비어 있습니다.`
    );
  } else {
    product.lifeStage.forEach(
      (stage) => {
        if (
          !lifeStages.includes(stage)
        ) {
          showError(
            `${location}: lifeStage "${stage}"가 올바르지 않습니다.`
          );
        }
      }
    );
  }

  if (
    !isStringArray(
      product.mainProteins
    )
  ) {
    showError(
      `${location}: mainProteins는 비어 있지 않은 문자열 배열이어야 합니다.`
    );
  }

  if (
    !isStringArray(
      product.ingredients
    )
  ) {
    showError(
      `${location}: ingredients는 비어 있지 않은 문자열 배열이어야 합니다.`
    );
  }

  if (
    !isNonEmptyString(
      product.summary
    )
  ) {
    showWarning(
      `${location}: summary가 등록되지 않았습니다.`
    );
  }

  if (
    product.image &&
    isNonEmptyString(product.image)
  ) {
    if (
      !product.image.startsWith("/")
    ) {
      showError(
        `${location}: image 경로는 "/"로 시작해야 합니다.`
      );
    } else {
      const imagePath = path.join(
        publicDirectory,
        product.image.replace(
          /^\/+/,
          ""
        )
      );

      if (
        !fs.existsSync(imagePath)
      ) {
        showWarning(
          `${location}: 이미지 파일 "${product.image}"을 public 폴더에서 찾을 수 없습니다.`
        );
      }
    }
  } else {
    showWarning(
      `${location}: 제품 이미지가 등록되지 않았습니다.`
    );
  }

  if (
    !product.ingredientStatus ||
    typeof product.ingredientStatus !==
      "object"
  ) {
    showError(
      `${location}: ingredientStatus가 없습니다.`
    );
  } else {
    ingredientGroups.forEach(
      (group) => {
        const status =
          product.ingredientStatus[
            group
          ];

        if (status === undefined) {
          showWarning(
            `${location}: ingredientStatus.${group}가 아직 등록되지 않았습니다.`
          );
        } else if (
          !ingredientStatuses.includes(
            status
          )
        ) {
          showError(
            `${location}: ingredientStatus.${group}의 값 "${status}"가 올바르지 않습니다.`
          );
        }
      }
    );

    Object.keys(
      product.ingredientStatus
    ).forEach((group) => {
      if (
        !ingredientGroups.includes(
          group
        )
      ) {
        showError(
          `${location}: 알 수 없는 원료 그룹 "${group}"이 있습니다.`
        );
      }
    });
  }

  if (
    product.ingredientDetails !==
      undefined &&
    !Array.isArray(
      product.ingredientDetails
    )
  ) {
    showError(
      `${location}: ingredientDetails는 배열이어야 합니다.`
    );
  }

  if (
    Array.isArray(
      product.ingredientDetails
    )
  ) {
    const detailGroups =
      new Set();

    product.ingredientDetails.forEach(
      (detail, index) => {
        const detailLocation =
          `${location} ingredientDetails ${
            index + 1
          }번째`;

        if (
          !isNonEmptyString(
            detail.name
          )
        ) {
          showError(
            `${detailLocation}: name이 비어 있습니다.`
          );
        }

        if (
          !isNonEmptyString(
            detail.sourceText
          )
        ) {
          showError(
            `${detailLocation}: sourceText가 비어 있습니다.`
          );
        }

        if (
          detail.group !==
            undefined &&
          !ingredientGroups.includes(
            detail.group
          )
        ) {
          showError(
            `${detailLocation}: group "${detail.group}"이 올바르지 않습니다.`
          );
        }

        if (detail.group) {
          detailGroups.add(
            detail.group
          );
        }

        if (
          detail.specificity !==
            undefined &&
          detail.specificity !==
            "specific" &&
          detail.specificity !==
            "group-only"
        ) {
          showError(
            `${detailLocation}: specificity 값이 올바르지 않습니다.`
          );
        }

        if (
          detail.aliases !==
            undefined &&
          !isStringArray(
            detail.aliases
          )
        ) {
          showError(
            `${detailLocation}: aliases는 문자열 배열이어야 합니다.`
          );
        }
      }
    );

    detailGroups.forEach((group) => {
      const status =
        product.ingredientStatus?.[
          group
        ];

      if (status === "not-listed") {
        showError(
          `${location}: ingredientDetails에는 "${group}" 원료가 있지만 ingredientStatus.${group}가 "not-listed"로 되어 있습니다.`
        );
      }

      if (status === undefined) {
        showWarning(
          `${location}: ingredientDetails에는 "${group}" 원료가 있지만 ingredientStatus.${group}가 없습니다.`
        );
      }
    });
  }

  if (
    !product.guaranteedAnalysis ||
    typeof product.guaranteedAnalysis !==
      "object"
  ) {
    showError(
      `${location}: guaranteedAnalysis가 없습니다.`
    );
  }

  if (
    isNonEmptyString(
      product.checkedAt
    ) &&
    !/^\d{4}-\d{2}-\d{2}$/.test(
      product.checkedAt
    )
  ) {
    showError(
      `${location}: checkedAt은 YYYY-MM-DD 형식이어야 합니다.`
    );
  }

  if (
    isNonEmptyString(
      product.sourceUrl
    )
  ) {
    try {
      new URL(product.sourceUrl);
    } catch {
      showError(
        `${location}: sourceUrl이 올바른 주소가 아닙니다.`
      );
    }
  }
}

function validateProducts() {
  console.log("\n[제품 JSON 검사]");

  if (
    !fs.existsSync(
      productsDirectory
    )
  ) {
    showError(
      "content/products 폴더가 없습니다."
    );

    return;
  }

  const fileNames = fs
    .readdirSync(productsDirectory)
    .filter((fileName) =>
      fileName.endsWith(".json")
    )
    .sort();

  if (fileNames.length === 0) {
    showWarning(
      "등록된 제품 JSON 파일이 없습니다."
    );

    return;
  }

  const registeredSlugs =
    new Set();

  fileNames.forEach((fileName) => {
    const filePath = path.join(
      productsDirectory,
      fileName
    );

    const product =
      readJson(filePath);

    if (product !== undefined) {
      validateProduct(
        product,
        fileName,
        registeredSlugs
      );
    }
  });

  console.log(
    `제품 ${fileNames.length}개 확인 완료`
  );
}

console.log(
  "캣라이프 인사이트 데이터 검증을 시작합니다."
);

validateDictionary();
validateProducts();

console.log("\n[검증 결과]");
console.log(`오류: ${errorCount}개`);
console.log(`경고: ${warningCount}개`);

if (errorCount > 0) {
  console.error(
    "\n수정이 필요한 오류가 있습니다."
  );

  process.exitCode = 1;
} else {
  console.log(
    "\n치명적인 데이터 오류는 없습니다."
  );

  if (warningCount > 0) {
    console.log(
      "경고 항목은 제품 정보를 검토하면서 차례대로 보완하세요."
    );
  }
}
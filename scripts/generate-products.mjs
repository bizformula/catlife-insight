import fs from "node:fs";
import path from "node:path";

const rootDirectory = process.cwd();
const productsDirectory = path.join(
  rootDirectory,
  "content",
  "products",
);
const outputDirectory = path.join(
  rootDirectory,
  "generated",
);
const outputFile = path.join(
  outputDirectory,
  "products.json",
);

const fileNames = fs
  .readdirSync(productsDirectory)
  .filter((fileName) => fileName.endsWith(".json"))
  .sort();

const products = fileNames.map((fileName) => {
  const filePath = path.join(
    productsDirectory,
    fileName,
  );

  const fileContents = fs.readFileSync(
    filePath,
    "utf8",
  );

  return JSON.parse(fileContents);
});

fs.mkdirSync(outputDirectory, {
  recursive: true,
});

fs.writeFileSync(
  outputFile,
  `${JSON.stringify(products, null, 2)}\n`,
  "utf8",
);

console.log(
  `Generated ${products.length} products -> generated/products.json`,
);
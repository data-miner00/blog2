var postcss = require("postcss");
var tailwindcss = require("@tailwindcss/postcss");
var fs = require("fs");
var path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./css/index.css");
    const tailwindOutputPath = "./_site/styles/index.css";
    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");
    const outputDir = path.dirname(tailwindOutputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([tailwindcss()]).process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

    dir: {
      input: "content",
      data: "../_data",
      includes: "../_includes",
    },
  };
};

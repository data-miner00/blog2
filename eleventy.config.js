var postcss = require("postcss");
var tailwindcss = require("@tailwindcss/postcss");
var fs = require("fs");
var path = require("path");
var { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
var { feedPlugin } = require("@11ty/eleventy-plugin-rss");

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

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("dayMonth", (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    if (date.getFullYear() === now.getFullYear()) {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric", // '1'
        month: "short", // 'Jan'
      });

      return formatter.format(date);
    } else {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric", // '1'
        month: "short", // 'Jan',
        year: "numeric",
      });

      return formatter.format(date);
    }
  });

  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "post", // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Shaun's Blog",
      subtitle:
        "Non-technical writings about life, work, and everything in between.",
      base: "https://blog.mumk.dev/",
      author: {
        name: "Shaun Chong",
        email: "mumk0313@gmail.com",
      },
    },
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

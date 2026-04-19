module.exports = function (eleventyConfig) {
  return {
    templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],

    dir: {
      input: "content",
      data: "../_data",
      includes: "../_includes",
    },
  };
};

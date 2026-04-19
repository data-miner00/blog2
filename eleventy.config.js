module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "content",
      data: "../_data",
      includes: "../_includes",
      // layouts: "../_layouts",
    },
  };
};

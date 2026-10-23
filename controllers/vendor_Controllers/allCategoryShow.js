const Category = require("../../models/categorySchema");

const allCategoryShow = async (req, res) => {
  try {
    const allcat = await Category.find({}).populate("owner");

    return res.status(200).json({
      success: true,
      message: "Here is All Category",
      data: allcat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = allCategoryShow;
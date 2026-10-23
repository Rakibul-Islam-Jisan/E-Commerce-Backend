const Category = require("../../models/categorySchema");

const updateCategoryC = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    
    const updateCat = await Category.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );

    if (!updateCat) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updateCat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = updateCategoryC;
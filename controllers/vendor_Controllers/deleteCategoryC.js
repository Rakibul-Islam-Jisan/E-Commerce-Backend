const Category = require("../../models/categorySchema");
const sendEmail = require("../../utils/sendEmail");

const deleteCategoryC = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCat = await Category.findByIdAndDelete(id);

    if (!deleteCat) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await sendEmail({
        to:process.env.ADMIN_EMAIL,
        type:'DELETE_CATEGORY',
        categoryName: deleteCat.name
    })

    return res.status(200).json({
      success: true,
      message: "Category Deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = deleteCategoryC;
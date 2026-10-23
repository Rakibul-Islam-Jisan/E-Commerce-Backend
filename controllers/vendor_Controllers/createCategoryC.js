const Category = require("../../models/categorySchema");
const User = require("../../models/userSchema");
const sendEmail = require("../../utils/sendEmail");

const createCategoryC = async (req, res) => {
  try {
    const { name, owner } = req.body;

    const existingcatName = await Category.findOne({ name: name });

    if (existingcatName) {
      return res.status(400).json({
        success: false,
        message: "Category Already Exists",
      });
    }

    const newCategory = new Category({
      name: name,
      owner: owner,
    });

    await newCategory.save();

    await sendEmail({
        to:process.env.ADMIN_EMAIL,
        type:'NEW_CATEGORY',
        categoryName: newCategory.name
    })

    return res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};

module.exports = createCategoryC;
const express = require('express');
const createCategoryC = require('../controllers/vendor_Controllers/createCategoryC');
const allCategoryShowC = require('../controllers/vendor_Controllers/allCategoryShow');
const updateCategoryC = require('../controllers/vendor_Controllers/updateCategoryC');
const deleteCategoryC = require('../controllers/vendor_Controllers/deleteCategoryC');
const allOwnerWiseCategoryC = require('../controllers/vendor_Controllers/allOwnerWiseCategoryC');
const createSubCategoryC = require('../controllers/vendor_Controllers/createSubCategoryC');
const allSubcategoryC = require('../controllers/vendor_Controllers/allSubCategoryC');
const allCategoryWiseSubCategoryC = require('../controllers/vendor_Controllers/allCategoryWiseSubCategoryC');
const createProductC = require('../controllers/product_Controllers/createProductC');
const getAllProductC = require('../controllers/product_Controllers/getAllProductC');
const categoryWiseProductC = require('../controllers/product_Controllers/categoryWiseProductC');
const subCategoryWiseProductC = require('../controllers/product_Controllers/subCategoryWiseProductC');
const ownerWiseProductC = require('../controllers/product_Controllers/ownerWiseProductC');
const deleteProductC = require('../controllers/product_Controllers/deleteProductC');
const upload = require('../utils/multer')
const router = express.Router()

router.post("/createcategory", createCategoryC);
router.get("/allcategory", allCategoryShowC);
router.post("/categoryupdate/:id", updateCategoryC);
router.delete("/categorydelete/:id", deleteCategoryC);
router.get("/allownerwisecategory/:id", allOwnerWiseCategoryC);
router.post("/subcategorycreate", createSubCategoryC);
router.get("/allsubcategory", allSubcategoryC);
router.get("/allcategorywisesubcategory/:id", allCategoryWiseSubCategoryC);
router.post("/createproduct", upload.array("photo"), createProductC);
router.get("/getallproduct", getAllProductC);
router.get("/categorywiseproduct/:id", categoryWiseProductC);
router.get("/subcategorywiseproduct/:id", subCategoryWiseProductC);
router.get("/ownerwiseproduct/:id", ownerWiseProductC);
router.delete("/deleteproduct/:id", deleteProductC);

module.exports = router
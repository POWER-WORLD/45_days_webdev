const express = require("express");
const router = express.Router();


//route to delete experience by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  WorkExperience.findByIdAndDelete(id)
    .then((deletedExperience) => {
      if (!deletedExperience) {
        return res.status(404).json({
          success: false,
          message: "Experience not found"
        });
      }
      res.json({
        success: true,
        message: "Experience deleted successfully",
        data: deletedExperience
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
    });
});
module.exports = router;
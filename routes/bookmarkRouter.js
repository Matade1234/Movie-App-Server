const express = require("express")
const methodNotAllowed = require("../utils/methodNotAllowed")
const { removeBookmark, addBookmark, allBookmarks } = require("../controllers/bookmarkController")
const auth = require("../middlewares/auth")

const router = express.Router()


router.route('/').get( auth, allBookmarks).all(methodNotAllowed)
router.route('/add/:id').get( auth, addBookmark).all(methodNotAllowed)
router.route('/remove/:id').get( auth, removeBookmark).all(methodNotAllowed)

module.exports = router
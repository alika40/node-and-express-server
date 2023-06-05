const express = require('express');
const router = express.Router();


const courseController = require('../controller/course');



router.get('/api/courses', courseController.getCourses);
router.get('/api/search', courseController.getSearchCourses);
router.get('/api/course/:courseID', courseController.getCourse);
router.get('/api/course/:courseID/reviews', courseController.getCourseReviews);



// https://android-server.cyclic.app/api/course/1898178
// https://android-server.cyclic.app/api/courses




module.exports = router;
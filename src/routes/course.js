const express = require('express');
const router = express.Router();


const courseController = require('../controller/course');



router.get('/api/courses', courseController.getCourses);
router.post('/api/courses/search', courseController.getSearchCourses);
router.get('/api/course/:courseID', courseController.getCourse);
router.get('/api/course/:courseID/reviews', courseController.getCourseReviews);







module.exports = router;
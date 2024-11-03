const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

const courseController = require('../app/controllers/CourseController');

router.delete('/delete/:id', catchAsync(courseController.deleteCourse));
router.put('/setStatus', catchAsync(courseController.setStatus));
router.put('/update', catchAsync(courseController.updateCourse));
router.post('/add', catchAsync(courseController.addCourse));
router.get('/listMoney', catchAsync(courseController.listCourseMoney));
router.get(
    '/listCourseStatus1',
    catchAsync(courseController.listCourseStatus1)
);
router.get(
    '/listCourseOfTable',
    catchAsync(courseController.listCourseOfTable)
);
router.get('/listFree', catchAsync(courseController.listCourseFree));
router.get(
    '/info/:id',
    catchAsync(courseController.course_partcourses_lessons_courseresults)
);
router.get('/', catchAsync(courseController.index));

module.exports = router;

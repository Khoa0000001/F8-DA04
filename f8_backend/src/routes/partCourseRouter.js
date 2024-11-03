const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');
const {
    checkUserJWT,
    checkUserPermission,
} = require('../middleware/JWTAction');

const partCourseController = require('../app/controllers/PartCourseController');

router.post(
    '/partOfLessonOrQuestion',
    catchAsync(partCourseController.partOfLessonOrQuestion)
);

router.post('/add', catchAsync(partCourseController.addPartCoursesOfCourse));
router.put(
    '/update',
    catchAsync(partCourseController.updatePartCoursesOfCourse)
);

router.put('/setStatus', catchAsync(partCourseController.setStatus));
router.delete(
    '/delete/:id',
    catchAsync(partCourseController.deletePartCourses)
);

router.get(
    '/listPartCoursesOfCourse/:id',
    catchAsync(partCourseController.listPartCoursesOfCourse)
);

module.exports = router;

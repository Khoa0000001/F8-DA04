const express = require('express');
const router = express.Router();
const catchAsync = require('../untils/catchAsync');

const siteController = require('../app/controllers/SiteController');

router.get('/getStatistical', catchAsync(siteController.getStatistical));
router.use('/search/coures', catchAsync(siteController.searchCourses));
router.use(
    '/getCoursesByRegistrations',
    catchAsync(siteController.getCoursesByRegistrations)
);

module.exports = router;

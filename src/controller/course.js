const axiosInstance = require('../middleware/udemy-check');
// const debug = require("debug")("courses"); // Logging for Production




//  Handler: Get all courses
exports.getCourses = (req, res, next) => {

        const encodedURI = req.headers.host + req.originalUrl;
        const  groupCourse = req.query.groupCourse;
        const URI = groupCourse ? decodeURI(encodedURI) : encodedURI;
        const apiURL = URI.split('/api/');

        axiosInstance.get(apiURL[1])
        .then(response => {
            res.status(200).json({ courses: response.data.results, courseCount: response.data.count });
        })
        .catch(error => {
            // debug(`Get Courses: {error}`); // Logging for Production
            res.status(500).json({message: 'ERROR: Error Occured!'});
    });

}




//  Handler: Get single course by its ID
exports.getCourse = async(req, res, next) => { // ?fields[course]=@all,owner,-images&fields[user]=title

    try {

        const courseID = +req.params.courseID;
        const apiURL_1 = `courses/${courseID}/?fields[course]=title,url,price,visible_instructors,image_480x270,description,
                        headline,discount_price,rating,num_reviews,primary_category,created,requirements_data,
                        objectives,objectives_summary`;
        const course = await  axiosInstance.get(apiURL_1);
        const apiURL_2 = `courses/?page=${1}&page_size=${8}&search=${course.data.primary_category.title}`;
        const otherCourses = await axiosInstance.get(apiURL_2);

        res.status(200).json({ course: course.data, otherCourses: otherCourses.data.results });

    }
    catch(error) {
        res.status(500).json({message: 'ERROR: Error Occured!'})
    }
    
}





//  Handler: Get single course reviews by its ID
exports.getCourseReviews = async(req, res, next) => {

    try {

        const courseID = +req.params.courseID;
        const pageNo = +req.query.page;
        const pageSize = +req.query.page_size;
        const apiURL = `courses/${courseID}/reviews/?page=${pageNo}&page_size=${pageSize}`;

        const courseReviews = await axiosInstance.get(apiURL);
        res.status(200).json({ reviews: courseReviews.data.results, count: courseReviews.data.count });

    }
    catch(err) {
        res.status(500).json({message: 'ERROR: Error Occured!'});
    }

}




//  Handler: Get searched courses result
exports.getSearchCourses = (req, res, next) => {
    
    const apiURL = `courses/?page=${1}&page_size=${10}&search=${req.body.searchTerm}`;
    // console.log(req.body.searchTerm);

    axiosInstance.get(apiURL)
    .then(response => res.status(200).json({ courses: response.data.results }) )
    .catch(error => res.status(500).json({message: 'ERROR: Error Occured!'}) );

}

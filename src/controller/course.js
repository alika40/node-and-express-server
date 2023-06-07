const axiosInstance = require('../middleware/udemy-check');
// const debug = require("debug")("courses"); // Logging for Production




//  Handler: Get all courses
exports.getCourses = (req, res, next) => {

        const encodedURI = req.headers.host + req.originalUrl;
        const  groupCourse = req.query.search;
        const URI = groupCourse ? decodeURI(encodedURI) : encodedURI;
        const apiURL = URI.split('/api/');

        axiosInstance.get(apiURL[1])
        .then(response => {
            const results = response.data.results.map(course => {
                return {
                    id: course.id,
                    title: course.title,
                    url: course.url,
                    price: course.price,
                    headline: course.headline,
                    image_480x270: course.image_480x270,
                    visible_instructors: course.visible_instructors.length
                }
            });

            res.status(200).json({ courses: results, course_count: response.data.count });
        })
        .catch(error => {
            // debug(`Get Courses: {error}`); // Logging for Production
            res.status(500).json({message: error.message});
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

        const results = {
                id: course.data.id,
                title: course.data.title,
                url: course.data.url,
                price: course.data.price,
                discount_price: course.data.discount_price,
                headline: course.data.headline,
                rating: course.data.rating,
                num_reviews: course.data.num_reviews,
                description: course.data.description,
                image_480x270: course.data.image_480x270,
                primary_category: course.data.primary_category.title, // { title: string; url: string; };
                created: course.data.created,
                objectives_summary: course.data.objectives_summary,
                requirements_data: course.data.requirements_data.items, // { items: string[]}
                visible_instructors: course.data.visible_instructors.map(vi => {
                    return {
                        id: vi.id,
                        title: vi.title,
                        name: vi.name,
                        display_name: vi.display_name,
                        job_title: vi.job_title,
                        image_50x50: vi.image_50x50
                    }
                })
            };

        const relatedCoursesResult = otherCourses.data.results.map(course => {
            return {
                id: course.id,
                title: course.title,
                price: course.price,
                headline: course.headline,
                image_480x270: course.image_480x270
            }
        });

    res.status(200).json({ course: results, other_courses: relatedCoursesResult});

    }
    catch(error) {
        res.status(500).json({message: error.message})
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
        const results = courseReviews.data.results.map(review => {
            return {
                content: review.content,
                rating: review.rating,
                created: review.created,
                user: {
                    title: review.user.title,
                    name: review.user.name,
                    display_name: review.user.display_name
                }
            }
        });
        res.status(200).json({ reviews: results, count: courseReviews.data.count });

    }
    catch(err) {
        res.status(500).json({message: err.message});
    }

}




//  Handler: Get searched courses result
exports.getSearchCourses = (req, res, next) => {
    /*const searchTerm = req.query.search;
    const pageNo = +req.query.page;
    const pageSize = +req.query.page_size;
    const apiURL = `courses/?page=${pageNo}&page_size=${pageSize}&search=${searchTerm}`;*/
    //console.log(searchTerm);

    const encodedURI = req.headers.host + req.originalUrl;
    const  queryTerm = req.query.search;
    const URI = queryTerm ? decodeURI(encodedURI) : encodedURI;
    const apiURL = URI.split('/search/');
    console.log(apiURL);

    axiosInstance.get(apiURL[1])
    //axiosInstance.get(apiURL)
    .then(response => {
        const results = response.data.results.map(course => {
            return {
                id: course.id,
                title: course.title
            }
        });

        res.status(200).json({ courses: results });
    })
    .catch(error => res.status(500).json({message: error.message}) );

}

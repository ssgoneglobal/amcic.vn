import { Career } from '../models/career.model.js'
const CareersService = {
  index: async (req, res, next) => {
    const careers = await Career.find({ status: 1 })
    console.log(careers)
    return res.render('careers', {
      careers: careers,
      title: 'Tuyển dụng - cơ hội việc làm tại TMP Corp Technology',
    })
  },

  careerPage: async (req, res, next) => {
    const {slug} = req.params
    const career = await Career.findOne({slug: slug})
    console.log(career)
    return res.render('career-detail', {
      career: career,
      title: career.title
    })
  },

  createCareer: async (req, res, next) => {
    try {
      const {
        title,
        position,
        featuredImage,
        timeTable,
        expirationWork,
        salary,
        location,
        status,
        content
      } = req.body

      const careers = await Career.create({
        title,
        position,
        featuredImage,
        expirationWork,
        salary,
        location,
        status,
        timeTable,
        content
      })
      return res.json("Create Career Successful")
    } catch (e) {
      console.log(e)
    }
  },
  deleteCareer: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Career.findOne({ _id: id }, { status: 1 });
      if (!checkDelete) return res.json("Career not found");
      await Career.findByIdAndUpdate(id, { $set: { status: 2 } }, { new: true });
      return res.json('Delete Career Successful');
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
}
export { CareersService }

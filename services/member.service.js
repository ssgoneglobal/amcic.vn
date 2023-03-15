import { Member } from "../models/members.model.js";

const MemberService = {
    showData: async (req, res, next) => {
        const members = await Member.find({ isDeleted: false })
        console.log(members)
        return res.render('about', { members: members, title: "Giới thiệu" })
    },
    createMember: async (req, res, next) => {
        try {
            const { fullName, position, featuredImage, socialLinks } = req.body

            const members = await Member.create({
                fullName,
                position,
                socialLinks,
                featuredImage
            })
            console.log("success")

        } catch (e) {
            console.log(e)
        }
    }
};
export { MemberService }
import { ContactMessage } from '../../models/contactMessage.model.js';
import { Response } from '../../utils/response.js';
export default {
  showData: async (req, res, next) => {
    try {
      const contacts = await ContactMessage.find({ isDeleted: false }).sort({ createdAt: -1 });
      console.log(contacts)
      return res.render('admin/contacts/contact', {
        contacts: contacts,
        title: 'Contact messages',
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  createMessage: async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      const contactMsg = await ContactMessage.create({
        name, email, subject, message
      });

      // return res.json(Response.success(null, 'Ok'))

      return res.redirect('/')
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  getDetails: async (req, res, next) => {
    try {
      const { contactId } = req.params
      const contact = await ContactMessage.findOne({ contactId })
      if (!contact) return res.json(Response.badRequest("contactNotFound"))
      return res.render('admin/contacts/contact-view', {
        contact: contact,
        title: contact.name
      })
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await ContactMessage.findOne({ _id: id, isDeleted: { $ne: true } });
      if (!checkDelete) return res.json("ContactMessage not found");
      const contact = await ContactMessage.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true });
      return res.redirect('/admin/contacts')
      // return res.json(Response.success(career));
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};

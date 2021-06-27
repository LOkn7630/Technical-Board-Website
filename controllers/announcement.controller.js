const Announcement = require("../models/announcement");
const fs = require("fs");

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort("-creation");
    return res.render("announcements/index", { announcements });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addAnnouncementForm = (req, res) => {
  try {
    return res.render("announcements/add");
  } catch (error) {
    console.log(error.message);
  }
};

exports.postAnnouncement = async (req, res) => {
  // console.log(req.file);
  try {
    const { title, description, club, link } = req.body;
    const pic = req.file.filename;
    var newAnnouncement = new Announcement({
      title,
      description,
      club,
      link,
      pic,
    });
    await newAnnouncement.save();
    console.log(newAnnouncement)
    req.flash("success", "Successfully added new announcement!");
    return res.redirect("/tech/admin/announcement");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getEditForm = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    return res.render("announcements/edit", { announcement });
  } catch (error) {
    console.log(error.message);
  }
};

exports.editAnnouncement = async (req, res) => {
  try {
    const {id} = req.params;
    const { title, description, club, link} = req.body;
    var pic;
    const announcement = await Announcement.findById(id);
    const data = {  title, description, club, link};
    if(req.file){
      fs.unlinkSync(`uploads/announcement/${announcement.pic}`);
      pic = req.file.filename;
      data =  {title, description, club, link,pic};
  }
    await Announcement.findByIdAndUpdate(req.params.id, data);

    req.flash("success", "Successfully updated announcement!");
    return res.redirect("/tech/admin/announcement");
  } catch (error) {
    console.log(error.message);
  } 
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;
    const announcement = await Announcement.findById(id);

    await Announcement.findByIdAndDelete(id);
    fs.unlinkSync(`uploads/announcement/${announcement.pic}`);

    req.flash("success", "Successfully deleted announcement!");
    return res.redirect("/tech/admin/announcement");
  } catch (err) {
    // handle the error
    console.log(err.message);
    return res.redirect("/tech/admin/announcement");
  }
};

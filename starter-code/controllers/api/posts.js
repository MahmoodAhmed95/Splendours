const cloudinary = require("../utils/cloudinary");

async function createPost(req, res) {
  console.log(req.body);
  try {
    const contactRegex = /^(3)\d{7}$|(17|80|66|69)\d{6}$/;
    const contact = req.body.contact;

    //Validate Google Embeded link
    const googleMapRegex =
      /<iframe\s*src="https:\/\/www\.google\.com\/maps\/embed\?[^"]+"*\s*[^>]+>*<\/iframe>/;
    const googleMap = req.body.location;

    //Validate Event name
    const eventNameRegex = /^(?=(.*[a-zA-Z]){3})[a-zA-Z0-9\s]+$/;
    const eventName = req.body.name;

    //Validate Cost
    const eventCostRegex = /^\d{1,7}(\.\d{1,2})?$/;
    const eventCost = req.body.cost;

    if (!contactRegex.test(contact) && contact == !null) {
      console.log("Invalid number");
      req.flash("Error", `Invalid Contact Number!`);
      res.redirect("/admins/events");
    } else if (!googleMapRegex.test(googleMap)) {
      console.log("Invalid Google Maps link");
      req.flash("Error", `Invalid Google Maps Link`);
      res.redirect("/admins/events");
    } else if (!eventNameRegex.test(eventName)) {
      console.log("Invalid Event Name");
      req.flash("Error", `Invalid Event Name`);
      res.redirect("/admins/events");
    } else if (!eventCostRegex.test(eventCost) && eventCost === !null) {
      console.log("Invalid Event Cost");
      req.flash("Error", `Invalid Cost`);
      res.redirect("/admins/events");
    } else {
      if (req.body.imageChangeControl == "old") {
        req.body.profile_img = req.body.oldImageProfile;
        req.body.cloudinary_id = req.body.oldImage;
      } else {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.profile_img = result.secure_url;
        req.body.cloudinary_id = result.public_id;
      }
      delete req.body.suggestName;
      delete req.body.imageChangeControl;
      delete req.body.oldImage;
      delete req.body.oldImageProfile;
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profile_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;

      await Event.create(req.body); //TODO
      req.flash("success", `Events Created Successfully!`); //TODO
      res.redirect("/admins/events");
    }
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}

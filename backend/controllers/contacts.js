const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .db()
      .collection("contact")
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while retrieving contacts.",
    });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const contact = await mongodb
      .getDb()
      .db()
      .collection("contact")
      .findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Invalid contact ID.",
    });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
};

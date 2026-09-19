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

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("contact")
      .insertOne(newContact);

    res.status(201).json({
      id: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while creating the contact.",
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: "All fields are required.",
      });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("contact")
      .replaceOne({ _id: contactId }, updatedContact);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Invalid contact ID.",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection("contact")
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Contact not found.",
      });
    }

    res.status(204).send();
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
  createContact,
  updateContact,
  deleteContact,
};

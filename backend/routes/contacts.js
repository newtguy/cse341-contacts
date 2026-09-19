const express = require("express");
const contactsController = require("../controllers/contacts");

const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Get all contacts'
  // #swagger.description = 'Returns a list of all contacts stored in the database.'
  contactsController.getAllContacts(req, res);
});

router.get("/:id", (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Get a single contact'
  // #swagger.description = 'Returns a single contact by its MongoDB ObjectId.'
  contactsController.getSingleContact(req, res);
});

router.post("/", (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Create a new contact'
  // #swagger.description = 'Creates a new contact and stores it in the MongoDB database.'
  contactsController.createContact(req, res);
});

router.put("/:id", (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Update a contact'
  // #swagger.description = 'Replaces an existing contact with the provided contact information.'
  contactsController.updateContact(req, res);
});

router.delete("/:id", (req, res) => {
  // #swagger.tags = ['Contacts']
  // #swagger.summary = 'Delete a contact'
  // #swagger.description = 'Deletes an existing contact from the MongoDB database.'
  contactsController.deleteContact(req, res);
});

module.exports = router;

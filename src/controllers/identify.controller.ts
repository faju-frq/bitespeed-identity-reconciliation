import { Request, Response } from "express";
import { Op } from "sequelize";
import { Contact } from "../models/contact.model";

export async function identifyContact(req: Request, res: Response) {
  try {
    const { email, phoneNumber } = req.body;

    //Fetch all contacts that match either email or phone.
    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [email ? { email } : {}, phoneNumber ? { phoneNumber } : {}],
      },
      order: [["createdAt", "ASC"]],
    });

    //if no match found, create new contact.
    if (contacts.length === 0) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "Primary",
      });

      return res.status(200).json({
        contact: {
          primaryContactId: newContact.id,
          emails: [newContact.email].filter(Boolean),
          phoneNumbers: [newContact.phoneNumber].filter(Boolean),
          secondaryContactIDs: [],
        },
      });
    }

    //Determine true primary contact
    const primaryContacts = contacts.filter(
      (c) => c.linkPrecedence === "Primary"
    );

    const truePrimaryContactId =
      primaryContacts.length > 0 ? primaryContacts[0] : contacts[0];

    const primaryContactId = truePrimaryContactId.id;

    const isNewEmail =
      email &&
      contacts
        .map((c) => c.email)
        .filter(Boolean)
        .includes(email);
    const isNewPhoneNumber =
      phoneNumber &&
      contacts
        .map((c) => c.phoneNumber)
        .filter(Boolean)
        .includes(phoneNumber);

    //prevent duplicates by checking whether same inpput  combo already exists.
    const exactMatch = contacts.find(
      (c) => c.email === email && c.phoneNumber === phoneNumber
    );

    if (!exactMatch && isNewEmail | isNewPhoneNumber) {
      await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: "Secondary",
        linkedId: primaryContactId,
      });
    }

    //aggregate other primaries under true primary.
    const otherPrimaries = primaryContacts.slice(1);

    for (const other of otherPrimaries) {
      await other.update({
        linkPrecedence: "Secondary",
        linkedId: primaryContactId,
      });
    }

    // full contact chain
    const allLinkedContacts = await Contact.findAll({
      where: {
        [Op.or]: [{ id: primaryContactId }, { linkedId: primaryContactId }],
      },
    });

    const uniqueEmails = Array.from(
      new Set(allLinkedContacts.map((c) => c.email).filter(Boolean))
    );
    const uniquePhoneNumbers = Array.from(
      new Set(allLinkedContacts.map((c) => c.phoneNumber).filter(Boolean))
    );

    const secondaryContactIDs = allLinkedContacts
      .filter((c) => c.id !== primaryContactId)
      .map((c) => c.id);

    // unified output
    return res.status(200).json({
      contact: {
        primaryContactId,
        emails: uniqueEmails,
        phoneNumbers: uniquePhoneNumbers,
        secondaryContactIDs,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}



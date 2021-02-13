import path from "path";
import shortid from "shortid";
import createDirname from "./lib/dirname.js";
import fsFunc from "./lib/fsFunc.js";

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(`${__dirname}`, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const list = await fsFunc.readFile(contactsPath);
    // fsFunc.writeFile("listContacts.json", list);
    // console.log("Список контактов записан в файл!");
    // console.log("Список контактов: ", JSON.parse(list));
    return JSON.parse(list);
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.find((contact) => contact.id === contactId);
    fsFunc.writeFile(
      "wr-findContact.json",
      JSON.stringify(contactToFind, null, 2)
    );
    console.log("Контакт записан в файл!");
    // console.log(`Нашли контакт под номером ${contactId}: `, contactToFind);
    // return contactToFind;
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newListContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    fsFunc.writeFile(
      "wr-removeContact.json",
      JSON.stringify(newListContacts, null, 2)
    );
    console.log("Новый список контактов записан!");
    // console.log(`Удален контакт номер ${contactId}: `, newListContacts);
    // return newListContacts;
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const id = shortid();
    const newListContacts = [...contacts, { id, name, email, phone }];
    fsFunc.writeFile(
      "wr-newContact.json",
      JSON.stringify(newListContacts, null, 2)
    );
    console.log("Новый список контактов записан!");
    // console.log(`Добавлен контакт ${name}: `, newListContacts);
    // return newListContacts;
  } catch (err) {
    console.log("Error: ", err.message);
  }
}

getContactById(5);
removeContact(2);
addContact("Lena", "mail@gmail.com", "(066) 123-4567");

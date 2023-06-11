import ContactForm from './ContactForm/ContactForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { WrapperContent } from './App.styled';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import initialContacts from './contacts.json';

export const App = () => {
	const [contacts, setContacts] = useState(
		() => (JSON.parse(localStorage.getItem('contacts')) ?? initialContacts)
	);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
	
	

  const createContact = data => {
    const { name, number } = data;
    const contact = {
      name,
      number,
      id: nanoid(),
    };

    if (
      contacts.find(existingContact => existingContact.name === contact.name)
    ) {
      Notiflix.Notify.failure(`${contact.name} is already in your contacts`);
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
      Notiflix.Notify.success(
        `${contact.name} has been successfully added to  your phonebook`
      );
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getFiltredContacts = () => {
    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtredContacts;
  };

  const hadleFilterChange = ({ target }) => {
    setFilter(target.value);
  };
  return (
    <WrapperContent>
      <ContactForm createContact={createContact} />
      {( contacts.length > 0) && (
        <Contacts
          deleteContact={deleteContact}
          contacts={getFiltredContacts()}
        ></Contacts>
      )}

      <Filter value={filter} onChange={hadleFilterChange}></Filter>
    </WrapperContent>
  );
};

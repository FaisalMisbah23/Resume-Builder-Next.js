// components/ContactForm.tsx

import React, { useState } from 'react';

interface ContactFormProps {
  initialContact: Contact | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialContact }) => {
  const [contact, setContact] = useState<Contact | null>(initialContact);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (response.ok) {
        console.log('Contact saved successfully');
      } else {
        console.error('Failed to save contact');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={contact?.name || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contact?.email || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={contact?.phone || ''}
          onChange={handleChange}
        />
      </div>
      {/* Add other contact fields here */}
      <button type="submit">Save</button>
    </form>
  );
};

export default ContactForm;

interface Contact {
  _id?: string; // Use ? to denote optional fields
  name: string;
  email: string;
  phone: string;
  // Add other contact fields here
}

import React, { useState } from 'react';
import '../assets/styles/contactform.css';

function ContactForm({ contact, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    fullName: contact?.fullName || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    subject: contact?.subject || '',
    message: contact?.message || '',
  });

  const [errors, setErrors] = useState({});

  // Basic form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const now = new Date().toISOString();
      const contactData = {
        ...formData,
        createdAt: contact?.createdAt || now,
        updatedAt: now,
      };
      onSubmit(contactData);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="contact-form-container">
        <h2>{contact ? 'Edit Contact Message' : 'Send a Message'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone (optional):</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98765 43210"
            />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="What's this about?"
            />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {contact ? 'Update' : 'Send'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;

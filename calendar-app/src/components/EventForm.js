import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const EventForm = () => {
  const { addEvent, editEvent, events } = useContext(EventContext);
  const [event, setEvent] = useState({ id: '', title: '', date: '', category: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const existingEvent = events.find(event => event.id === id);
      if (existingEvent) setEvent(existingEvent);
    }
  }, [id, events]);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editEvent(event);
    } else {
      addEvent({ ...event, id: Date.now().toString() });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <select name="category" value={event.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <button type="submit">{id ? 'Edit Event' : 'Add Event'}</button>
    </form>
  );
};

export default EventForm;

// src/components/CalendarView.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import styled from 'styled-components';

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 20px;
`;

const Day = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  position: relative;
`;

const CalendarView = () => {
  const { events } = useContext(EventContext);

  return (
    <div>
      <h1>Calendar</h1>
      <CalendarGrid>
        {Array.from({ length: 30 }, (_, i) => (
          <Day key={i}>
            <div>{i + 1}</div>
            <div>
              {events.filter(event => new Date(event.date).getDate() === i + 1).map(event => (
                <Link key={event.id} to={`/edit-event/${event.id}`}>
                  {event.title}
                </Link>
              ))}
            </div>
          </Day>
        ))}
      </CalendarGrid>
      <Link to="/add-event">Add Event</Link>
    </div>
  );
};

export default CalendarView;

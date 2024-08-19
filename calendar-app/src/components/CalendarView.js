import React, { useContext, useState, useEffect } from 'react';
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
  const [currentDate, setCurrentDate] = useState(new Date());

  // Extracting the current month and year from the currentDate state
  const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December
  const currentYear = currentDate.getFullYear();

  // This useEffect is just to ensure that the state is updated correctly when the component mounts
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <div>
      <h1>Calendar</h1>
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</h2>
      <CalendarGrid>
        {Array.from({ length: 30 }, (_, i) => (
          <Day key={i}>
            <div>{i + 1}</div>
            <div>
              {events
                .filter(event => new Date(event.date).getDate() === i + 1)
                .map(event => (
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

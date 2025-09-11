// src/pages/HabitDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import habitService from '../services/habitService'; // Import our service
import toast from 'react-hot-toast';

// NEW: Import the Calendar component and its default CSS
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { isSameDay } from 'date-fns';

import StatsDisplay from '../components/StatsDisplay';




function HabitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for the core habit data
  const [habit, setHabit] = useState(null);
  // State for the calculated stats data
  const [stats, setStats] = useState(null); 
  
  // We can use a single loading and error state for the initial page load
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch all necessary data in parallel
  useEffect(() => {
    const fetchAllHabitData = async () => {
      try {
        // Promise.all allows us to run multiple async operations concurrently.
        // It's more efficient than waiting for one to finish before starting the next.
        const [habitData, statsData] = await Promise.all([
          habitService.getHabitById(id), // First promise: get the main habit data
          habitService.getHabitStats(id),  // Second promise: get the stats
        ]);

        // Once both promises resolve, we update our state.
        setHabit(habitData);
        setStats(statsData);

      } catch (err) {
        // If any of the promises in Promise.all fails, it will be caught here.
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllHabitData();
  }, [id]); // The effect re-runs if the habit ID in the URL changes.

  const getTileClassName = ({ date, view }) => {
    // We only want to apply custom styling to the 'month' view (the days).
    if (view === 'month') {
      // Check if there is a completion record for the current tile's date.
      // The .some() method is very efficient here, as it stops checking
      // as soon as it finds a match.
      const isCompleted = habit.completions.some((completion) =>
        // 'date' is the date of the tile being rendered by the calendar.
        // 'completion.date' is the date string from our database.
        // We use isSameDay to reliably compare them.
        // Note: We must convert the completion.date string to a Date object first!
        isSameDay(date, new Date(completion.date))
      );

      // If the date is a completed date, return our custom class name.
      if (isCompleted) {
        return 'habit-completed';
      }
    }
    // For any other case, return null so no extra class is added.
    return null;
  };

  const handleDelete = async () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${habit.name}"? This action cannot be undone and will permanently remove all tracking data for this habit.`
    );

    if (!isConfirmed) {
      return; // User cancelled, do nothing
    }

    const deletePromise = habitService.deleteHabit(habit._id);

    // Using toast.promise for the delete action
    toast.promise(deletePromise, {
      loading: 'Deleting habit...',
      success: () => {
        // Navigate back to dashboard after successful deletion
        navigate('/dashboard');
        return `"${habit.name}" has been deleted successfully.`;
      },
      error: (err) => `Failed to delete habit: ${err.message}`,
    });
  };  // --- Conditional Rendering ---
  // It's a best practice to handle loading and error states first.
  if (isLoading) {
    return <div className="container"><p>Loading habit details...</p></div>;
  }

  if (error) {
    return <div className="container" style={{ color: 'red' }}><p>Error: {error}</p></div>;
  }
  
  // If loading is done and there's no error, but habit is still null (e.g., not found)
  if (!habit) {
    return <div className="container"><p>Habit not found.</p></div>;
  }

  // --- Render the Habit Details ---
  // If we have the data, we can render it.
  return (
    <div className="container">
      {/* --- Updated Header with better layout --- */}
      <header className="habit-detail-header">
        <Link to="/dashboard" className="back-button">Back to Dashboard</Link>
        <div className="habit-title">
          <div className="habit-title-content">
            <h2>{habit.name}</h2>
            <p>Created on: {new Date(habit.createdAt).toLocaleDateString()}</p>
          </div>
          <button 
            className="delete-button-detail" 
            onClick={handleDelete}
            title="Delete this habit"
            aria-label={`Delete ${habit.name}`}
          >
            Delete Habit
          </button>
        </div>
      </header>
      <main>
        {/* --- NEW STATS SECTION ADDED BELOW --- */}
        {/* We will display the stats here once loaded. */}
        <StatsDisplay stats={stats} />

        <section className="completion-history-section">
          <h3 className="completion-history-title">Completion History</h3>
          <div className="habit-detail-calendar-container">
            <Calendar tileClassName={getTileClassName} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HabitDetailPage;

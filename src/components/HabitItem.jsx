// src/components/HabitItem.jsx

import React from 'react';
import habitService from '../services/habitService';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isSameDay } from 'date-fns';


// The component still receives a single 'habit' object as a prop.
function HabitItem({ habit , onHabitUpdate, onHabitDelete }) {
    const isCompletedToday = () => {
    // 1. Get today's date and normalize it to the start of the day (midnight).
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 2. Use the .some() array method. It's highly efficient for this task.
    // It will check each `completion` in the array and return `true`
    // as soon as it finds one that matches our condition.
    return habit.completions.some((completion) => {
      // The `completion.date` from our API is a JSON string. We must
      // convert it into a JavaScript Date object to perform a comparison.
      const completionDate = new Date(completion.date);
      
      // Although our backend normalizes the date, it's a robust practice
      // to normalize it on the frontend as well to ensure a perfect match.
      completionDate.setHours(0, 0, 0, 0);

      // We compare the numeric value of the dates using .getTime().
      // This is the most reliable way to check if two Date objects are identical.
      return completionDate.getTime() === today.getTime();
    });
  };

  const handleTrack = async (e) => {
    // Prevent the click from bubbling up to the Link component
    e.preventDefault();
    e.stopPropagation();

    const trackingPromise = habitService.trackHabit(habit._id);

    // Using toast.promise for the tracking action
    toast.promise(trackingPromise, {
      loading: 'Updating habit...',
      success: (updatedHabit) => {
        onHabitUpdate(updatedHabit);
        // We can determine if it was a track or untrack action for a better message
        const wasJustCompleted = updatedHabit.completions.some(c => isSameDay(new Date(c.date), new Date()));
        return wasJustCompleted ? 'Habit tracked! Great job!' : 'Habit untracked.';
      },
      error: (err) => `Update failed: ${err.message}`,
    });
  
  };

  const handleDelete = async (e) => {
    // Prevent the click from bubbling up to the Link component
    e.preventDefault();
    e.stopPropagation();

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
        // Call the parent function to remove the habit from the state
        onHabitDelete(habit._id);
        return `"${habit.name}" has been deleted successfully.`;
      },
      error: (err) => `Failed to delete habit: ${err.message}`,
    });
  };


  return (
    <div className="habit-item">
      {/* Delete button positioned absolutely in top-right corner */}
      <button 
        className="delete-button" 
        onClick={handleDelete}
        title="Delete this habit"
        aria-label={`Delete ${habit.name}`}
      >
        <span className="delete-icon">🗑️</span>
      </button>

      {/* Clickable content area */}
      <Link to={`/habit/${habit._id}`} className="habit-item-content">
        <div className="habit-info">
          <h3>{habit.name}</h3>
          <p>Created on: {new Date(habit.createdAt).toLocaleDateString()}</p>
        </div>
      </Link>
      
      {/* Checkbox area below the content */}
      <div className="habit-track" onClick={handleTrack}>
        <label htmlFor={`track-${habit._id}`} className="checkbox-label">
          <input
            type="checkbox"
            id={`track-${habit._id}`}
            checked={isCompletedToday()}
            readOnly 
          />
          <span className="checkbox-custom"></span>
          Today
        </label>
      </div>
    </div>
  );
}



export default HabitItem;
// src/components/CreateHabitForm.jsx

import React, { useState } from 'react';
import habitService from '../services/habitService';
import Spinner from './Spinner';
import { toast } from 'react-hot-toast';

// This component receives a function prop `onHabitCreated`
// which it will call to notify the parent (DashboardPage) that a new habit was added.
function CreateHabitForm({ onHabitCreated }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('daily');
  const [goal, setGoal] = useState('');
  const [frequency, setFrequency] = useState('');
  // We no longer need isSubmitting or error state, toast will handle it!

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation remains important
    if (!name) {
      // We can still use toasts for simple validation errors
      toast.error('Habit name is required.');
      return;
    }
    if (type === 'weekly' && (!frequency || frequency < 1)) {
      toast.error('Weekly habits require a frequency of at least 1.');
      return;
    }

    const habitData = {
      name,
      type,
      ...(goal && { goal: Number(goal) }),
      ...(type === 'weekly' && frequency && { frequency: Number(frequency) }),
    };

    // --- THIS IS THE UPGRADED LOGIC ---
    // The `habitService.createHabit` function returns a promise.
    // `toast.promise` will watch this promise and show a different toast
    // for each of its three states: pending (loading), fulfilled (success), or rejected (error).
    const creationPromise = habitService.createHabit(habitData);

    await toast.promise(creationPromise, {
      loading: 'Creating your new habit...',
      success: (newHabit) => {
        // This function runs when the promise resolves.
        // The resolved value (the new habit object) is passed as an argument.
        onHabitCreated(newHabit);
        
        // Reset the form fields after successful creation
        setName('');
        setType('daily');
        setGoal('');
        setFrequency('');

        // The return value of this function becomes the success message!
        return `Habit "${newHabit.name}" created successfully!`;
      },
      error: (err) => {
        // This function runs when the promise rejects.
        // The error object is passed as an argument.
        // The return value becomes the error message.
        return `Failed to create habit: ${err.message}`;
      },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="create-habit-form">
      <h3>Create a New Habit</h3>
      
      
      <div className="form-group">
        <label htmlFor="habit-name">Habit Name</label>
        <input
          type="text"
          id="habit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Read for 20 minutes"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="habit-type">Type</label>
        <select id="habit-type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      
      {/* --- CONDITIONAL RENDERING IN ACTION --- */}
      {/* This 'frequency' form group will only be rendered if the 'type' state is 'weekly' */}
      {type === 'weekly' && (
        <div className="form-group">
          <label htmlFor="habit-frequency">Frequency (per week)</label>
          <input
            type="number"
            id="habit-frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            placeholder="e.g., 3"
            min="1"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="habit-goal">Goal (Optional)</label>
        <input
          type="number"
          id="habit-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 10 (for 'read 10 pages')"
          min="1"
        />
        <small>For quantitative habits like pages read or minutes meditated.</small>
      </div>
      
      <button type="submit" className="button-primary">
        Create Habit
      </button>
    </form>
  );
}

export default CreateHabitForm;
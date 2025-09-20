// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import habitService from '../services/habitService';
import { useAuth } from '../context/AuthContext';
// NEW: Import the HabitItem component we just created.
import HabitItem from '../components/HabitItem';
import ProgressChart from '../components/ProgressChart';
import CreateHabitForm from '../components/CreateHabitForm';
import Spinner from '../components/Spinner';
import MigrationHelper from '../components/MigrationHelper';

function DashboardPage() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

   // --- NEW STATE VARIABLES FOR THE CHART ---
    const [period, setPeriod] = useState('30d');
  const [chartData, setChartData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [chartError, setChartError] = useState(null);

  useEffect(() => {
    // ... no changes to the useEffect hook ...
    const fetchHabits = async () => {
      try {
        const habitsData = await habitService.getHabits();
        setHabits(habitsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHabits();
  }, []);


  // --- NEW useEffect FOR FETCHING CHART DATA ---
  // We use a separate useEffect for the chart data. This keeps concerns separate
  // and allows the habit list and chart to load independently.
  useEffect(() => {
    fetchChartData();
  }, [period]); // The dependency array means this runs when period changes.


   // This function will be passed down to each HabitItem.
  // It receives the fully updated habit object from the child component.
  const handleHabitChange = (newOrUpdatedHabit, isNew = false) => {
    if (isNew) {
      // Add the newly created habit to the top of the list
      setHabits([newOrUpdatedHabit, ...habits]);
    } else {
      // Update an existing habit in the list
      setHabits(habits.map((h) => (h._id === newOrUpdatedHabit._id ? newOrUpdatedHabit : h)));
    }
  };

  // This function will handle habit deletion
  const handleHabitDelete = (habitId) => {
    // Remove the deleted habit from the state
    setHabits(habits.filter((h) => h._id !== habitId));
    // Refresh chart data to show updated completion data
    fetchChartData();
  };

  // Extract chart data fetching to a reusable function
  const fetchChartData = async () => {
    setIsChartLoading(true); 
    setChartError(null);
    try {
      const data = await habitService.getChartData(period);
      setChartData(data);
    } catch (err) {
      setChartError(err.message);
    } finally {
      setIsChartLoading(false);
    }
  };

  if (isLoading) {
    return (<div className="loading-container">
        <Spinner />
      </div>
      );
  }

  if (error) {
    return <div className="container" style={{ color: 'red' }}><p>Error: {error}</p></div>;
  }

  

  return (
    <div className="container">
      <header>
        <h2>Welcome, {user?.name}!</h2>
        <p>This is your personal dashboard. Let's track some habits!</p>
      </header>

      {/* Add migration helper for existing users */}
      <MigrationHelper />

     <section className="chart-section">
        <div className="chart-header">
          <h2>Recent Activity</h2>
          {/* --- NEW: Period Selector Buttons --- */}
          <div className="period-selector">
            <button
              onClick={() => setPeriod('7d')}
              className={period === '7d' ? 'active' : ''}
            >
              7D
            </button>
            <button
              onClick={() => setPeriod('30d')}
              className={period === '30d' ? 'active' : ''}
            >
              30D
            </button>
            <button
              onClick={() => setPeriod('90d')}
              className={period === '90d' ? 'active' : ''}
            >
              90D
            </button>
          </div>
        </div>

        {isChartLoading ? (
           <div className="section-loading-container">
            <Spinner />
          </div>
        ) : chartError ? (
          <p style={{ color: 'red' }}>Error loading chart: {chartError}</p>
        ) : (
          <ProgressChart data={chartData} />
        )}
      </section>

      <section className="create-habit-section">
        <CreateHabitForm onHabitCreated={(newHabit) => handleHabitChange(newHabit, true)} />
      </section>
      
      <section className="habit-list-section">
        <h3>Your Habits</h3>
        {/* --- THIS IS THE UPDATED SECTION --- */}
        <div className="habit-list">
          {habits.length > 0 ? (
            // If there are habits, we map over the array.
            habits.map((habit) => (
              // For each habit object in the array, we render a HabitItem component.
              // 1. `key={habit._id}`: We provide the unique MongoDB _id as the key. This is critical for React.
              // 2. `habit={habit}`: We pass the entire habit object down as a prop to the HabitItem.
              <HabitItem
                key={habit._id}
                habit={habit}
                // NEW: Pass the handler function down as a prop.
                onHabitUpdate={handleHabitChange}
                // NEW: Pass the delete handler function down as a prop.
                onHabitDelete={handleHabitDelete}
              />
            ))
          ) : (
            // If the habits array is empty, we show a helpful message.
            <p>You haven't created any habits yet. Let's add one!</p>
          )}
        </div>
      </section>
      
    </div>
  );
}

export default DashboardPage;
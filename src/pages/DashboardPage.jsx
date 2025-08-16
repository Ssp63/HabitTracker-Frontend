// src/pages/DashboardPage.jsx

function DashboardPage() {
  return (
    <div className="container">
      <header>
        {/* We will eventually make this name dynamic based on the logged-in user */}
        <h2>Welcome, User!</h2>
        <p>This is your personal dashboard. Let's track some habits!</p>
      </header>
      <main>
        {/* 
          This section will be built out significantly. It will contain logic
          to fetch the user's habits from our API and render them in a list
          or grid format using a reusable `HabitItem` component.
        */}
        <h3>Your Habits</h3>
        <div className="habit-list-placeholder">
          <p>Your list of habits will appear here.</p>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
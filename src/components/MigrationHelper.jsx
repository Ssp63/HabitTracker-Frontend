// src/components/MigrationHelper.jsx

import React, { useState } from 'react';
import habitService from '../services/habitService';

function MigrationHelper() {
  const [migrationStatus, setMigrationStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMigration = async () => {
    if (window.confirm('This will migrate your existing habit completion data to preserve it when habits are deleted. Do you want to proceed?')) {
      setIsLoading(true);
      setMigrationStatus('');
      
      try {
        const result = await habitService.migrateExistingCompletions();
        setMigrationStatus(`Migration successful! Migrated ${result.migratedCompletions} completion records.`);
      } catch (error) {
        setMigrationStatus(`Migration failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="migration-helper">
      <h3>One-Time Data Migration</h3>
      <p>
        To preserve your habit completion history when habits are deleted, 
        please run this one-time migration. This will ensure your progress 
        charts and statistics remain intact even after deleting habits.
      </p>
      
      <button 
        onClick={handleMigration} 
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? 'Migrating...' : 'Migrate Completion Data'}
      </button>
      
      {migrationStatus && (
        <div className={`migration-status ${migrationStatus.includes('successful') ? 'success' : 'error'}`}>
          {migrationStatus}
        </div>
      )}
      
      <style jsx>{`
        .migration-helper {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .migration-helper h3 {
          color: #495057;
          margin-bottom: 10px;
        }
        
        .migration-helper p {
          color: #6c757d;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .btn-primary {
          background-color: #007bff;
          color: white;
        }
        
        .btn:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
        
        .migration-status {
          margin-top: 15px;
          padding: 10px;
          border-radius: 4px;
        }
        
        .migration-status.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .migration-status.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}

export default MigrationHelper;
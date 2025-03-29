import { useState } from 'react';

export default function ElectrasimatorUI() {
  const [log, setLog] = useState([]);
  const [cash, setCash] = useState(1000);
  const [reputation, setReputation] = useState(5.0);
  const [day, setDay] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [newJobName, setNewJobName] = useState("");
  const [newJobPrice, setNewJobPrice] = useState("");

  const handleWorkDay = () => {
    let totalEarned = 0;
    const updatedJobs = jobs.map((job) => {
      if (!job.completed) {
        const paid = Math.random() > 0.1;
        const logMsg = paid
          ? `✅ Completed ${job.name} for $${job.price}`
          : `🚫 Customer ghosted on ${job.name}`;
        setLog((prev) => [logMsg, ...prev]);
        totalEarned += paid ? parseFloat(job.price) : 0;
        return { ...job, completed: true };
      }
      return job;
    });

    const repChange = (Math.random() * 0.4 - 0.2).toFixed(2);
    const newRep = Math.min(5.0, Math.max(1.0, reputation + parseFloat(repChange)));

    setJobs(updatedJobs);
    setCash(cash + totalEarned);
    setReputation(newRep);
    setDay(day + 1);
    setLog((prev) => [
      `💼 End of Day ${day}: Earned $${totalEarned}, Rep change: ${repChange}`,
      ...prev,
    ]);
  };

  const handleAddJob = () => {
    if (!newJobName || !newJobPrice) return;
    const job = {
      name: newJobName,
      price: parseFloat(newJobPrice),
      completed: false,
    };
    setJobs([...jobs, job]);
    setNewJobName("");
    setNewJobPrice("");
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#222', borderRadius: '8px' }}>
        <h1>⚡ ElectraSimator</h1>
        <p>💵 Cash: ${cash}</p>
        <p>⭐ Reputation: {reputation.toFixed(2)}</p>
        <p>📅 Day: {day}</p>
        <button onClick={handleWorkDay}>Work a Day</button>
      </div>

      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#222', borderRadius: '8px' }}>
        <h2>Add Job</h2>
        <input
          placeholder="Job name"
          value={newJobName}
          onChange={(e) => setNewJobName(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={newJobPrice}
          onChange={(e) => setNewJobPrice(e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <button onClick={handleAddJob}>Add Job</button>
      </div>

      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#222', borderRadius: '8px' }}>
        <h2>📋 Job Board</h2>
        {jobs.length === 0 ? (
          <p>No jobs yet!</p>
        ) : (
          jobs.map((job, i) => (
            <div key={i} style={{ fontSize: '0.9rem' }}>
              {job.completed ? '✅' : '🕒'} {job.name} — ${job.price}
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '1rem', background: '#222', borderRadius: '8px' }}>
        <h2>📜 Event Log</h2>
        {log.length === 0 ? <p>No activity yet!</p> : log.map((entry, idx) => <p key={idx}>{entry}</p>)}
      </div>
    </div>
  );
}

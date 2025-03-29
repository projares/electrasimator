import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
        const paymentChance = Math.random();
        const paid = paymentChance > 0.1;
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
    <div className="p-4 grid gap-4 max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-4 space-y-2">
          <h1 className="text-xl font-bold">ElectraSimator: Alpha Test</h1>
          <p>💵 Cash: ${cash}</p>
          <p>⭐ Reputation: {reputation.toFixed(2)}</p>
          <p>📅 Day: {day}</p>
          <Button onClick={handleWorkDay}>Work a Day</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">➕ Add Job</h2>
          <Input
            placeholder="Job name (e.g. Replace Panel)"
            value={newJobName}
            onChange={(e) => setNewJobName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={newJobPrice}
            onChange={(e) => setNewJobPrice(e.target.value)}
          />
          <Button onClick={handleAddJob}>Add Job</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold">📋 Job Board</h2>
          {jobs.length === 0 ? (
            <p>No jobs yet!</p>
          ) : (
            jobs.map((job, i) => (
              <div key={i} className="text-sm">
                {job.completed ? "✅" : "🕒"} {job.name} — ${job.price}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2">📜 Event Log</h2>
          <div className="space-y-1 text-sm">
            {log.length === 0 ? <p>No activity yet!</p> : log.map((entry, idx) => <p key={idx}>{entry}</p>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react'
import AssessmentResults from './components/AssessmentResults'
import './App.css'

function App() {
  const [instanceId, setInstanceId] = useState('d1111111-1111-1111-1111-111111111111')

  return (
    <div className="app">
        <div className="instance-selector">
          <label htmlFor="instance-id">Assessment Instance ID:</label>
          <input
            id="instance-id"
            type="text"
            value={instanceId}
            onChange={(e) => setInstanceId(e.target.value)}
            placeholder="Enter instance ID"
          />
        </div>
      <main className="app-main">
        <AssessmentResults instanceId={instanceId} />
      </main>
    </div>
  )
}

export default App

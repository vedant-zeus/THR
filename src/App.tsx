import { WorkflowCanvas } from './components/flow/WorkflowCanvas';
import { Sidebar } from './components/sidebar/Sidebar';
import { ConfigPanel } from './components/config-panel/ConfigPanel';
import { Sandbox } from './components/sandbox/Sandbox';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
      </header>
      <main className="app-main">
        <Sidebar />
        <div className="canvas-container">
          <WorkflowCanvas />
          <Sandbox />
        </div>
        <ConfigPanel />
      </main>
    </div>
  );
}

export default App;

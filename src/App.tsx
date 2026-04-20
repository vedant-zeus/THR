import { useEffect } from 'react';
import { useWorkflowStore } from './store/useWorkflowStore';
import { WorkflowCanvas } from './components/flow/WorkflowCanvas';
import { Sidebar } from './components/sidebar/Sidebar';
import { ConfigPanel } from './components/config-panel/ConfigPanel';
import { Sandbox } from './components/sandbox/Sandbox';
import { LandingPage } from './components/landing/LandingPage';
import { ThemeToggle } from './components/common/ThemeToggle';
import { Home } from 'lucide-react';
import './index.css';

function App() {
  const { view, setView, theme } = useWorkflowStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('designer')} />;
  }

  return (
    <div className="app-container" data-theme={theme}>
      <header className="app-header">
        <div className="header-left">
          <button className="icon-btn home-btn" onClick={() => setView('landing')} title="Return to Landing Page">
            <Home size={20} />
          </button>
          <h1>HR - WorkFlow</h1>
        </div>
        <div className="header-right">
          <ThemeToggle />
        </div>
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

import React, { useState } from 'react';
import { ArrowRight, LayoutGrid, X, Zap, Shield, Save, Play, Search, Eye } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  {
    icon: <Zap size={24} />,
    title: "Drag & Drop",
    desc: "Build complex HR logic visually with our intuitive node-based canvas."
  },
  {
    icon: <Eye size={24} />,
    title: "Dual Theme",
    desc: "Experience the studio in premium Dark or Light modes tailored for focus."
  },
  {
    icon: <Save size={24} />,
    title: "Persistence",
    desc: "Save snapshots of your designs and load them back with a single click."
  },
  {
    icon: <Play size={24} />,
    title: "Simulation",
    desc: "Test your workflows in real-time with our built-in process runner."
  },
  {
    icon: <Shield size={24} />,
    title: "Validation",
    desc: "Automatic detection of infinite loops and broken workflow paths."
  },
  {
    icon: <Search size={24} />,
    title: "Audit Logs",
    desc: "Track every step of your simulation with precise, real-time timestamps."
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="landing-page">
      <div className="landing-header-actions">
        <ThemeToggle />
      </div>
      
      <div className="grid-background"></div>
      
      <div className="landing-content">
        <h1 className="landing-title">HR - WORKFLOW</h1>
        <p className="landing-subtitle">Design. Automate. Scale.</p>
        
        <div className="landing-actions">
          <button className="landing-btn primary" onClick={onStart}>
            <span>ENTER DESIGNER</span>
            <ArrowRight size={20} />
          </button>
          
          <button className="landing-btn secondary" onClick={() => setShowFeatures(true)}>
            <LayoutGrid size={20} />
            <span>FEATURES</span>
          </button>
        </div>
      </div>

      {showFeatures && (
        <div className="modal-overlay" onClick={() => setShowFeatures(false)}>
          <div className="features-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowFeatures(false)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2>Studio Features</h2>
              <p>Everything you need to automate your HR operations.</p>
            </div>
            <div className="feature-grid">
              {features.map((f, i) => (
                <div key={i} className="feature-box">
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="landing-footer">
        <p>Built for modern HR teams. Efficient. Visual. Powerful.</p>
      </div>
    </div>
  );
};

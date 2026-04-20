import { ArrowRight, LayoutGrid } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
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
          
          <button className="landing-btn secondary">
            <LayoutGrid size={20} />
            <span>FEATURES</span>
          </button>
        </div>
      </div>
      
      <div className="landing-footer">
        <p>Built for modern HR teams. Efficient. Visual. Powerful.</p>
      </div>
    </div>
  );
};

import React from 'react';
import './App.css';
import './components/theme.css';
import ManageWorkExperience from './pages/manage_work_experience';
import { ThemeProvider, useTheme } from './context/themecontext';

function AppContent() {
  const { theme } = useTheme();
  
  React.useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div className={`App ${theme}-theme`}>
      <ManageWorkExperience />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

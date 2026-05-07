import { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import SoundPrompt from './components/SoundPrompt';
import LoginScreen from './components/LoginScreen';
import Portfolio from './components/Portfolio';

function App() {
  const [stage, setStage] = useState('sound'); // sound | login | portfolio

  return (
    <SoundProvider>
      {stage === 'sound' && <SoundPrompt onDecide={() => setStage('login')} />}
      {stage === 'login' && <LoginScreen onEnter={() => setStage('portfolio')} />}
      {stage === 'portfolio' && <Portfolio />}
    </SoundProvider>
  );
}

export default App;

import { useState } from 'react';
import { SoundProvider } from './context/SoundContext';
import SoundPrompt from './components/SoundPrompt';
import Portfolio from './components/Portfolio';

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <SoundProvider>
      {!entered && <SoundPrompt onDecide={() => setEntered(true)} />}
      {entered && <Portfolio />}
    </SoundProvider>
  );
}

export default App;

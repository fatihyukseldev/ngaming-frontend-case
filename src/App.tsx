import BetSlip from './features/bet-slip/components/BetSlip';
import Bulletin from './features/bulletin/Bulletin';

const App = () => {
  return (
    <main className="app">
      <h1>NGAMING</h1>
      <div className="appContent">
        <Bulletin />
        <BetSlip />
      </div>
    </main>
  );
};

export default App;

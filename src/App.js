import 'firebase/auth';
import firebaseConn from './firebaseConn';

import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';

import SendInvites from './SetInvites';
import SignUp from './SignUp';

const auth = firebaseConn.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <SendInvites user={user} /> : <SignUp />}
      </header>
    </div>
  );
}

export default App;

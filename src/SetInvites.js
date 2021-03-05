import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

function SetInvites({ user }) {
  const query = firestore.collection('invites').where('sender', '==', user.id);

  const [invites] = useCollectionData(query);

  const [digits, setDigits] = useState('');
  const phoneNumber = `+1${digits}`;

  const sendInvite = async () => {
    const inviteRef = firestore.collection('invites').doc(phoneNumber);
    await inviteRef.set({
      phoneNumber,
      sender: user.id,
    });
  }

  return (
    <div>
      <h1>Invite your BFFs</h1>

      {invites?.map((data) => (
        <p>You invited {data?.phoneNumber}</p>
      ))}

      {invites?.length < 2 && (
        <>
          <input value={digits} onChange={(e) => setDigits(e.target.value)} />
          <button onClick={sendInvite}>Send Invite</button>
        </>
      )}

      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}


export default SetInvites;

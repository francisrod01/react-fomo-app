import firebaseConn from './firebaseConn';
import 'firebase/auth';
import 'firebase/firestore';

import { useEffect, useState } from "react";

const firestore = firebaseConn.firestore();
const auth = firebaseConn.auth();

function PhoneNumberVerification({ recaptcha }) {
  const [digits, setDigits] = useState('');
  const [invited, setInvited] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');

  // echo 1 15 format
  const phoneNumber = `+1${digits}`;

  // Step 1 - Verify Invite
  useEffect(() => {
    if (phoneNumber.length === 12) {
      const ref = firestore.collection('invites').doc(phoneNumber);
      ref.get().then(({ exists }) => { setInvited(exists) });
    } else {
      setInvited(false);
    }
  }, [phoneNumber]);

  // Step 2 - Sign in
  const signInWithPhoneNumber = async () => {
    setConfirmationResult(await auth.signInWithPhoneNumber(phoneNumber, recaptcha));
  }

  // Step 3 - Verify SMS code
  const verifyCode = async () => {
    const result = await confirmationResult.confirm(code);
    console.log(result.user);
  }

  return (
    <div>
      <h1>Sign Up!</h1>

      <fieldset>
        <label>10 digit US phone number</label>
        <br />
        <input value={digits} onChange={(e) => setDigits(e.target.value)} />

        <button className={!invited ? 'hide' : ''} onClick={signInWithPhoneNumber}>
          Sign In
        </button>

        {invited ?
          <p className="success">You are one of the cool kids!</p> :
          <p className="danger">This phone number is not cool</p>
        }
      </fieldset>

      {confirmationResult && (
        <fieldset>
          <label>Verify code</label>
          <br />
          <input value={code} onChange={(e) => setCode(e.target.value)} />

          <button onClick={verifyCode}>Verify Code</button>
        </fieldset>
      )}
    </div>
  );
}

export default PhoneNumberVerification;

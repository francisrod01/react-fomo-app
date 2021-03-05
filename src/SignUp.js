import firebaseConn from './firebaseConn';
import 'firebase/auth';

import { useEffect, useRef, useState } from 'react';

import PhoneNumberVerification from './PhoneNumberVerification';

function SignUp() {
  const [recaptcha, setRecaptcha] = useState(null);
  const element = useRef(null);

  useEffect(() => {
    if (!recaptcha) {
      const verifier = new firebaseConn.auth.RecaptchaVerifier(element.current, {
        size: 'invisible',
      });

      verifier.verify().then(() => setRecaptcha(verifier));
    }
  });

  return (
    <>
      {recaptcha && <PhoneNumberVerification recaptcha={recaptcha} />}
      <div ref={element}></div>
    </>
  );
}

export default SignUp;

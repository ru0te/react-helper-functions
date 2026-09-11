import { useRef } from 'react';
import { useState } from 'react';

function formValidation() {
  const [errors, setErrors] = useState({ email: '', password: '' });

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let emailError = '';
    let passwordError = '';

    // validate email
    if (email === '') {
      emailError = 'Required (Cannot be blank)';
    } else if (email.endsWith('@webdevsimplified.com') === false) {
      emailError = 'Must end in `@webdevsimplified.com`';
    }

    // validate password
    if (password === '') {
      passwordError = 'Required (Cannot be blank)';
    } else if (password.length < 10) {
      passwordError = 'Must Be 10 characters or longer';
    } else if (/[A-Z]/.test(password) === false) {
      passwordError = 'Must include an uppercase letter';
    } else if (/[a-z]/.test(password) === false) {
      passwordError = 'Must include a lowercase letter';
    } else if (/\d/.test(password) === false) {
      passwordError = 'Must include a number';
    }

    setErrors({ email: emailError, password: passwordError });

    if (emailError === '' && passwordError === '') {
      alert('Success!');
    }
  }
}

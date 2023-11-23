// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function PasswordResetForm() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [csrfToken, setCsrfToken] = useState('');

//   useEffect(() => {
//     // Fetch CSRF token from your Django server
//     const fetchCsrfToken = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
//         setCsrfToken(response.data.csrfToken);
//         console.log('CSRF Token:', response.data.csrfToken);
        
//       } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//       }
//     };

//     fetchCsrfToken();
//   },[]);


//   const handleReset = async () => {
   
//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/password-reset/',
//         { email },
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrfToken,
//           },
//         }
//       );
//       console.log(response.config.headers)
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error in password reset:', error);
//       setMessage('An unexpected error occurred.');
//     }
//   };

//   return (
//     <div>
//       <form>
//         <h2>Password Reset</h2>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="button" onClick={handleReset}>
//           Reset Password
//         </button>
//         <p>{message}</p>
//       </form>
//     </div>
//   );
// }

// export default PasswordResetForm;


import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {

      // Fetch CSRF token from cookies
      // const csrfToken = document.cookie
      //   .split('; ')
      //   .find(row => row.startsWith('csrftoken='))
      //   .split('=')[1];
      

      const response = await axios.post(
        'http://localhost:8000/password-reset/',  // Adjust the URL based on your Django server endpoint
        { email },
       
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error('Error in password reset:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <form>
        <h2>Password Reset</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={handleReset}>
          Reset Password
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default PasswordResetForm;

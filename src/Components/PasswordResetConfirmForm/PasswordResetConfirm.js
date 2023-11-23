// import React,{useState} from 'react'
// import axios from 'axios';

// function PasswordResetConfirm({uidb64, token}) {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleResetConfirm = async () => {
//     try {
//       const response = await axios.post(`http://127.0.0.1:8000/password-reset-confirm/{uidb64}/{token}/`, {
        
//         new_password: newPassword,
//         confirm_password: confirmPassword,
//       });
//       console.log('Success:', response.data);
//       setMessage(response.data);
//     } catch (error) {
//       setMessage(error.response.data);
//     }
//   };

//   return (
//     <div>
//         <h2>Reset Password</h2>
//       <input
//         type="password"
//         placeholder="Enter your new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Confirm your new password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//       />
//       <button onClick={handleResetConfirm}>Set New Password</button>
//       <p>{message}</p>
//     </div>
//   )
// }

// export default PasswordResetConfirm



// PasswordResetConfirm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordResetConfirm = () => {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetConfirm = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/password-reset-confirm/${uidb64}/${token}/`,{
        password: password,
      });
    
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error confirming password reset.');
    }
  };

  return (
    <div>
      <h2>Password Reset Confirmation</h2>
      <input type="password" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm your new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleResetConfirm}>Submit</button>
      <p>{message}</p>
    </div>
  );
};

export default PasswordResetConfirm;

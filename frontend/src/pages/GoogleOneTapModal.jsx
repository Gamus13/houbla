
import  { useEffect, useState } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios'; // Assurez-vous d'avoir axios installé
import { jwtDecode } from 'jwt-decode';

const GoogleOneTapModal = () => {
  const [users, setUsers] = useState([]);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      // console.log('Login Success:', credentialResponse);

      try {
        const email = extractEmailFromToken(credentialResponse.credential);
        if (email) {
          const userInfo = { email };
          setUsers(prevUsers => [...prevUsers, userInfo]); // Mettre à jour l'état local des utilisateurs
          await saveUsersInfoAsJSON(userInfo); // Enregistrer les informations utilisateur
        }
      } catch (error) {
        console.error('Error processing user information:', error);
      }
    },
    onError: (error) => console.error('Login Failed:', error),
    auto_select: true,
  });

  useEffect(() => {
    // Exécuter lorsque les utilisateurs sont mis à jour
  }, [users]);

  const extractEmailFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      // console.log('Decoded Token:', decodedToken); // Message de débogage
      return decodedToken.email;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  const saveUsersInfoAsJSON = async (userInfo) => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/save-json`;
      console.log('API URL:', apiUrl);  // Vérifiez l'URL dans la console
      const response = await axios.post(apiUrl, userInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Save response:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return null;
}; 


export default GoogleOneTapModal;

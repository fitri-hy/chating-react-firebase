import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { rdb } from "../firebase"


const useFetchUserData = (currentUser, setUser) => {
    useEffect(() => {
      const starCountRef = ref(rdb, `users/${currentUser}/`);
      const onDataChange = (snapshot) => {
        const data = snapshot.val();
        setUser(data);
      };
  
      const unsubscribe = onValue(starCountRef, onDataChange);
  
      return () => {
        // Unsubscribe from the Firebase listener when the component unmounts
        unsubscribe();
      };
    }, [currentUser, setUser]);
};


export default useFetchUserData;
import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { rdb } from "../firebase"


const useFetchUserFriends = (currentUser, setFriends) => {
    useEffect(() => {
      const starCountRef = ref(rdb, `users/${currentUser}/messages/`);
      const onDataChange = (snapshot) => {
        const data = snapshot.val();

        let array = []
        for(let i in data) {
          array.push(data[i])
        }

        setFriends(array);

      };
  
      const unsubscribe = onValue(starCountRef, onDataChange);
  
      return () => {
        // Unsubscribe from the Firebase listener when the component unmounts
        unsubscribe();
      };
    }, [currentUser, setFriends]);
};


export default useFetchUserFriends;
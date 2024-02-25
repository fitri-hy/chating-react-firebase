import { ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { rdb } from "../firebase"


const useFetchUsers = (setUsers) => {
    useEffect(() => {
      const starCountRef = ref(rdb, `users/`);
      const onDataChange = (snapshot) => {
        const data = snapshot.val();

        let array = [];
        for (let i in data) {
            array.push(data[i]);
        }
        setUsers(array)
      };

      const unsubscribe = onValue(starCountRef, onDataChange);
  
      return () => {
        // Unsubscribe from the Firebase listener when the component unmounts
        unsubscribe();
      };
    }, [setUsers]);
};


export default useFetchUsers;
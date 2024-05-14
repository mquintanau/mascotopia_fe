import { useCallback } from 'react';
import Swal from 'sweetalert2';

const useLoadUser = (API_URL, id, setData) => {
  const loadUser = useCallback(async () => {
    try {
      fetch(`${API_URL}/userProfile/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "There was an error loading the user data",
            text: { error },
          });
        });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "There was an error with the server",
        text: { error },
      });
    }
  }, [id, setData]);

  return loadUser;
};

export default useLoadUser;
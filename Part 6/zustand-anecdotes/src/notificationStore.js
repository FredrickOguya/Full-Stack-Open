import { create } from "zustand";

const useNotificationStore = create((set) => ({
  message: null,
  setNotification: (message ) => {
    
      set({ notification: message });

      setTimeout(() => {
        set({ notification: ''})
      }, 5000)
  }, 

}));

export default useNotificationStore;
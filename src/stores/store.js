import { defineStore } from "pinia";

export const useFilterStore = 
defineStore ({
    id : 'FilterStore',
    state : () => ({
        type : '',
        text : '',
        week : 0
    }),
    actions :{
        ChangeWeek(newVal){
            this.week = parseInt(newVal);
        }
    }
});

export const useAdminStore = 
defineStore ({
    id : 'AdminStore',
    state : () => ({
        selected : 'teacher'
    }),
    actions : {
        SelectedUpperCase(){
            return this.selected.toUpperCase();
        }
    }
});

// export const useAuthStore = 
// defineStore ({
//     id : 'userAuth',
//     state : () => ({
//         auth : getAuth()
//     })
// });
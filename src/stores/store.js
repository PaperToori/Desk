import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { database } from "/src/firebase.js";

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
        },
        UpdateSelected(newSelected){
            this.selected = newSelected;
        }
    }
});

export const useAuthStore = 
defineStore ({
    id : 'userAuth',
    state : () => ({
        auth : null
    }), actions : {
        Inject (){
            this.auth = getAuth()
        }
    }
});
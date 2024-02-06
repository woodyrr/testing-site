<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import db from'../firebase.js'
import { collection, addDoc, getDocs, orderBy, onSnapshot, doc, deleteDoc, query} from "firebase/firestore"; 
import create from '../components/createMeals.vue';
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged} from "firebase/auth";
// import currentUser from '../components/user.vue'
const showModal = ref(false)

</script>

<script>
let usersName = []
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // console.log(user)
    let names  = user.displayName
    usersName.value = names
    return usersName
    // console.log()
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default {
    name:'app',
    components:{},
    methods: {
        createRecipe: function() {
            addDoc(collection(db, 'recipees'), {
            recipe_id: Math.floor(Math.random() * 1000000),
            name:this.$refs.recipeName.value,
            date_created:new Date(Date.now()).toLocaleString(),
            Ingredients:this.$refs.recipeIngredients.value,
            instructions:this.$refs.recipeInstructions.value,
            username:usersName.value,
            // bg:this.getRandomColor()
            });
        },
        // Date.now()
        bro: function(){
            this.$refs.recipeName.value = ''
            this.$refs.recipeIngredients.value = ''
            this.$refs.recipeInstructions.value = ''
            alert("recipe created")
        },
        getRandomColor: function (){
            return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        }
    },

    data:()=>{
        return {
            recipes:ref([])
        }
    },

    mounted() {
    const recipeColection = query(collection(db, 'recipees'));
    const liveMessages = onSnapshot(recipeColection, (snapshot) => {
        this.recipes = snapshot.docs.map((doc) => {
            return {
                id:doc.id,
                ingredients:doc.data().ingredients,
                instructions:doc.data().instructions,
                name:doc.data().name,
                created:doc.data().date_created,
                user:doc.data().username,
                // bg:doc.data().bg
            
            }
        })
    })
    
    onMounted(liveMessages)
    }
// check if photo url is possible
}
</script>

<template>
    <!-- <section class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-[16px] text-[#E5E7EB] font-medium px-[2%] lg:px-[6%]"> -->
            <!-- <div  v-for="item in recipes" class="relative" :key="item.id">
                <router-link :to="/meals/ + item.idMeal"  class=" bg-[#394150] p-3 w-full rounded-xl flex flex-col">
                    <img src="" alt="meal-thumbnail" srcset="" class="  rounded-xl pb-2 w-full h-[200px] md:w-[800px]" id="your-img">
                    <div>{{ item.recipe_name }}</div>
                </router-link>
            </div> -->
            <div  v-for="item in recipes" class="relative hidden lg:block" :key="item.id">
                <router-link :to="/dashmeals/ + item.id"  class=" bg-[#394150] p-3 w-full rounded-xl flex flex-col">
                    
                    <!-- <img v-if="item.img" :src="item.img" alt="meal-thumbnail" srcset="" class="  rounded-xl pb-2 w-full h-[200px] md:w-[800px]" id="your-img">
                    <i v-else class="fa-solid fa-bowl-food text-[100px] sm:[120px] md:text-[15px] lg:text-[10px] flex justify-center items-center "></i> -->
                    <section class="flex justify-between text-white">
                        <div class="flex flex-col">
                            <div class="font-bold text-xl text-yellow-400 ">
                                {{ item.name }}
                            </div>
                            <div class="text-sm font-semibold">
                                {{ item.created }}
                            </div>
                        </div>
                        <div class="px-3 bg-purple-500 flex items-center rounded-full font-bold" >
                            {{ item.user }}
                        </div>
                    </section>
                    <!-- :style="{backgroundColor: item.bg}" -->
                </router-link>
            </div>
    <!-- </section> -->
</template>
<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import db from'../firebase.js'
import { collection, addDoc, getDocs, orderBy, onSnapshot, doc, deleteDoc, query} from "firebase/firestore"; 
import create from '../components/createMeals.vue';
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// const mesure = ref([]);
// const num = ref(0);

// const showModal = ref(false)

// const addingRecipes = ref({})

// const recipeName = ref('')
// const recipeInstructions = ref('')
// const recipeIngredients = ref('');

// const addRecipe = () => {
//     addingRecipes.value = {
//         user_id: Math.floor(Math.random() * 1000000),
//         recipe_name: recipeName.value,
//         date: new Date(),
//         Ingredients:recipeIngredients.value,
//         instructions:recipeInstructions.value
//     //   bg: getRandomColor(),
//     }
//     // showModal.value = false;
//     // recipeName.value = ''
//     // recipeIngredients.value = ''
//     // recipeInstructions.value = ''
//     console.log(addingRecipes)
// }

// const recipes = ref([])

// const createRecipe = () => {
//     return addDoc(collection(db, 'recipes'), {
//         user_id: Math.floor(Math.random() * 1000000),
//         name:recipeName.value,
//         date_created:Date.now(),
//         Ingredients:recipeIngredients.value,
//         instructions:recipeInstructions.value
//     })
    
// }






    // mounted() {
    // let recipeColection = query(collection(db, 'personal recipes'), orderBy('date'));
    // const liveMessages = onSnapshot(recipeColection, (snapshot) => {
    //     recipes.value = snapshot.docs.map((doc) => {
    //         return {
    //             id:doc.id,
    //             ingredients:doc.data().ingredients,
    //             name:doc.data().name,
    //             created:doc.data().date_created
            
    //         }
    //     })
    // })
    // onMounted(liveMessages)
    // }



const showModal = ref(false)

// onMounted(async() => {
//     let recipeColection = await getDocs(collection(db, 'recipes'))
//     recipeColection.forEach((recipe) => {
//         recipes.value.push({...recipe.data(), id: recipe.id})
//         console.log(recipe.data(), recipe.id)
//     });
// })


</script>

<script>


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
            instructions:this.$refs.recipeInstructions.value
            });
        },
        // Date.now()
        bro: function(){
            this.$refs.recipeName.value = ''
            this.$refs.recipeIngredients.value = ''
            this.$refs.recipeInstructions.value = ''
            alert("recipe created")
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
                created:doc.data().date_created
            
            }
        })
    })
    onMounted(liveMessages)
    }

}
</script>
<template>
    <section class="flex flex-col gap-10 ">
        <header class="px-[5%] flex justify-between text-[12px] lg:text-[18px]  text-[#394150] w-full py-10">
            <router-link to = "/home" class="flex gap-1 bg-white rounded-2xl items-center p-2 md:p-3">
                <img src="../assets/Expand_left.svg" alt="" srcset="">
                <div>Back to categories</div>
            </router-link>
            <button class="flex gap-2 bg-yellow-400 rounded-2xl items-center p-3 md:p-4 md:px-6" @click="showModal = true">
                <i class="fa-regular fa-square-plus "></i>
                <div class="font-semibold">New Recipe</div>
            </button>
        </header>
        <div id="dashboard" class="text-[24px] font-bold text-white text-center">
            <h3>Community Recipe Dashboard</h3>
        </div>
        <section class="grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-[16px] text-[#E5E7EB] font-medium px-[2%] lg:px-[6%]">
            <!-- <div  v-for="item in recipes" class="relative" :key="item.id">
                <router-link :to="/meals/ + item.idMeal"  class=" bg-[#394150] p-3 w-full rounded-xl flex flex-col">
                    <img src="" alt="meal-thumbnail" srcset="" class="  rounded-xl pb-2 w-full h-[200px] md:w-[800px]" id="your-img">
                    <div>{{ item.recipe_name }}</div>
                </router-link>
            </div> -->
            <div  v-for="item in recipes" class="relative" :key="item.id">
                <router-link :to="/meals/ + item.idMeal"  class=" bg-[#394150] p-3 w-full rounded-xl flex flex-col">
                    
                    <img v-if="item.img" :src="item.img" alt="meal-thumbnail" srcset="" class="  rounded-xl pb-2 w-full h-[200px] md:w-[800px]" id="your-img">
                    <i v-else class="fa-solid fa-bowl-food text-[100px] sm:[150px] md:text-[170px] lg:text-[200px] flex justify-center items-center text-yellow-200"></i>
                    <div>{{ item.name }}</div>
                    <div>
                        {{ item.created }}
                    </div>
                </router-link>
            </div>
        </section>
        <!-- 52827 -->
        <div v-if="showModal" class="overlay  absolute w-full h-full bg-[#394150]  z-10 flex items-center justify-center sm:px-[10%] lg:px-[20%] 2xl:px-[25%]" id="recipes">
            
            <div class="modal w-full bg-[#0E1325] rounded-xl p-[35px] relative flex flex-col gap-4 ">
                <div class="text-gray-100 flex justify-end text-xs">*Recommended that users complete all fields*</div>
                <input ref="recipeName" type="text" name="Name" placeholder="Enter recipe name" class=" p-3 rounded-lg ">
                <input ref="recipeIngredients"  name="measurement + ingredients" placeholder="Measurements / Ingredients. Example: 1600g Flour, 1/2 tsp Salt ect.." class="p-2 rounded-md border border-[#394150]"> 
                <textarea ref="recipeInstructions" name="note" id="note" cols="30" rows="2" class="rounded-lg p-3" placeholder="enter instructions"></textarea>
                <!-- <div class="flex flex-col gap-2">
                    <div class="text-white">Upload image</div>
                    <input class="text-white cursor-pointer" type="file" accept="image/jpeg" @change=uploadImage>
                </div> -->
                
                <button class="p-[10px 20px] text-[20px] w-full bg-green-100  border-none text-black cursor-pointer p-2 font-semibold" @click="createRecipe(),showModal = false, bro()">Create Recipe</button>
                <button class=" text-white font-semibold text-[18px]" @click="showModal = false">Cancel</button>
            </div>
        </div>
        <!-- v-model="recipeIngredients" -->
        <!-- , showModal = false, bro() -->
        <!-- , createRecipe() -->
        
        
        
        <!-- <div class="max-w-[1000px] p-[10px] mt-0 mx-auto">
            <div class="mt-6 flex flex-wrap" >
                <div v-for="note in notes"
                    :key="note.id" class="w-[225px] h-[225px] p-[10px] rounded-2xl bg-gray-200 flex flex-col justify-between mr-[20px] mb-[20px] text-black" :style="{backgroundColor: note.bg}">
                    <p class="main-text">{{ note.text }}</p>
                    <p class="date text-sm font-bold">{{ note.date.toLocaleDateString("en-US") }}</p>
                </div>
            </div>
        </div> -->

        <!-- <section class="grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-[16px] text-[#E5E7EB] font-medium px-[2%] lg:px-[6%]">
            <div  v-for="item in recipes" class="relative" :key="item.id">
                <router-link :to="/meals/ + item.idMeal"  class=" bg-[#394150] p-3 w-full rounded-xl flex flex-col">
                    <img src="" alt="meal-thumbnail" srcset="" class="  rounded-xl pb-2 w-full h-[200px] sm:w-[800px]" id="your-img">
                    <div>{{ item.recipe_name }}</div>
                </router-link>
            </div>
            
        </section> -->


    </section>
    
</template>
<!-- ../firebaseInit -->
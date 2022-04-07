<template>
 <div class="backdrop" @click.self>
     <div class="modal-signup center">
         <div class="signup">
             <h2>sign up</h2>
             <i class="modal-close-btn fas fa-times" @click="closeModal"></i>
         </div>
         <form @submit.prevent="handleSubmit" class="signup-form">
             <InputField 
                v-model="email"
                type="email" 
                label="email" />
             <InputField 
                v-model="password"
                type="password" 
                label="password" />
             <div class="error-display">
                 {{ error }}
             </div>
             <div class="terms-condition">
                 <!-- <input type="checkbox" v-model="terms"> -->
                 <InputField 
                    v-model="terms"
                    type="checkbox"/>
                 <span>I accept the <a href="/terms" class="terms-link"> terms and condition</a> </span> 
                 <a href=""></a>
             </div>
             <!-- <button class="submit-btn">sign up</button> -->
             <Button class="submit-btn">sign up</Button>
             <p>Already registered? <span class="sign-in-link" @click="switchModal">Sign In</span></p>
         </form>
     </div>
 </div>
</template>
<script>

import axios from 'axios'
import InputField from '../InputField.vue'
import Button from '../Button.vue';

export default {
    props: ["switchModal"],
    components: {
        InputField,
        Button
    },
    data() {
        return {
            email: "",
            password: "",
            terms: false,
            error: ""
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        openSignIn() {
            this.$emit("openSignIn");
        },
        handleSubmit() {
            const newUser = {
                email: this.email,
                password: this.password,
            };
            if (this.errorChecking()) {
                axios.post("http://localhost:5000/signup", newUser)
                    .then(res => {
                    console.log(newUser);
                    console.log("registered successfully");
                    console.log(res);
                    this.switchModal();
                }
                // , err => {
                //     console.log(err.response)
                // }
                )
                    .catch(err => {
                    console.log(err);
                    this.error = "Email is already in use";
                });
            }
        },
        errorChecking() {
            if (this.email == null || !this.validateEmail(this.email)) {
                this.error = "Please enter a valid email address";
            }
            else if (this.password.length < 6) {
                this.error = "The password must be 6 characters long or more";
            }
            else if (this.terms == false) {
                this.error = "Please read and accept the terms and conditions";
            }
            else {
                return true;
            }
        },
        validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
    },
}

</script>


<style>
.backdrop {
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    color: #798897;
    z-index: 10;
}
.modal-signup {
    max-width: 410px;
    padding: 30px;
    width: 90%;
    background-color: #FFF6F4;
    border-radius: 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}
.modal-signup .terms-condition{
    display: flex;
    align-items: center;
    justify-content:center ;
    flex-wrap: wrap;
    margin-top: 1em;
}
.modal-signup .terms-condition input {
    margin: 0;
    width: 10%;
}
.signup {
    margin-bottom: 1.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.signup-form input {
    border-radius: 5px;
}
.signup h2 {
    text-transform: capitalize;
    font-size: 1.8em;
}
.signup .modal-close-btn {
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 1.3em;
}
.signup-form .error-display {
    text-align: center;
    color: #940d0d;
    font-size: .9em;
}
.modal-signup .submit-btn {
    width: 100%;
    margin: 30px 0;
    padding: 0.4em 0;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #FFF6F4;
    background-color: #DC143C;
}
.sign-in-link, .terms-link {
    cursor: pointer;
    color: #DC143C;
}
.terms-link {
    text-decoration: none;
}
.sign-in-text {

}
</style>
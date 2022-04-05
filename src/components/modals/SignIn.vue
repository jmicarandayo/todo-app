<template>
 <div class="backdrop" @click.self>
     <div class="modal-sign-in center">
         <div class="sign-in">
             <h2>welcome</h2>
             <!-- <button class="modal-close-btn" @click="closeModal">X</button> -->
             <i class="modal-close-btn fas fa-times" @click="closeModal"></i>
         </div>
         <form @submit.prevent="handleLogin" class="sign-in-form">
             <!-- <input type="email" placeholder="Email" v-model="email"> -->
             <!-- <input type="password" placeholder="Password" v-model="password"> -->
             <InputField
             v-model="email"
             type="email"
             label="email"/>
             <InputField
             v-model="password"
             type="password"
             label="password"/>
             <div class="error-display">
                 {{ error }}
             </div>
             <Button class="submit-btn">sign in</Button>
             <div class="links">
                <p class="sign-up-link" @click="openSignUp">sign up</p>
                <p>Forgot your password?</p>
             </div>
         </form>
         
     </div>
 </div>
</template>
<script>

import axios from 'axios'
import InputField from '../InputField.vue'
import Button from '../Button.vue';

export default {
    props: ["closeSignInModal"],
    data() {
        return {
            email: "",
            password: "",
            error: ""
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        openSignUp() {
            this.$emit("openSignUp");
        },
        handleLogin() {
            const user = {
                email: this.email,
                password: this.password
            };
            console.log(user);
            if (this.errorChecking()) {
                this.error = "";
                axios.post("http://localhost:5000/login", user)
                    .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem("token", res.data.token);
                        this.closeSignInModal();
                        this.$router.push("/dashboard");
                    }
                }, err => {
                    console.log(err.response);
                    this.error = err.response.data.error;
                });
                // .catch(err => {
                //     console.log(err)
                // })
            }
        },
        errorChecking() {
            if (this.email == null || !this.validateEmail(this.email)) {
                this.error = "Please enter a valid email address";
            }
            else if (this.password.length < 6) {
                this.error = "The password must be 6 characters long or more";
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
    components: { InputField, Button }
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
.modal-sign-in {
    max-width: 410px;
    padding: 30px;
    width: 90%;
    background-color: #FFF6F4;
    border-radius: 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    
}
.modal-sign-in .terms-condition{
display: flex;
}
.sign-in {
    margin-bottom: 1.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sign-in-form .error-display {
    text-align: center;
    color: #e04848;
    margin: .5em;
}
.sign-in h2 {
    text-transform: capitalize;
    font-size: 1.8em;
}
.sign-in-form input {
    padding: .5em 0 0.5em 0.8em;
    margin: .5em 0;
    font-size: 1em;
    width: 100%;
    border-radius: 5px;
}
.sign-in-form .sign-up-link {
    text-transform: capitalize;
    color: #DC143C;;
    cursor: pointer;
}
.modal-sign-in .submit-btn {
    width: 100%;
    margin: 30px 0;
    padding: 0.4em 0;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #FFF6F4;
    background-color: #DC143C;
}
.modal-sign-in .links {
    display: flex;
    justify-content: space-between;
}
.modal-close-btn {
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 1.3em;
}
</style>
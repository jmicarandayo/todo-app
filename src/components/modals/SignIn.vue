<template>
 <div class="backdrop" @click.self>
     <div class="modal-sign-in">
         <div class="sign-in">
             <h2>welcome</h2>
             <button class="modal-close-btn" @click="closeModal">X</button>
         </div>
         <form @submit.prevent="handleLogin" class="sign-in-form">
             <input type="email" placeholder="Email" v-model="email">
             <input type="password" placeholder="Password" v-model="password">
             <div class="error-display">
                 {{ error }}
             </div>
             <button class="submit-btn">sign in</button>
             <div class="links">
                <p class="sign-up" @click="openSignUp">sing up</p>
                <p>Forgot you password?</p>
             </div>
         </form>
         
     </div>
 </div>
</template>
<script>

import axios from 'axios'

export default {
    props: [ 'closeSignInModal' ],
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        openSignUp() {
            this.$emit('openSignUp')
        },
        handleLogin() {
            const user = {
                email: this.email,
                password: this.password
            }
            console.log(user)
            if(this.errorChecking()) {
                this.error = ''
                axios.post('http://localhost:5000/login', user)
                    .then(res => {
                        if(res.status === 200) {
                            localStorage.setItem('token', res.data.token)
                            this.closeSignInModal()
                            !this.$router.push('/dashboard')
                        }
                    }
                    , err => {
                        console.log(err.response)
                        this.error = err.response.data.error
                    }
                    )
                    // .catch(err => {
                    //     console.log(err)
                    // })
            }
        },
        errorChecking() {
            if( this.email == null || !this.validateEmail(this.email)) {
                this.error = 'Please enter a valid email address'
            } else if (this.password.length < 6) {
                this.error = 'The password must be 6 characters long or more'
            } else {
                return true;
            }
        },
        validateEmail(email) {
                        var re = /\S+@\S+\.\S+/;
                        return re.test(email);
        }
    }
}

</script>


<style>
.backdrop {
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    color: #000;
}
.modal-sign-in {
    max-width: 600px;
    margin: 150px auto;
    background-color: #fff;
    border-radius: 20px;
    
}
.modal-sign-in .terms-condition{
display: flex;
}
.sign-in {
    padding: 2em;
    display: flex;
    justify-content: space-between;
}
.sign-in-form .error-display {
    text-align: center;
    color: #e04848;
    margin: .5em;
}
.sign-in h2 {
    text-transform: capitalize;
}
.sign-in-form {
    margin: 2em 3em;
}
.sign-in-form input {
    padding: .5em;
    margin: .8em 0;
    font-size: 1em;
    width: 100%;
    border-radius: 5px;
}
.sign-in-form input:focus {
}
.modal-sign-in .submit-btn {
    text-transform: capitalize;
    border: 0;
    padding: .5em 2em;
    background-color: aqua;
    border-radius: 5px;
    width: 100%;
}
.modal-sign-in .links {
    padding: 1.5em 0;
    display: flex;
    justify-content: space-between;
}
.modal-close-btn {
    background: transparent;
    border: 0;
    position: relative;
    right: .5em;
    cursor: pointer;
    padding: .5em;
}
</style>
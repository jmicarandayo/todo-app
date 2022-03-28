<template>
 <div class="backdrop" @click.self>
     <div class="modal-signup">
         <div class="signup">
             <h2>sign up</h2>
             <button class="modal-close-btn" @click="closeModal">X</button>
         </div>
         <form @submit.prevent="handleSubmit" class="signup-form">
             <input type="text" placeholder="Email" v-model="user.email">
             <input type="password" placeholder="Password" v-model="user.password">
             <div class="error-display">
                 {{ error }}
             </div>
             <div class="terms-condition">
                 <input type="checkbox" v-model="user.terms">
                 <span>I accept the </span><a href="/terms">terms and condition</a>
                 <a href=""></a>
             </div>
             <button class="submit-btn">sign up</button>
         </form>
         <p>Already registered? <span @click="openSignIn">Sign In</span></p>
     </div>
 </div>
</template>
<script>

export default {
    data () {
        return {
            user: {
                email: '',
                password:'',
                terms: false,
            },
            error: ''
        }
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        openSignIn() {
            this.$emit('openSignIn')
        },
        handleSubmit() {
            console.log(this.user)
            this.errorChecking()
            console.log(this.error)
        },
        errorChecking() {
            if( this.user.email == null || !this.validateEmail(this.user.email)) {
                this.error = 'Please enter a valid email address'
            } else if (this.user.password.length < 6) {
                this.error = 'The password must be 6 characters long or more'
            } else if (this.user.terms == false) {
                this.error = 'Please read and accept the terms and conditions'
            } else {
                this.error = null;
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
.modal-signup {
    max-width: 600px;
    margin: 150px auto;
    background-color: #fff;
    border-radius: 20px;
    
}
.modal-signup .terms-condition{
display: flex;
align-items: center;
justify-content:center ;
flex-wrap: wrap;
margin: .5em 0;
}
.modal-signup .terms-condition input {
    margin: 0;
    width: 10%;
}
.signup {
    padding: 2em;
    display: flex;
    justify-content: space-between;
}
.signup h2 {
    text-transform: capitalize;
}
.signup-form {
    margin: 2em 3em;
}
.signup-form .error-display {
    text-align: center;
    color: #e04848;
    
}
.signup-form input {
    padding: .5em;
    margin: .8em 0;
    font-size: 1em;
    width: 100%;
    border-radius: 5px;
}
.signup-form input:focus {
}
.modal-signup .submit-btn {
    text-transform: capitalize;
    border: 0;
    padding: .5em 2em;
    background-color: aqua;
    border-radius: 5px;
    width: 100%;
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
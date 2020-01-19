<template>
    <v-dialog 
        width="400" 
        @keydown="checkForEnter($event)"
        v-model="inputVal"
        >
        <v-card>
            <v-card-title>Login</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-text-field 
                        label="Email" 
                        :rules="emailRules" 
                        v-model="email"
                        ></v-text-field>
                    <v-text-field 
                        label="Password" 
                        type="password" 
                        v-model="password"
                        ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                        text 
                        @click="$emit('cancel')"
                        >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                        text 
                        color="primary" 
                        @click="$emit('signUp')"
                        >SIGN UP</v-btn>
                <v-btn 
                        text 
                        :disabled="!valid"
                        color="primary" 
                        @click="done()"
                        >LOGIN</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props:['value'],
    data(){
        return {
            valid:false,
            emailRules: [
                (v:string) => !!v || 'E-mail is required',
                (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            passwordRules: [
                (v:string) => (v && v.length >= 8) || 'Password must contain at least 8 charecters'
            ],
            email:'',
            password:'',
            inputVal: this.value
        }
    },
    methods: {
        checkForEnter(e:any) {
            if(e.keyCode != 13)return;
            console.log('is enter');
            if(this.valid)this.done();
        },
        done() {
            this.$emit('done', {
                email:this.email,
                password:this.password
            });
        }
    },
    watch: {
        value(val) {
            this.inputVal = val;
        },
        inputVal(val) {
            this.$emit('input', val);
        }
    }
});
</script>

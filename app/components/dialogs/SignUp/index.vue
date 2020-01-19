<template>
    <v-dialog 
        @keydown="checkForEnter($event)"
        width="500" 
        v-model="inputVal">
        <v-card>
            <v-card-title>Sign Up</v-card-title>
            <v-card-text>
                <v-form v-model="valid">
                    <v-layout>
                        <v-flex xs5>
                            <v-text-field 
                                label="First Name" 
                                v-model="firstName"
                                ></v-text-field>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs6>
                            <v-text-field 
                                label="Last Name" 
                                v-model="lastName"
                                ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-text-field label="Username" v-model="username"></v-text-field>
                    <v-text-field 
                        :rules="emailRules" 
                        label="Email" 
                        v-model="email"
                    ></v-text-field>
                    <v-text-field 
                        :rules="passwordRules" 
                        label="Password" 
                        type="password" 
                        v-model="password"
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    @click="$emit('cancel')" 
                    text
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn 
                    :disabled="!valid"
                    color="primary" 
                    text 
                    @click="done()"
                    >Sign Up</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script lang="ts">

import Vue from "vue";
export default Vue.extend({
    props: [
        'value'
    ],
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            emailRules: [
                (v:string) => !!v || 'E-mail is required',
                (v:string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                (v:string) => (v && v.length >= 8) || 'Password must contain at least 8 charecters'
            ],
            valid:false,

            inputVal:this.value
        }

    },
    methods: {
        done() {
            this.$emit('done', {
                firstName:this.firstName,
                lastName: this.lastName,
                username: this.username,
                password: this.password,
                email: this.email,
            });
        },
        checkForEnter(e:any) {
            if(e.keyCode != 13)return;
            if(this.valid)this.done();
        },
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

<template>
    <div>
        <v-row justify="center" class="mb-4">
                    <v-col cols="12" sm="12" md="6">
                        <v-card
                            max-width=556
                            class="pa-6"
                        >
                        <v-form>
                            <v-row justify="center">
                                <v-col cols="12" sm="12" md="12">
                                    <label for="card-number" class="card-info-title">カード番号</label>
                                    <!-- <div id="card-element"></div> -->
                                    <div class="card-info" id="card-number"></div>
                                    <v-divider></v-divider>
                                    <div id="card-error" class="error-message" v-if="cardNumberError">{{ cardNumberError }}</div>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" sm="12" md="12">
                                    <label for="card-expiry" class="card-info-title">有効期限</label>
                                    <div class="card-info" id="card-expiry"></div>
                                    <v-divider></v-divider>
                                    <div id="card-error" class="error-message" v-if="cardExpiryError">{{ cardExpiryError }}</div>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" sm="12" md="12">
                                    <label for="card-cvc" class="card-info-title">3桁のセキュリティコード</label>
                                    <div class="card-info" id="card-cvc"></div>
                                    <v-divider></v-divider>
                                    <div id="card-error" class="error-message" v-if="cardCvcError">{{ cardCvcError }}</div>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="12" sm="12" md="12">
                                    <v-btn
                                        color="primary"
                                        block
                                        dark
                                        @click="processPayment"
                                    >
                                        支払いをする
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        </v-card>
                    </v-col>
                </v-row>
        
    </div>
  
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
    data: function(){
        return {
            stripe: {},
           // cardElement: {},
            //publicKey: process.env.MIX_STRIPE_KEY,
            cardNumberElement: null,
            cardExpiryElement: null,
            cardCvcElement: null,
            cardNumberError: null,
            cardExpiryError: null,
            cardCvcError: null,
            expired_card: null,
            message: "",
        }
    },
    async mounted(){
        //this.stripe = await loadStripe(`${process.env.MIX_STRIPE_KEY}`);
        this.stripe = await loadStripe("pk_live_51J0LDyHqbknAxatFzrgue8qXopbEBy5AYGYJ26oSnK0Wqm4FPP8TrdlpQbPDKljHqmxQrm5xhIi5xkWYOLJsIoHB0040SBgx86");
        // this.stripe = await loadStripe("pk_test_51J0LDyHqbknAxatFaAwlCUX9kBQ0Pm1y8vxHS7HfavGtjQoUzUcqdlCYHa94F5JZXhZKIiOVfXknzPHey45W9DR600Zv4O4onO");
        // const stripe = Stripe("pk_test_51J0LDyHqbknAxatFaAwlCUX9kBQ0Pm1y8vxHS7HfavGtjQoUzUcqdlCYHa94F5JZXhZKIiOVfXknzPHey45W9DR600Zv4O4onO");
        
        const elements = this.stripe.elements();
       
        let elementStyles = {
            base: {
                color: "#32325D",
                fontWeight: 500,
                fontFamily: "Inter, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",

                "::placeholder": {
                // color: "#CFD7DF"
                color: "#A5A5A5",
                }
            },
            invalid: {
                color: "#FE6862"
            }
        };

        let elementClasses = {
            focus: 'focus',
            empty: 'empty',
            invalid: 'invalid',
        };

        this.cardNumberElement = elements.create('cardNumber', {
            // classes: {
            //       base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'   
            // }       
            style: elementStyles,
            classes: elementClasses,
        });
        
        this.cardExpiryElement = elements.create('cardExpiry', {
            style: elementStyles,
            classes: elementClasses,
            // classes: {
            //       base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'   
            // } 
        });

        this.cardCvcElement = elements.create('cardCvc', {
            style: elementStyles,
            classes: elementClasses,
            // classes: {
            //       base: 'bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 p-3 leading-8 transition-colors duration-200 ease-in-out'   
            // } 
        });

        this.cardNumberElement.mount('#card-number');
        this.cardExpiryElement.mount('#card-expiry');
        this.cardCvcElement.mount('#card-cvc');

        this.listenForErrorsCardExpiry();
        this.listenForErrorsCardNumber();
        this.listenForErrorsCardCvc();
        // registerElements([this.cardNumber, this.cardExpiry, this.cardCvc], 'card');
    },
    created(){
     
    },
    computed: {
    
    },
    methods: {
         listenForErrorsCardNumber(){
            const vm = this;

            this.cardNumberElement.addEventListener('change', (event)=>{
                vm.cardNumberError = event.error ? event.error.message: null;
            })
        },
        listenForErrorsCardExpiry(){
            const vm = this;

            this.cardExpiryElement.addEventListener('change', (event)=>{
                vm.cardExpiryError = event.error ? event.error.message: null;
            })
        },
        listenForErrorsCardCvc(){
            const vm = this;

            this.cardCvcElement.addEventListener('change', (event)=>{
                vm.cardCvcError = event.error ? event.error.message: null;
            })
        },
        processPayment(){
            
        }
      

        
    }


}
</script>

<style>


</style>
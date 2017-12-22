
// Variable diclarations : selecting the input and select elements by class or id

const name = $('#name');
const mail = $('#mail');
const design = $('#design');
const color = $('#color');
const cardDetails = $('credit-card');
const card = $('#cc-num');
const cvv = $('#cvv');
const zip = $('#zip');
const activities = $('.activities');
const payment = $('#payment');
const submitButton = $('button');

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

//***************** Functions ***********************//

// Function to add css style to error messages and elements
function assignErrorStyle(target){
  target.css('border','red 1px solid');
  target.next('p').css('color','red');
  }

// function adds coorect input style

function correctInputStyle(target){
  target.css('border','green 1.5px solid');
  }

// Email validation function

function emailValidation(){

    if(mail.val().length === 0){
      mail.after(`<p>Email address is required</p>`);
      assignErrorStyle(mail);
      error = true ;
    }else if (!emailRegExp.test(mail.val())){
      mail.after(`<p>Please enter a valid email address</p>`);
      assignErrorStyle(mail);
      error = true ;
    }else{
      correctInputStyle(mail);
    }
}

//***************** Email Validation on Keyup ***********************//


mail.keyup(()=>{

  $('#mail + p').remove();
  emailValidation();

});

//********************* 1ST TASK : FOCUS ON NAME INPUT  AND VALIDATION FUNCTION ************************************//

name.focus();

name.keyup(()=>{
  if(/^[a-zA-Z ]{3,36}$/.test(name.val())){
    $('#name + p').remove();
  }
});

//******************** 2ND TASK : SHOW - HIDE TEXTAREA FOR OTHER **************************//

$('#other-title').hide();
$('#title').on('change',()=>{

  if($('#title').val() === 'other'){
    $('#other-title').show();
  }else{
    $('#other-title').hide();
  }

});

//******************** 3rd TASK : SHOW - HIDE COLORS AS PER DESIGN SELECTED ***************//

// add a new option at index 0 ;
$('#color option:first').before('<option value="available-color" selected="selected">Please select a T-shirt theme</option>');

// Select the newly created option to show instructions
const instructionOption = $('#color option:first');
$('#color option:nth-child(n+2)').hide();

// for exceed expectation - hiding the color selection
color.hide();

design.on('change',()=>{

  $('#design + p').remove();  // removes error message
  $('#color option:nth-child(n+2)').hide(); // Hides all colors
  color[0].selectedIndex = 0; // shows only ''select a theme'' message
  instructionOption.attr(selected="selected"); // will always remain selected

  if($('#design').val() === 'js puns'){
    color.show();
    instructionOption.text('Please select a color');
    $('#color option:nth-child(-n+4)').show();
  }else if($('#design').val() === 'heart js'){
    color.show();
    instructionOption.text('Please select a color');
    $('#color option:nth-child(n+5)').show();
  }else{
    color.hide();
    //$('#color option:nth-child(n+2)').hide();      // for meet expectation
    //instructionOption.text('Please select a T-shirt theme');        // for meet expectation
  }

});

color.on('change',()=>{

  if(color.val() !== "available-color"){

    $('#color + p').remove();  // removes error message
  }
});

//********************** 4TH TASK : ABLE - DISABLE ACTIVITIES AND CALCULATE TOTAL ******************* //

const x = $('.activities input');
let total = 0;

activities.on('change',()=>{

 total = 0;

  $('.activities + p').remove();

  $('.activities h3').remove();

  if(x[1].checked){
    x[3].disabled =  true ;
  }else if(x[3].checked){
    x[1].disabled = true ;
  }else{
    x[1].disabled = false;
    x[3].disabled = false;
  }


  if(x[2].checked){
    x[4].disabled =  true ;
  }else if (x[4].checked){
    x[2].disabled = true ;
  }else{
    x[2].disabled = false;
    x[4].disabled = false;
  }

  for(let i= 0; i <x.length; i++){

    if(x[i].name === 'all' && x[i].checked){
      total += 200;
    }else if( x[i].checked && x[i].name !== 'all'){
      total += 100;
    }
  };

  activities.append(`<h3>Total : ${total} <h3>`);

});


//**************************** 5TH TASK : PAYMENT METHOD SHOW -HIDE *****************************//

let cardPayment = $('#credit-card');
let paypalPayment = cardPayment.next();
let bitcoinPayment = paypalPayment.next();


paypalPayment.hide();
bitcoinPayment.hide();
cardPayment.hide();

payment.on('change',()=>{

   $('#payment + p').remove();

  if(payment.val() === 'credit card'){
    cardPayment.show();
    paypalPayment.hide();
    bitcoinPayment.hide();
  }else if(payment.val() === 'paypal'){
    cardPayment.hide();
    paypalPayment.show();
    bitcoinPayment.hide();
  }else if(payment.val() === 'bitcoin'){
    cardPayment.hide();
    paypalPayment.hide();
    bitcoinPayment.show();
  }else{
    cardPayment.hide();
    paypalPayment.hide();
    bitcoinPayment.hide();
  }

});


//********************* 6TH  TASK : FORM VALIDATION AND SUBMIT*****************//

$('button[type=submit]').click((event)=>{

  let error = false ;


  //Loop to remove the errors posted - when form was submitted the last time.

  let z = $('input+p ,select+p,button+p,.activities +p');

  for(let i = 0;i < z.length;i++){
    z[i].remove();
  }


  event.preventDefault();


  // -------- NAME INPUT VALIDATION--------------//

  if(!/^[a-zA-Z ]{3,36}$/.test(name.val())){
    name.after(`<p>Please enter a valid name.</p>`);
    assignErrorStyle(name);
    error = true ;
  }else{
    correctInputStyle(name);
  }


  //---------- EMAIL INPUT VALIDATION--------------//

  emailValidation(); // function defined on top


  //-----------DESIGN SELECTED VALIDATION-----------//


  if(design.val() === "Select Theme"){
    design.after(`<p>No Design Selected</p>`)
    assignErrorStyle(design);
    error = true ;
  }

  //-----------COLOR SELECTED VALIDATION--------------//


  if(color.val() === "available-color"){
     color.after(`<p>No color Selected</p>`)
     assignErrorStyle(color);
     error = true ;
    }

  //----------- ACTIVITY SELECTED VALIDATION----------//


  if(total === 0){
    activities.after(`<p>NO ACTIVITY SELECTED</p>`);
    assignErrorStyle(activities);
    $('.activities').css('border','none');
    error = true ;
  }


 //------------- PAYMENT SELECTED VALIDATION-----------//

  if(payment.val() === 'select_method'){
    payment.after(`<p>No Payment Method Selected </p>`);
    assignErrorStyle(payment);
    error = true ;
  }



  //------------- CREDIT CARD NUMBER  / ZIP / CVV  VALIDATION--------//



 if(payment.val() === 'credit card'){

                  //***** Credit Card number ********//

    if(card.val().length === 0){
       card.after(`<p>Please enter a credit card number.</p>`);
       assignErrorStyle(card);
       error = true ;
    }else if(!/^[0-9]{13,16}$/.test(card.val())){
       card.after(`<p>Please enter a number that is<br> between 13 and 16 digits long</p>`);
       assignErrorStyle(card);
       error = true ;
    }else{
       correctInputStyle(card);

    }

                  //******** Zip code validation ********//


    if(!/^[0-9]{5}$/.test(zip.val())){
       zip.after(`<p>Enter 5 digit Zip</p>`);
       assignErrorStyle(zip);
       error = true ;
    }else{
        correctInputStyle(zip);
      }

                  //********** cvv validation ********//

    if (!/^[0-9]{3}$/.test(cvv.val())){
      cvv.after(`<p>Invalid # cvv</p>`);
      assignErrorStyle(cvv);
      error = true;
    }else{
        correctInputStyle(cvv)
    }
  }


  //----------------CHECKS IF ERROR IS TRUE || FALSE BEFORE SUBMITTING----------------//

  if(!error) {
    $('form').submit();

  }else{
    $('button').after(`<p>Please check the errors and correct them ,before submitting again</p>`)
    assignErrorStyle(submitButton);

  }


});




document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const form = document.querySelector("form")
    const signupMsg = document.querySelector("#signupMsg")
    const name = document.querySelector("#fname")
    const surname = document.querySelector("#sname")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const confirmPassword = document.querySelector("#confirmPassword")
    
    // regex for inputs
    const nameValidation = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/ 
    const emailValidation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    form.setAttribute("novalidate", true)
    console.log(form)
    form.onsubmit = (e) => {
      let validate = true
      let msg = ""
      if (!nameValidation.test(name.value))
      {
        validate = false
        signupMsg.innerHTML = "First name is not valid. Please try again."
        name.focus()
        return
      } 
      if (!nameValidation.test(surname.value))
      {
        validate = false
        signupMsg.innerHTML = "Last name is not valid. Please try again."
        surname.focus()
        return
      }
      if (!emailValidation.test(email.value.toLowerCase())) 
      {
        validate = false
        signupMsg.innerHTML = "Please enter a valid email address."
        email.focus()
        return
      }
      if (!passwordValidation.test(password.value)) 
      {
        validate = false
        signupMsg.innerHTML = "Please enter a valid password."
        password.focus()
        return
      }
      if(password.value != confirmPassword.value)
      {
        validate = false
        signupMsg.innerHTML = "Passwords do not match. Please try again"
        confirmPassword.focus()
        return
      }
  

      if (validate) {
        signupMsg.innerHTML = "Yeah"
        return true
      }
    }
  })
  
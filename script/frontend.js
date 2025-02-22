const signUpSug = document.getElementById("signUp-sug");
const signBtn = document.getElementById("signBtn");
const logIn = document.querySelector("#login");
const signForm = document.querySelector("#signIn-form");
const usernameInput = document.querySelector("#username-Input");
const passwordField = document.querySelector("#passwordField");
const password = document.querySelector("#password");
const signInHeading = document.querySelector("#signIn-heading");
const fades = document.querySelectorAll(".fade");
const input = document.querySelector("input");
input.autocomplete = "off";
input.required = true;
document.getElementById("username").addEventListener("input", function () {
  setTimeout(() => {
    this.value =
      this.value.charAt(0).toUpperCase() + this.value.slice(1).toLowerCase();
  }, 500);
});

// setTimeout(() => {
//   signBtn.click();
// }, 10);

signBtn.addEventListener("click", () => {
  if (window.innerWidth >= 768) {
    signUpSug.classList.toggle("translate-x-[55vw]");
    signForm.classList.toggle("translate-x-[-108%]");
  } else {
    signUpSug.classList.toggle("not-md:translate-y-[70vh]");
    signForm.classList.toggle("not-md:translate-y-full");
  }
  signInHeading.textContent = "Sign Up";
  signForm.classList.replace("md:py-40", "md:py-20");
  fades.forEach((fade) => {
    fade.classList.add("animate-fade-in");
    setTimeout(() => {
      fade.classList.remove("animate-fade-in");
    }, 600);
  });
  signInSug();
  if (document.querySelector("#email")) {
    antiFadeEmail();
  } else {
    logIn.textContent = "Sign Up";
    fadeEmail();
    fadePassword();
    tglCnfrmPswrd();
  }
});

function antiFadeEmail() {
  document.querySelector("#email").parentElement.remove();
  document.querySelector("#confirm-password").parentElement.remove();
  signForm.classList.replace("md:py-20", "md:py-40");
  logIn.textContent = "Log In";
}

function fadeEmail() {
  let email = document.createElement("div");
  email.classList.add(
    "max-w-full",
    "w-[380px]",
    "h-15",
    "grid",
    "grid-cols-6",
    "grid-rows-1",
    "rounded-full",
    "overflow-hidden",
    "bg-[rgba(240,240,240,0.1)]",
    "animate-fade-in"
  );
  email.innerHTML = `<div class="flex flex-col items-center justify-center">
            <i class="fas fa-envelope text-[17px] md:text-xl text-[#1a8754]"></i>
            </div>
            <input
            type="email"
            class="col-start-2 col-end-6 font-bold outline-0"
            name="email"
            placeholder="Email"
            id="email"
            autocomplete="off"
            required
            />`;
  usernameInput.after(email);
}

function fadePassword() {
  const cnfrmPassword = document.createElement("div");
  cnfrmPassword.classList.add(
    "pswrd",
    "max-w-full",
    "w-[380px]",
    "h-15",
    "grid",
    "grid-cols-6",
    "grid-rows-1",
    "rounded-full",
    "overflow-hidden",
    "bg-[rgba(240,240,240,0.1)]",
    "animate-fade-in"
  );
  cnfrmPassword.innerHTML = `<div class="flex flex-col items-center justify-center">
            <i class="fas fa-lock text-[17px] md:text-xl text-[#1a8754]"></i>
          </div>
          <input
            type="password"
            class="col-start-2 col-end-6 font-bold outline-0"
            name="confirm-password"
            placeholder="Confirm Password"
            id="confirm-password"
            autocomplete="off"
            required
          />
          <div class="flex flex-col items-center justify-center">
            <i
            id="toggle-confirm-password"
              class="fas fa-eye text-[17px] md:text-xl text-[#1a8754] hover:text-[#157347] active:text-[#305544] cursor-pointer"
            ></i>
          </div>
        </div>`;
  passwordField.after(cnfrmPassword);
}

function signInSug() {
  const h1 = signUpSug.querySelector("h1");
  const p = signUpSug.querySelector("p");
  const btn = signUpSug.querySelector("button");
  if (h1.textContent === "New here?") {
    h1.textContent = "One of us?";
    p.textContent = "Stay connected with us!";
    btn.textContent = "Sign In";
  } else {
    h1.textContent = "New here?";
    p.textContent = "Join us and discover a great amount of new opportunities!";
    btn.textContent = "Sign Up";
  }
  h1.classList.add("animate-fade-in");
  p.classList.add("animate-fade-in");
  btn.classList.add("animate-fade-in");
  setTimeout(() => {
    h1.classList.remove("animate-fade-in");
    p.classList.remove("animate-fade-in");
    btn.classList.remove("animate-fade-in");
  }, 600);
}

const togglePassword = document.querySelector("#toggle-password");
togglePassword.addEventListener("click", () => {
  let input = togglePassword.parentElement.parentElement.querySelector("input");
  if (input.type === "password") {
    input.type = "text";
    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
  }
});

function tglCnfrmPswrd() {
  const toggleConfirmPassword = document.querySelector(
    "#toggle-confirm-password"
  );
  toggleConfirmPassword.addEventListener("click", () => {
    let input =
      toggleConfirmPassword.parentElement.parentElement.querySelector("input");
    if (input.type === "password") {
      input.type = "text";
      toggleConfirmPassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      input.type = "password";
      toggleConfirmPassword.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

document.querySelector("form").addEventListener("submit", function (event) {
  if (logIn.textContent.trim() !== "Log In") {
    const CP = document.querySelector("#confirm-password");
    if (password.value !== CP.value) {
      alert("Password didn't matched!");
      event.preventDefault();
    }
  }
});

const form = document.querySelector("#signIn-form");

form.addEventListener("submit", async (event) => {
  input.value.trim();
  if (logIn.textContent.trim() === "Log In") {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const URL = "https://signinup-backend-production.up.railway.app/";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const message = await response.json();
    resToBackend(message);
  } else if (window.location.href !== "https://signinup-backend-production.up.railway.app/register") {
    alert("Now sign in with your username and password.");
  }
});

async function resToBackend(message) {
  if (message === "user not found") {
    console.log(message);
    alert("Your account doesn't exist. Please sign up!");
    signBtn.click();
  } else if (message === "Data file is empty!") {
    console.log(message);
  } else {
    window.location.href = `https://signinup-backend-production.up.railway.app/profiles/${message}`;
  }
}

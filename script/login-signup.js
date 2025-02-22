const submitBtn = document.querySelector("#login");
const signOpt = document.querySelector("#signBtn");

function btnCheck() {
  const form = document.querySelector("form");
  if (submitBtn.textContent.trim() === "Log In") {
    form.action = "http://localhost:3000/";
  } else {
    form.action = "http://localhost:3000/register";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  btnCheck();
  inputClasses();
});
signOpt.addEventListener("click", () => {
  btnCheck();
});

function inputClasses() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.parentElement.classList.add(
      "max-w-full",
      "w-[370px]",
      "md:w-[380px]",
      "h-15",
      "grid",
      "grid-cols-6",
      "grid-rows-1",
      "rounded-full",
      "overflow-hidden",
      "bg-[rgba(240,240,240,0.1)]"
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", "true"); // Mark reload as done
    window.location.reload(); // Reloads the page
  } else {
    // Reset after 100ms so that next visit can reload again
    setTimeout(() => {
      sessionStorage.removeItem("reloaded");
    }, 100);
  }
});

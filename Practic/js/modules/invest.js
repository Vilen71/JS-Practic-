function initInvest() {
   const bodyInvest = document.querySelector(".invest__body")

   const depInput = bodyInvest.querySelector(".dep__input");
   const procentInput = bodyInvest.querySelector(".procent__input");
   const dateInput = bodyInvest.querySelector(".date__input");

   const investBtn = bodyInvest.querySelector(".invest__btn-result");
   const allInputs = document.querySelectorAll(".input")

   const moreBtn = document.querySelector(".invest__more")
   const popup = document.querySelector(".invest__popup");
   const popupBody = document.querySelector(".invest__popup_body")
   const closeBtn = document.getElementById("invest-close");
   let newElem


   let errorText = document.querySelector(".error");

   let resultText = document.getElementById("result");
   let vnosText = document.getElementById("vnos");

   // ========== Buttons ========== //
   investBtn.addEventListener("click", function () {
      popupBody.innerHTML = "";
      noValue()
   })
   document.addEventListener("click", function (e) {
      const target = e.target;
      if (target === closeBtn) {
         popup.classList.remove("active");
         closeBtn.classList.add("close");
         document.body.classList.remove("lock")
      }
      if (target === moreBtn) {
         popup.classList.toggle("active");
         document.body.classList.add("lock")
         closeBtn.classList.remove("close");
      }
   })
   window.addEventListener("keyup", function (e) {
      if (e.code === 'Escape') {
         popup.classList.remove("active")
         popupBody.classList.toggle("active");
      }
   })
   allInputs.forEach(function (item) {
      item.addEventListener("keyup", function (e) {
         if (e.code == "Enter") {
            popupBody.innerHTML = "";
            noValue();
         }
      })
   })
   // ========== functions ========== //
   function noValue() {
      allInputs.forEach(function (item) {
         if (item.value == 0) {
            item.style.border = "3px solid #000";

            errorText.classList.remove("none")
            resultText.innerHTML = "0 р."
            vnosText.innerHTML = "0 р."
            moreBtn.classList.remove("active");
         }
         else {
            item.style.border = "none";
         }
      })

      if (depInput.value != 0 && procentInput.value != 0 && dateInput.value != 0) {
         errorText.classList.add("none")
         moreBtn.classList.add("active");
         invest()
      }
   }
   function invest() {
      let dep = Number(depInput.value);
      let srok = Number(dateInput.value);

      let procent = (1 + procentInput.value / 100).toFixed(2);
      let result = dep * procent;


      for (let i = 1; i < srok + 1; i++) {
         if (result < 3e12) {
            console.log(i, result);
            newElem = document.createElement("p");
            newElem.classList.add("invest__popup-link");
            newElem.innerHTML = `После ${i}-ого месяца: ${result.toLocaleString('ru')} рублей`;
            popupBody.append(newElem)
            vnosText.innerHTML = (srok * dep).toLocaleString('ru') + " руб";
            resultText.innerHTML = result.toLocaleString('ru') + " руб";
            result = Math.round((result + dep) * procent)
         }
      }
   }
}

export default initInvest;
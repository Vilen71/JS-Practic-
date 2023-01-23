function initCalc() {
   const numbers = document.querySelectorAll(".calc-number");
   const operationSigns = document.querySelectorAll(".calc-operation");
   const show = document.getElementById("calc-show-result");
   const resetCalc = document.getElementById("calc-reset");
   let a = 0, b = 0,
      l = 0, saveOperationResult,
      activeOperation, currentOperation = document.querySelector(".calc-operation"), lastOperation;

   numbers.forEach(function (item) {
      item.addEventListener("click", function () {
         l++
         if (!show.classList.contains("active")) {
            showFunc1(item)
         }
         else {
            showFunc2(item)
         }
      })
   })
   operationSigns.forEach(function (item) {
      item.addEventListener("click", function () {
         l = 0;
         if (currentOperation.classList.contains("current")) {
            currentOperation.classList.replace("current", "last") // Смена класса 
            item.classList.add("current")
            currentOperation.classList.remove("hover-active")
         }
         if (lastOperation) {
            lastOperation.classList.remove("last")
            currentOperation.classList.add("last")
         }
         if (currentOperation.classList.contains("current") && currentOperation.classList.contains("last")) {
            // a = +a + +b
            // show.value = a
            console.log(a, b);
         }
         swithFunc(item)
         show.classList.add("active") // Для ввода второй переменной
         item.classList.add("hover-active") // Эффект нажатой кнопки
         if (!item.classList.contains("current")) {
            item.classList.add("current") // Текущий элемент
         }

         lastOperation = document.querySelector(".calc-operation.last")
         currentOperation = document.querySelector(".calc-operation.current");
      })
   })

   function swithFunc(item, val = item.value) {
      if (item.classList.contains("current")) {
         switch (val) {
            case '+':
               a = Number(a) + Number(b);
               b = 0;
               break
            case '-':
               a = Number(a) - Number(b);
               b = 0;
               break
            case '×':
               if (b != 0) {
                  a = Number(a) * Number(b);
                  b = 0;
               }
               break
            case '÷':
               if (b != 0) {
                  a = Number(a) / Number(b);
                  b = 0;
               }
               break
            // default: console.log('Операция не найдена');
         }
         saveOperationResult = +a;
         show.value = Number(a).toLocaleString("ru")
         analitic()
      }
      switch (val) {
         case '=':
            swithFunc(item, currentOperation.value)
            break
         case '+/-':
            if (a > 0) {
               a -= (a * 2)
            }
            else { a = a - (a * 2); }
            show.value = a.toLocaleString("ru")
            break
      }
   }
   function analitic() {
      if (l > 10 || saveOperationResult > 1e10) {
         show.value = (+a).toExponential(0);
      }
      else if (l > 9 || saveOperationResult > 1e9) {
         show.style.fontSize = "58px";
      }
      else if (l > 8 || saveOperationResult > 1e8) {
         show.style.fontSize = "66px";
      }
      else {
         show.style.fontSize = "70px";
      }
   }

   function showFunc1(item) {
      if (l <= 10) {
         a += item.value;
         show.value = Number(a).toLocaleString("ru")
         analitic()
      }
   }
   function showFunc2(item) {
      if (l <= 10) {
         b += item.value;
         show.value = Number(b).toLocaleString("ru")
         analitic()
      }
   }

   resetCalc.addEventListener("click", function () {
      show.style.fontSize = "70px";
      a = 0; b = 0; l = 0;
      show.value = 0; saveOperationResult = null;
      show.classList.remove("active");
      for (let i of operationSigns) {
         i.classList.remove("hover-active")
         i.classList.remove("active")
         i.classList.remove("current")
         i.classList.remove("last")
      }
   })

}

export default initCalc;
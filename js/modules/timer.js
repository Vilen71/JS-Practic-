function InitDataDown(parent, to) {
   const toDate = document.getElementById("desc")
   desc.innerHTML = to;
   // для окончаний
   let decCache = [],
      decCases = [2, 0, 1, 1, 1, 2];
   function decOfNum(number, titles) {
      if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
      return titles[decCache[number]];
   }
   // для окончаний
   let timerOut
   if (parent, to) {
      timerOut = setInterval(dataDown, 1000)
   }
   else { timerOut = null }

   function dataDown() {
      let toCountDate = new Date(to)
      let currentDate = new Date()


      let totalSeconds = Math.floor((toCountDate - currentDate) / 1000); // Разница в секундах
      const days = Math.floor((totalSeconds / 86400));
      const hours = Math.floor((totalSeconds / 3600) % 24);
      const minutes = Math.floor((totalSeconds / 60) % 60);
      const seconds = totalSeconds % 60;

      const rootElements = document.querySelectorAll(parent);

      rootElements.forEach(function (root) {
         if (days > 0 && root.querySelector(".data__days")) {
            root.querySelector(".data__days .data__count").innerHTML = days;
            root.querySelector(".data__days .data__text").innerHTML = decOfNum(days, ['день', 'дня', 'дней']);
         }
         else {
            root.querySelector(".data__days").style.display = "none";
         }

         if (root.querySelector(".data__hours")) {
            root.querySelector(".data__hours .data__count").innerHTML = hours;
            root.querySelector(".data__hours .data__text").innerHTML = decOfNum(hours, ['час', 'часа', 'часов']);
         }


         if (root.querySelector(".data__minutes")) {

            root.querySelector(".data__minutes .data__count").innerHTML = minutes;
            root.querySelector(".data__minutes .data__text").innerHTML = decOfNum(minutes, ['минута', 'минуты', 'минут']);
         }


         if (root.querySelector(".data__seconds")) {
            root.querySelector(".data__seconds .data__count").innerHTML = seconds;
            root.querySelector(".data__seconds .data__text").innerHTML = decOfNum(seconds, ['секунда', 'секунды', 'секунд']);
         }

         if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            clearInterval(timerOut)
            root.innerHTML = "The timer is over"
         }
      })
   }
   dataDown()
}
export default InitDataDown;
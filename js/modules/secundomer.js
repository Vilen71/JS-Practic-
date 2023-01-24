function initSecundomer() {
   let hs = parseInt("00"), hsSave = '00',
      sec = parseInt("00"), secSave = '00',
      min = parseInt("00"), minSave = '00',
      ms = parseInt("01"), msSave = '00',
      timer;

   const hours = document.getElementById("hours"),
      minutes = document.getElementById("minutes"),
      seconds = document.getElementById("seconds"),
      miliseconds = document.getElementById("miliseconds");

   const playBtn = document.getElementById("play"),
      resetBtn = document.getElementById("reset"),
      decorLine = document.querySelector(".secundomer__decor"),
      lineSpan = document.querySelector(".secundomer__decor span");

   const styles = getComputedStyle(lineSpan)

   let lineWidth,
      numberSave = 0;

   const saveBlock = document.querySelector(".secundomer__save_block");
   // ========== Buttons ========== //
   playBtn.addEventListener("click", function () {
      if (!playBtn.classList.contains("stop")) {
         playBtn.classList.add("stop")
         playBtn.innerHTML = "Stop"

         resetBtn.classList.remove("active")
         resetBtn.classList.add("save")
         resetBtn.innerHTML = "Save";
         resetBtn.classList.remove("reset")

         decorLine.classList.add("active")
         decorLine.classList.remove("pause")

         timer = setInterval(secundomer, 10)

         if (numberSave == 11) {
            resetBtn.classList.add("limit");
         }
      }
      else {
         clearTimeout(timer)

         playBtn.classList.remove("stop")
         playBtn.innerHTML = "Play"
         resetBtn.classList.add("reset")
         resetBtn.innerHTML = "Reset";
         resetBtn.classList.remove("save")
         resetBtn.classList.remove("limit")

         decorLine.classList.add("pause")
      }
   })
   resetBtn.addEventListener("click", function () {
      if (!playBtn.classList.contains("stop")) {
         clearTimeout(timer);
         hs = "00", sec = "00", min = "00", ms = "00";
         hsSave = "00", secSave = "00", minSave = "00", msSave = "00";
         hours.innerHTML = hs; minutes.innerHTML = sec; seconds.innerHTML = min; miliseconds.innerHTML = ms;
         timer = null;
         lineWidth = parseInt(styles.width);

         playBtn.innerHTML = "Play"
         playBtn.classList.remove("stop")

         resetBtn.classList.add("active")
         resetBtn.classList.add("save")
         resetBtn.classList.remove("reset")
         resetBtn.innerHTML = "Save"

         decorLine.classList.remove("active")
         decorLine.classList.remove("pause")
         saveBlock.classList.remove("active");

         lineStop()
      }
      else {
         saveBlock.classList.add("active");
         numberSave++;

         saveBlockValues()
      }
   })
   // ========== functions ========== //
   function secundomer() {
      // ========== ms ========== //
      if (ms > 0) {
         if (ms < 10) {
            msSave = '0' + ms;
            miliseconds.innerHTML = msSave;
         }
         if (ms > 9) {
            msSave = ms;
            miliseconds.innerHTML = ms;
         }
         if (ms > 99) {
            msSave = '00';
            ms = 0;
            miliseconds.innerHTML = msSave;
            sec++
         }
      }
      // ========== sec ========== //
      if (sec > 0) {
         if (sec >= 10 && sec < 60) {
            secSave = sec;
            seconds.innerHTML = secSave;
         }
         if (sec < 10) {
            secSave = "0" + sec
            seconds.innerHTML = secSave;
         }
         if (sec > 59) {
            secSave = '00';
            seconds.innerHTML = secSave;
            sec = 0;
            '0' + min++
         }
      }
      // ========== min ========== //
      if (min > 0) {
         if (min >= 10 && min < 60) {
            minSave = min;
            minutes.innerHTML = minSave;
         }
         if (min < 10) {
            minSave = '0' + min;
            minutes.innerHTML = minSave;
         }
         if (min > 59) {
            minSave = '00';
            minutes.innerHTML = minSave;
            min = 0;
            '0' + hs++
         }
      }
      // ========== hs ========== //
      if (hs > 0) {
         if (hs >= 10) {
            hsSave = hs;
            hours.innerHTML = hsSave;
         }
         if (hs < 10 && hs != 0) {
            hsSave = '0' + hs;
            hours.innerHTML = hsSave;
         }
      }
      ms++
   }
   function lineStop() {
      playBtn.classList.add("active")
      if (lineWidth > 40) {
         lineWidth -= 10;
         lineSpan.style.width = lineWidth + 'px';
         setTimeout(lineStop, 1)
      }
      if (lineWidth <= 40 && lineWidth > 0) {
         lineWidth = lineWidth - 0.3;
         lineSpan.style.width = lineWidth + 'px';
         setTimeout(lineStop, 1)
      }
      if (lineWidth <= 0) {
         lineSpan.style.width = '0';
         playBtn.classList.remove("active")
      }

      setTimeout(function () {
         saveBlock.innerHTML = '<span></span>';
         numberSave = 0;
      }, 300)
   }
   function saveBlockValues() {
      const resultSave = document.createElement("p");

      resultSave.classList.add("secundomer__save_block-item")
      if (hs > 0) {
         resultSave.innerHTML = `${numberSave}. <span>${hsSave}:${minSave}:${secSave}</span>`;
      }
      else {
         resultSave.innerHTML = `${numberSave}. <span> ${minSave}:${secSave}:${msSave}</span>`;
      }
      saveBlock.append(resultSave)

      setTimeout(function () {
         saveBlock.children[numberSave].classList.add("active")
      }, 10)

      if (numberSave == 10) {
         resetBtn.classList.add("limit")
      }
   }
}
// console.log(localStorage.setItem('test', 1));

export default initSecundomer;
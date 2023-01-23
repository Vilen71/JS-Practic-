function outNumber(elem, num, time, step) {
   let e = document.querySelector(`.${elem}`)
   let i = 0;
   let t = Math.round(time / (num / step))
   let interval = setInterval(function () {
      i = (i + step) * 1.01;
      e.innerHTML = Math.floor(i);
      if (i >= 980) {
         clearInterval(interval)
         e.innerHTML = num;
      }
   }, t)
}

export default outNumber;
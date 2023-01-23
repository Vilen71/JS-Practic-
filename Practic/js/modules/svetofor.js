function svetofor() {
   const btn = document.getElementById("btn");
   const circle = document.getElementById("circle")

   const lights = {
      red: "red",
      green: "green",
      yellow: "yellow",
      yellow2: "yellow2",
   }

   const nextLight = {
      red: lights.yellow,
      yellow: lights.green,
      green: lights.yellow2,
      yellow2: lights.red,
   }

   const timeLights = {
      red: 7,
      green: 7,
      yellow: 3,
      yellow2: 3,
   }

   let currentColor = lights.red;
   let currentClass;
   let nextClass;

   function count(num) {
      if (num == -1) {
         currentClass = lights[currentColor];
         nextClass = nextLight[currentColor];
         currentColor = nextClass;
         num = timeLights[currentColor];
         circle.classList.replace(currentClass, nextClass) //смена цвета
      }
      circle.innerHTML = num;
      // console.log(num, currentColor);
      setTimeout(count, 1000, --num)
   }

   count(timeLights[currentColor])
}

export default svetofor;
function blackjack() {
   const startGameBtn = document.querySelector(".blackjack__start_btn"),
      gameBtns = document.querySelector(".blackjack__btns"),
      moreBtn = document.getElementById("more"),
      passBtn = document.getElementById("pass");

   const dilerCards = document.querySelector(".game__diler_cards"),
      playerCards = document.querySelector(".game__player_cards");

   const scoreDilerElem = document.getElementById("diler-score"),
      scorePlayerElem = document.getElementById("player-score");

   const result = document.getElementById("bet-result"),
      betView = document.getElementById("bet-view"),
      startText = document.querySelector(".blackjack__start_text"),
      roundTxt = document.querySelector(".blackjack__game_round");

   let dilerCount = 1, playerCount = 0,
      range, round = 1, win,
      newDilerCard, backDilerCard,
      createDilerCardValue, countForBlackjack = 0,
      leftDiler = 0, leftPlayer = 0, leftCoin = 740,
      slider, thumb, tooltip, progress,
      scoreDiler = 0, scorePlayer = 0,
      deposit = +result.dataset.bet, bet,
      zIndex = 1;

   startGameBtn.addEventListener("click", function () {
      if (slider.value > 0) {
         customSlider()
         bet = +slider.value;
         win = bet * 2;
         deposit -= bet;
         result.innerHTML = deposit;
         document.getElementById("round").innerHTML = round;
         roundTxt.classList.remove("hidden");

         betView.innerHTML = '-' + bet + '$';
         betView.classList.add("active")
         slider.max = deposit;
         tooltip.classList.remove("active");
         setTimeout(function () {
            betView.classList.remove("active")
         }, 2500)
         // chips()
         document.querySelector(".blackjack__start").classList.add("hidden")
         gameBtns.classList.add("active")
         scoreDilerElem.classList.add("active");
         scorePlayerElem.classList.add("active");

         addPlayerCard()
         setTimeout(addDilerCard, 800)
         dilerCards.classList.add("start");
         setTimeout(addPlayerCard, 1500)
         setTimeout(addDilerCard, 3200)

         setTimeout(function () {
            if (scorePlayer != 21) {
               moreBtn.classList.remove("active")
               passBtn.classList.remove("active")
            }
         }, 3700)
      }
   });
   moreBtn.addEventListener("click", function () {
      addPlayerCard()
      moreBtn.classList.add("active")
      passBtn.classList.add("active")
      function moreBtnFunc() {
         if (scorePlayer > 21) {
            newDilerCard.classList.add("active");
            scorePlayerElem.classList.add("red");
            setTimeout(function () {
               scoreDilerElem.innerHTML = scoreDiler
               scoreDilerElem.classList.add("green")
               setTimeout(reset, 1500)
            }, 500)
         }
         else {
            moreBtn.classList.remove("active")
            passBtn.classList.remove("active")
         }
      }
      setTimeout(moreBtnFunc, 600)
   });
   passBtn.addEventListener("click", function () {
      moreBtn.classList.add("active")
      passBtn.classList.add("active")
      setTimeout(function () {
         newDilerCard.classList.add("active");
         setTimeout(passBtnFunc, 550)
      }, 200)
   })
   function passBtnFunc() {
      scoreDilerElem.innerText = scoreDiler;
      if (scoreDiler == scorePlayer) {
         scoreDilerElem.classList.add("blue")
         scorePlayerElem.classList.add("blue")
         refreshResult()
         setTimeout(reset, 1500)
      }
      else if (scoreDiler > 16) {
         scoreDilerElem.innerText = scoreDiler;
         if (scoreDiler / 21 < scorePlayer / 21 || scoreDiler > 21) {
            scoreDilerElem.classList.add("red")
            scorePlayerElem.classList.add("green")
            refreshResult()
            setTimeout(reset, 1500)
         }
         else {
            scoreDilerElem.classList.add("green")
            scorePlayerElem.classList.add("red")
            setTimeout(reset, 1500)
         }
      }
      else {
         addDilerCard()
         setTimeout(function () {
            newDilerCard.classList.add("active");
            setTimeout(passBtnFunc, 400)
         }, 500)
      }
   }
   function addDilerCard() {
      newDilerCard = dilerCards.querySelectorAll(".game__card")[dilerCount];
      backDilerCard = newDilerCard.querySelectorAll(".game__back");
      createDilerCardValue = randomInteger(0, backDilerCard.length - 1);

      if (dilerCards.classList.contains("start")) {
         setTimeout(function () {
            newDilerCard.classList.add("active");
            dilerCards.classList.remove("start");
         }, 1700)
      }
      const nextDilerCard = newDilerCard.cloneNode(true);
      dilerCards.append(nextDilerCard);
      newDilerCard.classList.add("start");
      backDilerCard[createDilerCardValue].classList.add("back");
      newDilerCard.style.left = leftDiler + 'px';
      leftDiler += 70;
      setTimeout(function () {
         scoreDiler += Number(backDilerCard[createDilerCardValue].dataset.value);
      }, 440)
      setTimeout(function () {
         if (newDilerCard.classList.contains("active")) {
            scoreDilerElem.textContent = scoreDiler;
         }
      }, 2100)
      dilerCount++
   }
   function addPlayerCard() {
      countForBlackjack++
      const newPlayerCard = playerCards.querySelectorAll(".game__card")[playerCount];
      const backPlayerCard = newPlayerCard.querySelectorAll(".game__back");
      const createPlayerCardValue = randomInteger(0, backPlayerCard.length - 1);
      const nextPlayerCard = newPlayerCard.cloneNode(true);

      playerCards.append(nextPlayerCard);
      newPlayerCard.classList.add("active");
      backPlayerCard[createPlayerCardValue].classList.add("back");
      newPlayerCard.style.left = leftPlayer + 'px';
      leftPlayer += 70;

      setTimeout(function () {
         scorePlayer += Number(backPlayerCard[createPlayerCardValue].dataset.value);
         scorePlayerElem.textContent = scorePlayer;
      }, 400)
      setTimeout(function () {
         if (scorePlayer == 21 && countForBlackjack == 2) {
            betView.classList.remove("active")
            scorePlayerElem.classList.add("green");
            setTimeout(function () {
               newDilerCard.classList.add("active");
               setTimeout(function () {
                  scoreDilerElem.innerText = scoreDiler;
                  setTimeout(function () {
                     if (scoreDiler <= 16) {
                        addDilerCard()
                        newDilerCard.classList.add("active");
                        setTimeout(function () {
                           refreshResult()
                           scoreDilerElem.innerText = scoreDiler;
                           scoreDilerElem.classList.add("red");
                           setTimeout(reset, 1500)
                        }, 650)
                     }
                     else {
                        scoreDilerElem.classList.add("red");
                        refreshResult()
                        setTimeout(reset, 1500)
                     }
                  }, 50)
               }, 350)
            }, 1800)
         }
         if (scorePlayer == 21 && countForBlackjack > 2) {
            newDilerCard.classList.add("active");
            setTimeout(passBtnFunc, 500)
         }
      }, 500)

      playerCount++
   }
   function randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand
   }
   function refreshResult() {
      if (scoreDiler == scorePlayer) {
         deposit += bet;
         betView.innerHTML = '+' + bet + '$';
      }
      else {
         deposit += win;
         betView.innerHTML = '+' + win + '$';
      }
      betView.classList.add("active")
      result.innerHTML = deposit.toLocaleString("ru");
      slider.max = deposit;
      setTimeout(function () {
         betView.classList.remove("active")
      }, 2500)
   }
   function reset() {
      const oldCards = document.querySelectorAll(".game__card.active")
      const randomX = randomInteger(-320, -325)
      const randomY = randomInteger(400, 415)
      const randomRotate = randomInteger(-90, 90)
      let i = 0;
      setTimeout(function () {
         document.querySelector(".blackjack__start").classList.remove("hidden");
         gameBtns.classList.remove("active");
      }, 850)

      if (oldCards.length != 0) {
         oldCards[i].style.zIndex = zIndex;
         oldCards[i].classList.remove("active");
         oldCards[i].style.left = '0';
         oldCards[i].style.transform = `translate(${randomX}px,${randomY}px) rotate(${randomRotate}deg)`;
         setTimeout(reset, 120)
      }
      else {
         newGame();
      }
      zIndex++
      i++
   }
   function newGame() {
      startText.classList.remove("hidden");
      thumb.classList.remove("active");
      startGameBtn.classList.add("active");
      leftDiler = 0, leftPlayer = 0, round++,
         scoreDiler = 0, scorePlayer = 0,
         countForBlackjack = 0,
         scoreDilerElem.textContent = scoreDiler,
         scorePlayerElem.textContent = scorePlayer;
      scoreDilerElem.className = 'game__diler_score active';
      scorePlayerElem.className = 'game__player_score active';
      if (deposit <= 0) {
         startText.innerHTML = "You don't have enough chips! Come back later!"
         startGameBtn.classList.add("active");
         range[0].classList.add("active");
         scoreDilerElem.classList.remove("active");
         scorePlayerElem.classList.remove("active");
      }
   }
   function customSlider() {
      range = document.querySelectorAll(".blackjack__range");
      for (let i = 0; i < range.length; i++) {
         slider = range[i].querySelector(".range-blackjack__bet");
         thumb = range[i].querySelector(".range-blackjack__thumb");
         tooltip = range[i].querySelector(".range-blackjack__tooltip");
         progress = range[i].querySelector(".range-blackjack__progress");
      }
      const maxVal = slider.getAttribute("max");
      const val = (slider.value / maxVal) * 100 + '%';
      tooltip.innerHTML = slider.value + ' $';
      progress.style.width = val;
      thumb.style.left = val;
      if (slider.value == 0) {
         tooltip.classList.remove("active");
         thumb.classList.remove("active");
         startText.classList.remove("hidden");
      }
   }
   customSlider()
   slider.addEventListener("input", function () {
      tooltip.classList.add("active");
      thumb.classList.add("active");
      startText.classList.add("hidden");
      startGameBtn.classList.remove("active");
      customSlider()
   })
}
export default blackjack
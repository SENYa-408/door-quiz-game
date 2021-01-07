// questions array
const questions = [
  {
    question:
      "3 birches grew. Each birch has 7 branches. On each branch - 3 apples. How many apples are there?",
    answers: [0, 21, 147],
    topic: "logic",
  },

  {
    question: "What Nupedia is?",
    answers: [
      "Web-based encyclopedia",
      "Social network",
      "Social network for scientists",
    ],
    topic: "other",
  },

  {
    question: "Unturned release",
    answers: ["2017", "2016", "2015"],
    topic: "games",
  },

  {
    question:
      "All 3 doors lead to the street. Which door should be chosen to be saved?",
    answers: [
      "Behind this door, deadly gas",
      "Behind this door, the killer",
      "Behind this door, fire",
    ],
    topic: "logic",
  },

  {
    question: "The release of the film Spider-Man: Into the Spider-Verse?",
    answers: ["2018", "2017", "2019"],
    topic: "films",
  },

  {
    question: "First appearence of Batman",
    answers: ["1939", "1945", "1984"],
    topic: "films",
  },

  {
    question:
      "the bag is heavier than a toy. the toy is heavier than a backpack. Compare the bag and backpack.",
    answers: ["Bag is havier", "They are equal", "Backpack is havier"],
    topic: "logic",
  },

  {
    question: "What came out before: League of legends or Dota2?",
    answers: ["Legue of Legends", "They were released in one year", "Dota2"],
    topic: "games",
  },

  {
    question: "First appearence of SpiderMan",
    answers: ["1962", "1983", "1974"],
    topic: "films",
  },

  {
    question: "What facepunch is?",
    answers: ["Game-dev studio", "Youtube channel", "Site"],
    topic: "games",
  },

  {
    question: "What Utopia Show is?",
    answers: ["Youtube channel", "TV show", "Site"],
    topic: "other",
  },

  {
    question: "What Purge of Kingdoms is?",
    answers: ["Unauthorized pardoy", "TV show", "Twitch channel"],
    topic: "films",
  },

  {
    question: "When Spotify launched in Ukraine?",
    answers: ["July 2020", "May 2020", "June 2020"],
    topic: "other",
  },

  {
    question: "The Walking Dead release of the first episode",
    answers: ["October 2010", "January 2010", "September 2010"],
    topic: "films",
  },
];

// constants
const score_counter = document.getElementById("score");
const hi_counter = document.getElementById("hi");
const doors = document.querySelectorAll(".door");
const question = document.getElementById("question");
const answers = document.querySelectorAll(".answer");

// constants for achivements modal window
const achieve_modal = document.getElementById("modal-wrapper-achieve");
const achievements_btn = document.getElementById("achievements");
const achieve_close = document.getElementById("achieve-close");
// achievements
const loser_ach = document.getElementById("loser-ach");
const winner_ach = document.getElementById("winner-ach");

// constants for topic modal window
const topic_modal = document.getElementById("modal-wrapper-topic");
const topic_btn = document.getElementById("topic");
const topic_close = document.getElementById("topic-close");
// topic radio buttons
const topic_radio = document.getElementsByName("topic");

// sounds
const game_over_sound = document.getElementById("game-over");
const win_sound = document.getElementById("win");
const bruh_sound = document.getElementById("bruh");
const bruh_slower_sound = document.getElementById("bruh-but-slower");
const bruh_remix_sound = document.getElementById("bruh-remix");
const food_sound = document.getElementById("food");
const sounds = document.getElementsByTagName("audio");

// let variables
let score = 0;
let hi = 0;
let lose_score = 0;
let isclicked = true;
let isLoserAchievement;
let isWinnerAchievement;
let topic_questions;

// stops every sound except chosen one
const pauseSound = (exception) => {
  for (i = 0; i < sounds.length; i++) {
    if (sounds[i] != exception) sounds[i].pause();
  }
};

//function that pick and return random door
const random = () => {
  //filter to find questions that match with picked topic
  topic_radio.forEach((radio_el) => {
    if (radio_el.value !== "all") {
      if (radio_el.checked) {
        // if topic element equals picked topic, put it in topic_questions
        topic_questions = questions.filter((filter_el) => {
          if (filter_el.topic === radio_el.value) {
            return true;
          } else return false;
        });
      }
    } else {
      topic_questions = questions;
    }
  });

  // random number that defines correct door
  let random = Math.floor(Math.random() * 3);
  // random number that defines what question will display
  let rand_answer = Math.floor(Math.random() * topic_questions.length);

  //variables that defines where wrong answers will be displayed
  let wrong_answer2 = Math.floor(Math.random() * 2) + 1;
  let wrong_answer3;
  wrong_answer2 === 1 ? (wrong_answer3 = 2) : (wrong_answer3 = 1);

  switch (random) {
    case 0:
      // if random = 0, than first door is right

      question.innerHTML = topic_questions[rand_answer].question;
      answers[0].innerHTML = topic_questions[rand_answer].answers[0];
      answers[1].innerHTML =
        topic_questions[rand_answer].answers[wrong_answer2];
      answers[2].innerHTML =
        topic_questions[rand_answer].answers[wrong_answer3];
      break;
    case 1:
      // if random = 1, than second door is right

      question.innerHTML = topic_questions[rand_answer].question;
      answers[0].innerHTML =
        topic_questions[rand_answer].answers[wrong_answer2];
      answers[1].innerHTML = topic_questions[rand_answer].answers[0];
      answers[2].innerHTML =
        topic_questions[rand_answer].answers[wrong_answer3];
      break;
    default:
      // If random != 0 or 1(random number can be only 0, 1 or 2), so the third door is right

      question.innerHTML = topic_questions[rand_answer].question;
      answers[0].innerHTML =
        topic_questions[rand_answer].answers[wrong_answer3];
      answers[1].innerHTML =
        topic_questions[rand_answer].answers[wrong_answer2];
      answers[2].innerHTML = topic_questions[rand_answer].answers[0];
  }

  // Assign a random door to the right_door variable
  right_door = doors[random];
};

// If there is a Loser Achievement saved in the local storage, take and show it
if (localStorage.getItem("isLoserAchievement") !== null) {
  isLoserAchievement = true;
  loser_ach.classList.remove("achieve-locked");
} else {
  isLoserAchievement = false;
}

// If there is a Winner Achievement saved in the local storage, take and show it
if (localStorage.getItem("isWinnerAchievement") !== null) {
  isWinnerAchievement = true;
  winner_ach.classList.remove("achieve-locked");
} else {
  isWinnerAchievement = false;
}

// If there is a highest score saved in the local storage, take and show it
if (localStorage.getItem("hi_score") !== null) {
  hi = localStorage.getItem("hi_score");
  hi_counter.innerHTML = hi;
}

doors.forEach((el) => {
  // If door was clicked
  el.addEventListener("click", () => {
    // When any door is clicked, other are blocked until the animation ends and new question appears
    if (isclicked) {
      isclicked = false;
      if (el === right_door) {
        lose_score = 0;
        // Score +1 and animation of opened door when the right door was picked
        score_counter.innerHTML = score += 1;
        el.firstChild.src = "/imgs/coin_opened_door.png";

        let rand = Math.random();

        if (rand < 0.95) {
          pauseSound(bruh_sound);
          bruh_sound.currentTime = 0;
          bruh_sound.play();
        } else if (rand < 0.99) {
          pauseSound(bruh_remix_sound);
          bruh_remix_sound.currentTime = 0;
          bruh_remix_sound.play();
        } else {
          pauseSound(bruh_slower_sound);
          bruh_slower_sound.currentTime = 0;
          bruh_slower_sound.play();
        }

        // If score is bigger than highest score show it and put it in the local storage
        if (score > hi) {
          hi_counter.innerHTML = hi = score;
          localStorage.setItem("hi_score", hi);

          pauseSound(win_sound);
          win_sound.currentTime = 0;
          win_sound.play();
        }

        // Checking winner achievement
        if (score === 30 && !isWinnerAchievement) {
          localStorage.setItem("isWinnerAchievement", true);
          isWinnerAchievement = true;
          winner_ach.classList.remove("achieve-locked");

          achievements_btn.classList.toggle("new-achievement");
          setTimeout(function () {
            achievements_btn.classList.toggle("new-achievement");
          }, 500);
        }
      } else {
        // If wrong door was picked
        score_counter.innerHTML = score = 0;
        el.firstChild.src = "/imgs/opened_door.png";

        pauseSound(game_over_sound);
        game_over_sound.currentTime = 0;
        game_over_sound.play();

        // Easter egg (playing Big smoke order)
        if (lose_score > 10) {
          pauseSound(food_sound);
          food_sound.currentTime = 0;
          food_sound.play();
          lose_score = 0;

          // Checking loser achievement
          if (!isLoserAchievement) {
            localStorage.setItem("isLoserAchievement", true);
            isLoserAchievement = true;
            loser_ach.classList.remove("achieve-locked");

            achievements_btn.classList.toggle("new-achievement");
            setTimeout(function () {
              achievements_btn.classList.toggle("new-achievement");
            }, 500);
          }
        } else lose_score += 1;
      }
      setTimeout(function () {
        // Close animation after 0.5 sec
        el.firstChild.src = "/imgs/closed_door.png";

        // Repeat random() function after close animation end
        random();
        isclicked = true;
      }, 500);
    }
  });
});

// Start random() function
random();

// ACHIEVEMENTS MODAL
// Show achievements modal if button is clicked
achievements_btn.addEventListener("click", function () {
  achieve_modal.style.display = "block";
});

// Hide achievements modal if close button is clicked
achieve_close.addEventListener("click", function () {
  achieve_modal.style.display = "none";
});

// Hide achievements modal if anywhere exept modal is clicked
window.addEventListener("click", function () {
  if (event.target == achieve_modal) achieve_modal.style.display = "none";
});

// TOPIC MODAL
// Show topic modal if button is clicked
topic_btn.addEventListener("click", function () {
  topic_modal.style.display = "block";
});

// Hide topic modal if close button is clicked
topic_close.addEventListener("click", function () {
  topic_modal.style.display = "none";
});

// Hide topic modal if anywhere exept modal is clicked
window.addEventListener("click", function () {
  if (event.target == topic_modal) topic_modal.style.display = "none";
});

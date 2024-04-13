document.addEventListener("DOMContentLoaded", () => {
  const play_pause_button = document.getElementById("play_pause_button");
  const progressBar = document.getElementById("progressBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  // Song Name and description
  let song_name = document.getElementById("song_name");
  let Artists_name = document.getElementById("Artists_name");
  let song_image = document.getElementById("song_image");

  // play pause button
  let music_play_button = document.getElementById("music_play_button");
  let music_pause_button = document.getElementById("music_pause_button");

  // Back and Next button
  let back_button = document.getElementById("back_button"); 
  let next_button = document.getElementById("next_button"); 

  // Volume_controler
  let Volume_controler = document.getElementById("Volume_controler");

  // Download button
  let download_button = document.getElementById("download_button");

  // Option button (three dots)
  let Options_button = document.getElementById("Options_button");
  let Options_div = document.getElementById("Options_div");

  // All Songs
  let all_songs = document.querySelectorAll(".all_songs");

  // Current song
  let current_song = 0;

  // All Songs array 
  let All_song_file = [
    "./Assets/Ik_Vaari_Aa_Full_Song.m4a",
    "./Assets/Chogada.mp3",
    "./Assets/Ae_Dil_Hai_Mushkil.mp3",
    "./Assets/Coca_Cola.mp3",
    "./Assets/First_Class.mp3",
    "./Assets/Bala_bala_song.mp3",
    "./Assets/Bekhayali.mp3",
    "./Assets/Besabriyaan.mp3",
    "./Assets/Besharmi_Ki_Height.mp3",
    "./Assets/Kesariya.m4a",
    "./Assets/Illegal_Weapon_2.mp3",
    "./Assets/Lehanga.m4a",
  ]

  let all_music_duration = [
    "03:47",
    "04:09",
    "05:00",
    "02:59",
    "04:37",
    "02:17",
    "06:10",
    "03:30",
    "04:16",
    "02:52",
    "04:18",
    "03:45",
  ]

  // Actual music
  let Music = document.getElementById("actual_song");
  // let Music = new Audio("./Assets/Ik_Vaari_Aa_Full_Song.m4a");

  all_songs.forEach((element, index) => {
    element.addEventListener("click", () => {
      element.querySelector(".play_animation").innerHTML = `<img class="invert w-6 mr-2" src="https://wynk.in/_next/static/media/animation.43a00529.svg" alt="play music image">`;
      // Update the name of song which is currently playing
      song_name.innerText = element.querySelector("h1").innerText;
      Artists_name.innerText = element.querySelector("p").innerText;
      // Changing the image of song which is currently playing
      song_image.src = element.querySelector("img").src;
      // Changing the music 
      Music.src = All_song_file[index];
      current_song = index;
      Music.play();

      // Adding song src to download_button
      download_button.href = All_song_file[index];
      download_button.download = `${song_name.innerText}.mp3`;

      durationEl.innerText = all_music_duration[index];
      if (music_pause_button.classList.contains("hidden")) {
        music_play_button.classList.add("hidden");
        music_pause_button.classList.remove("hidden");
      }
      all_songs.forEach((song_div, i) => {
        if(i != index){
          song_div.querySelector(".play_animation").innerHTML = all_music_duration[i];
        }
      })
    })
  })

  // Play or pause the Music
  play_pause_button.addEventListener("click", () => {
    if (music_pause_button.classList.contains("hidden")) {
      Music.play();
      music_play_button.classList.add("hidden");
      music_pause_button.classList.remove("hidden");
    } else {
      Music.pause();
      music_play_button.classList.remove("hidden");
      music_pause_button.classList.add("hidden");
    }
  });

  // Back button - go to previous music
  back_button.addEventListener("click", () => {
    if(current_song > 0){
      current_song--;
      all_songs[current_song].click();
    }
  })

  // Next button - go to previous music
  next_button.addEventListener("click", () => {
    if(current_song < 11){
      current_song++;
      all_songs[current_song].click();
    }
  })

  // Volume controler
  Volume_controler.addEventListener("input",() => {
    Music.volume = Volume_controler.value;
  })

  // Options_button
  Options_button.addEventListener("click", (event) => {
    event.stopPropagation();
    if(Options_div.classList.contains("hidden")){
      Options_div.classList.remove("hidden");
    }
    else{
      Options_div.classList.add("hidden");
    }
  })

  // Close the option when click outside
  window.addEventListener("click", () => {
    if(!Options_div.classList.contains("hidden")){
      Options_div.classList.add("hidden");
    }
  })

  // Update progress bar as Music plays
  Music.addEventListener("timeupdate", () => {
    setTimeout(() => {
      progressBar.value = (Music.currentTime / Music.duration) * 100;
    }, 1000);
    currentTimeEl.innerText = formatTime(Music.currentTime);
    // durationEl.innerText = formatTime(Music.duration);
  });

  // Seek functionality
  progressBar.addEventListener("input", () => {
    Music.volume = 0;
    Music.currentTime = (progressBar.value * Music.duration) / 100;
  });

  setInterval(() => {
    Music.volume = Volume_controler.value;
  }, 1000);

  // Helper function to format time
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = seconds >= 10 ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }
});

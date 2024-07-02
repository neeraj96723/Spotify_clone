console.log("let's write javascript");
let currentSong = new Audio();
let songs = [];
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    try {
        currFolder = folder;
        let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");
        songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(decodeURIComponent(element.href.replace(`http://127.0.0.1:5500/${folder}/`, "")));
            }
        }

        // Show all the songs in the playlist
        let songUL = document.querySelector(".songList ul");
        songUL.innerHTML = "";
        for (const song of songs) {
            songUL.innerHTML += `<li>
                                  <img class="invert" src="/img/music.svg" alt="">
                                  <div class="info">
                                      <div>
                                           ${song.replaceAll("http://127.0.0.1:5500/songs/", "")} 
                                      </div>
                                      <div>
                                          Neeraj Singal
                                      </div>
                                  </div>
                                  <div class="playnow">
                                      <span>Play Now</span>
                                      <img class="invert" src="/img/play.svg" alt="">
                                  </div>
          </li>`;
        }

        // Attach an event listener to each song
        Array.from(document.querySelectorAll(".songList li")).forEach(e => {
            e.addEventListener("click", element => {
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            });
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

const playMusic = (track, pause = false) => {
    if (!track) {
        console.error('No track provided to playMusic');
        return;
    }
    currentSong.src = `/${currFolder}/` + encodeURIComponent(track);
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}



async function main() {
    // Get the list of all songs
    await getSongs("songs/ncs");
    if (songs.length > 0) {
        playMusic(songs[0], true);
    } else {
        console.warn('No songs found in the folder');
    }

      // Get the list of all songs
      await getSongs("songs/Angry_(mood)");
      if (songs.length > 0) {
          playMusic(songs[0], true);
      } else {
          console.warn('No songs found in the folder');
      }

        // Get the list of all songs
      await getSongs("songs/Bright_(mood)");
      if (songs.length > 0) {
          playMusic(songs[0], true);
      } else {
          console.warn('No songs found in the folder');
      }

         // Get the list of all songs
         await getSongs("songs/Chill_(mood)");
         if (songs.length > 0) {
             playMusic(songs[0], true);
         } else {
             console.warn('No songs found in the folder');
         }

            // Get the list of all songs
      await getSongs("songs/cs");
      if (songs.length > 0) {
          playMusic(songs[0], true);
      } else {
          console.warn('No songs found in the folder');
      }

         // Get the list of all songs
         await getSongs("songs/Dark_(mood)");
         if (songs.length > 0) {
             playMusic(songs[0], true);
         } else {
             console.warn('No songs found in the folder');
         }

            // Get the list of all songs
      await getSongs("songs/Diljit");
      if (songs.length > 0) {
          playMusic(songs[0], true);
      } else {
          console.warn('No songs found in the folder');
      }

         // Get the list of all songs
         await getSongs("songs/Funky_(mood)");
         if (songs.length > 0) {
             playMusic(songs[0], true);
         } else {
             console.warn('No songs found in the folder');
         }

            // Get the list of all songs
      await getSongs("songs/karan_aujla");
      if (songs.length > 0) {
          playMusic(songs[0], true);
      } else {
          console.warn('No songs found in the folder');
      }

         // Get the list of all songs
         await getSongs("songs/Love_(mood)");
         if (songs.length > 0) {
             playMusic(songs[0], true);
         } else {
             console.warn('No songs found in the folder');
         }

            // Get the list of all songs
      await getSongs("songs/Uplifting_(mood)");
      if (songs.length > 0) {
          playMusic(songs[0], true);
      } else {
          console.warn('No songs found in the folder');
      }

   


    // Attach an event listener to play, next and previous song
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Add an event listener for close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    document.querySelector("#previous").addEventListener("click", () => {
        currentSong.pause();
        console.log("Previous clicked");
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").pop()));
        if (index - 1 >= 0) {
            playMusic(songs[index - 1]);
        } else {
            console.warn("No previous song available");
        }
    });
    
    document.querySelector("#next").addEventListener("click", () => {
        currentSong.pause();
        console.log("Next clicked");
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").pop()));
        if (index + 1 < songs.length) {
            playMusic(songs[index + 1]);
        } else {
            console.warn("No next song available");
        }
    });
    

    // Add an event to volume
    document.querySelector(".range input").addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100");
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg");
        }
    });

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            console.log("Fetching Songs");
            await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            if (songs.length > 0) {
                playMusic(songs[0]);
            } else {
                console.warn('No songs found in the selected folder');
            }
        });
    });

     // Add event listener to mute the track
     document.querySelector(".volume>img").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentSong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

}

main();

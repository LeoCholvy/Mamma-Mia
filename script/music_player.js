/*
  1. Render songs
  2. Scroll top
  3. Play / pause / seek
  4. CD rotate
  5. Next / prve
  6. Random
  7. Next / repeat when ended
  8. Active song
  9. Scroll acctive song into view
  10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "MUSIC_PLAYER_TienHieu";

const player = $(".player");
const cd = $(".cd");
const heading = $(".header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  //Lấy ra chỉ mục đầu tiên của mảng
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isNext: false,
  isPrev: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Money, Money, Money",
      singer: "ABBA",
      path:
        "../audio/money_money_money.mp3",
      image: "../img/songs/money.jpg"
    },
    {
      name: "Dancing Queen",
      singer: "ABBA",
      path:
        "../audio/dancing_queen.mp3",
      image:
        "../img/songs/dancing.jpg"
    },
    {
      name: "Honey, Honey",
      singer: "ABBA",
      path:
        "../audio/honey_honey.mp3",
      image: "../img/songs/honey.jpg"
    },
    {
      name: "Mamma Mia",
      singer: "ABBA",
      path:
        "../audio/mamma_mia.mp3",
      image:
        "../img/songs/mamma.jpg"
    },
    {
      name: "Our Last Summer",
      singer: "ABBA",
      path:
        "../audio/our_last_summer.mp3",
      image:
        "../img/songs/summer.jpg"
    },
    {
      name: "Lay All Your Love On Me",
      singer: "ABBA",
      path:
        "../audio/lay_all_your_love.mp3",
      image:
        "../img/songs/Lay_All_Your_Love_On_Me.jpg"
    },
    {
      name: "Gimme! Gimme! Gimme!",
      singer: "ABBA",
      path:
        "../audio/gimme.mp3",
      image: "../img/songs/gimme.jpg"
    },
    {
      name: "Waterloo",
      singer: "ABBA",
      path:
        "../audio/Waterloo.mp3",
      image: "../img/songs/Waterloo.jpg"
    }
  ],

  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
            <div class="thumb"
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
    `;
    });
    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },

  handleEvents: function () {
    const _this = this;

    //Lấy ra kích thước mặc định của CD
    const cdWidth = cd.offsetWidth;

    //Xử lý  CD quay và dừng
    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)"
        }
      ],
      {
        duration: 10000, //10 seconds
        itetations: Infinity
      }
    );
    cdThumbAnimate.pause();

    // Xử lý phóng to thu nhỏ CD
    (document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop; //Kích thước cd trừ đi kích thước kéo lên để tính ra kích thước cần giảm

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    }),
      //Xử lý khi click play
      (playBtn.onclick = function () {
        if (_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      });

    //Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    //Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //Xử lý khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //Xử lý nhấn sẽ active button
    nextBtn.onmousedown = function () {
      _this.isNext = !_this.isNext;
      nextBtn.classList.toggle("active", _this.isNext);
    };
    nextBtn.onmouseup = function () {
      _this.isNext = !_this.isNext;
      nextBtn.classList.remove("active", _this.isNext);
    };

    prevBtn.onmousedown = function () {
      _this.isPrev = !_this.isPrev;
      prevBtn.classList.toggle("active", _this.isPrev);
    };
    prevBtn.onmouseup = function () {
      _this.isPrev = !_this.isPrev;
      prevBtn.classList.remove("active", _this.isPrev);
    };

    //Khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    //Khi prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    //Xử lý bật tắt random Song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    //Xử lý lặp lại một Song
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //Xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Lắng nghe hành vi click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".options")) {
        //Xử lý click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
        //Xử lý khi click vào song options
        if (e.target.closest(".options")) {
        }
      }
    };
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 100);
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  nextSong: function () {
    this.currentIndex++;

    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  start: function () {
    //Gán cấu hình từ config vào ứng dụng
    this.loadConfig();
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM Events)
    this.handleEvents();

    // Tải thông tin bài đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // Render playlists
    this.render();

    //Hiển thị trạng thái ban đầu của button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
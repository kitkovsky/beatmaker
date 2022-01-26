class DrumKit {
  playButton: HTMLButtonElement;
  pads: NodeListOf<Element>;
  kickAudio: HTMLAudioElement;
  snareAudio: HTMLAudioElement;
  hihatAudio: HTMLAudioElement;
  currentKick: string;
  currentSnare: string;
  currentHihat: string;
  step: number;
  bpm: number;
  intervalID: number;
  selects: NodeListOf<HTMLSelectElement>;
  muteButtons: NodeListOf<HTMLButtonElement>;
  tempoSlider: HTMLInputElement;

  constructor() {
    this.playButton = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.step = 0;
    this.bpm = 150;
    this.intervalID = null;
    this.selects = document.querySelectorAll("select");
    this.muteButtons = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  start(): void {
    const interval = (60 / this.bpm) * 1000;
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    } else {
      this.intervalID = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  repeat(): void {
    const activeBeats: NodeListOf<Element> = document.querySelectorAll(
      `.b${this.step}`
    );
    activeBeats.forEach((bar: HTMLElement) => {
      bar.style.animation = "playTrack 0.2s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        // FIXME: if more than one pad is being played, they're not being played at the same time
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.play();
          this.kickAudio.currentTime = 0;
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.play();
          this.snareAudio.currentTime = 0;
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.play();
          this.hihatAudio.currentTime = 0;
        }
      }
    });
    this.step++;
    this.step %= 8;
  }

  updateButton(): void {
    if (this.intervalID) {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    } else {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    }
  }

  changeSound(event: Event): void {
    const selectedName = (event.target as HTMLSelectElement).name;
    const selectedValue = (event.target as HTMLSelectElement).value;
    switch (selectedName) {
      case "kick-select":
        this.kickAudio.src = selectedValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectedValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectedValue;
        break;
    }
  }

  mute(event: Event): void {
    const selectedVolume = (event.target as HTMLButtonElement).classList[1];
    (event.target as HTMLButtonElement).classList.toggle("active");
    if ((event.target as HTMLButtonElement).classList.contains("active")) {
      switch (selectedVolume) {
        case "kick-volume":
          this.kickAudio.volume = 0;
          break;
        case "snare-volume":
          this.snareAudio.volume = 0;
          break;
        case "hihat-volume":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (selectedVolume) {
        case "kick-volume":
          this.kickAudio.volume = 1;
          break;
        case "snare-volume":
          this.snareAudio.volume = 1;
          break;
        case "hihat-volume":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  updateTempo(event: Event): void {
    const tempoText: HTMLElement = document.querySelector(".tempo-value");
    this.bpm = parseInt((event.target as HTMLInputElement).value);
    tempoText.innerText = `${this.bpm}`;

    clearInterval(this.intervalID);
    this.intervalID = null;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad: HTMLElement) => {
  pad.addEventListener("click", () => {
    pad.classList.toggle("active");
  });
  pad.addEventListener("animationend", () => {
    pad.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.updateButton();
  drumKit.start();
});

drumKit.selects.forEach((select: HTMLSelectElement) => {
  select.addEventListener("change", (event) => {
    drumKit.changeSound(event);
  });
});

drumKit.muteButtons.forEach((button: HTMLButtonElement) => {
  button.addEventListener("click", (event) => {
    drumKit.mute(event);
  });
});

drumKit.tempoSlider.addEventListener("input", (event) => {
  drumKit.updateTempo(event);
});

class DrumKit {
  playButton: HTMLButtonElement;
  pads: NodeListOf<Element>;
  kickAudio: HTMLAudioElement;
  snareAudio: HTMLAudioElement;
  hihatAudio: HTMLAudioElement;
  step: number = 0;
  bpm: number = 150;

  constructor() {
    this.playButton = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
  }

  start(): void {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
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
  drumKit.start();
});

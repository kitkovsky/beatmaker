class DrumKit {
  playButton: HTMLButtonElement;
  pads: NodeListOf<Element>;
  kickAudio;
  snareAudio;
  hihatAudio;
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
    const activeBeats = document.querySelectorAll(`.b${this.step}`);
    console.log(this.step);
    this.step++;
    this.step %= 8;
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pad.classList.toggle("active");
  });
});

drumKit.playButton.addEventListener("click", () => {
  drumKit.start();
});

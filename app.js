class DrumKit {
    playButton;
    pads;
    kickAudio;
    snareAudio;
    hihatAudio;
    step = 0;
    bpm = 150;
    constructor() {
        this.playButton = document.querySelector(".play");
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval);
    }
    repeat() {
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

class DrumKit {
    playButton;
    pads;
    kickAudio;
    snareAudio;
    hihatAudio;
    step = 0;
    bpm = 150;
    intervalID = null;
    constructor() {
        this.playButton = document.querySelector(".play");
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
        else {
            this.intervalID = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    updateButton() {
        if (this.intervalID) {
            this.playButton.innerText = "Play";
            this.playButton.classList.remove("active");
        }
        else {
            this.playButton.innerText = "Stop";
            this.playButton.classList.add("active");
        }
    }
    repeat() {
        const activeBeats = document.querySelectorAll(`.b${this.step}`);
        activeBeats.forEach((bar) => {
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
drumKit.pads.forEach((pad) => {
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

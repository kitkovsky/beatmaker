class DrumKit {
    playButton;
    pads;
    kickAudio;
    snareAudio;
    hihatAudio;
    currentKick;
    currentSnare;
    currentHihat;
    step;
    bpm;
    intervalID;
    selects;
    muteButtons;
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
    changeSound(event) {
        const selectedName = event.target.name;
        const selectedValue = event.target.value;
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
    mute(event) {
        const selectedVolume = event.target.classList[1];
        event.target.classList.toggle("active");
        if (event.target.classList.contains("active")) {
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
        }
        else {
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
drumKit.selects.forEach((select) => {
    select.addEventListener("change", (event) => {
        drumKit.changeSound(event);
    });
});
drumKit.muteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        drumKit.mute(event);
    });
});

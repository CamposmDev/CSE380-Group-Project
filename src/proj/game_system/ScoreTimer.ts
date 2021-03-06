import Timer from "../../Wolfie2D/Timing/Timer";

export default class ScoreTimer extends Timer {
    getTimeLeftInSeconds(): number {
        return Math.round(this.timeLeft / 1000.0)
    }

    getTimeLeftInMillis(): number {
        return this.timeLeft
    }

    toString(): string {
        return `Time: ${Math.round(this.timeLeft / 1000.0)}`
    }
}
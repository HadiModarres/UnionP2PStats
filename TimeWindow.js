class TimeWindow {
    /**
     *
     * @param intervalCount width of the time window
     * @param intervalDuration , how long each point in the time window is
     */
    constructor(intervalCount,intervalDuration){
        this.intervalCount = intervalCount;
        this.intervalDuration = intervalDuration;
        this.intervals = [];
        this._startNextInterval();
    }

    _startNextInterval(){
        this.currentInterval = 0;
        setTimeout(()=>{this._intervalEnded()},this.intervalDuration);
    }
    _intervalEnded(){
        if (this.intervals.length>=this.intervalCount){
            this.intervals.shift();
            this.intervals.push(this.currentInterval);
        }else{
            this.intervals.push(this.currentInterval);
        }
        this._startNextInterval();
    }
    increment(){
        this.currentInterval++;
    }

    getCumulativeCounts(){
        return this.intervals;
    }


}

module.exports = TimeWindow;

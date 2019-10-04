let TimeWindow = require("./TimeWindow");

class Stats {

    constructor(){
       this.lastSearch = [];
       this.nodes = {};
       this.linkChangeTimeWindow = new TimeWindow(50,4000);
       this.nodeStatsArr = {};
       this._recyclePointers();
    }

    _recyclePointers(){
        let freshPointers = Object.values(this.nodeStatsArr).filter((value => {
            if (new Date().getTime() / 1000 - value.seconds <= 20) {
                return true;
            } else {
                return false;
            }
        }));
        this.nodeStatsArr = {};
        for (let f of freshPointers){
           this.nodeStatsArr[f.id] = f;
        }
       setTimeout(()=>{this._recyclePointers()},10000);
    }

    linkChanged(count){
        for (let i=0;i<count;i++) {
            this.linkChangeTimeWindow.increment();
        }
    }

    getLinkChangeTimeWindow(){
        return this.linkChangeTimeWindow.getCumulativeCounts();
    }

    neighborsUpdated(node){
        this.nodes[node.id] = node;
        // console.info(this.nodes);
    }

    nodeStats(node){
        node.seconds = new Date().getTime()/1000;
        this.nodeStatsArr[node.id] = node;
    }
    getNodeStats(){
        return Object.values(this.nodeStatsArr);
    }

    getNodes(){
        return Object.values(this.nodes);
    }

    initSearchObj(id){
        this.lastSearch = {
            id: id
            , query: '',
            stats:[]
        };
    }

    searchStarted(id,sourceName,query) {
        if (this.lastSearch.id !== id) {
            this.initSearchObj(id);
            this.lastSearch.query = query;
            this.lastSearch.stats.push({action: 'start', name: sourceName});
        }
    }
    searchRelayed(id,nodeName,target_name){
        if (this.lastSearch.id !== id) {
            this.initSearchObj(id);
        }
        this.lastSearch.stats.push({action:'relay',name: nodeName, target_name});
    }
    searchRevisited(id,nodeName){
        if (this.lastSearch.id !== id) {
            this.initSearchObj(id);
        }
        this.lastSearch.stats.push({action:'revisit',name: nodeName});
    }
    searchResponded(id,nodeName){
        if (this.lastSearch.id !== id) {
            this.initSearchObj(id);
        }
        this.lastSearch.stats.push({action:'respond',name: nodeName});
    }
    searchDiscarded(id,nodeName){
        if (this.lastSearch.id !== id) {
            this.initSearchObj(id);
        }
        this.lastSearch.stats.push({action:'discard',name: nodeName});
    }

    printStats(){
        return JSON.stringify(this.lastSearch);
    }
}

let stats = new Stats();

module.exports = stats;

class Stats {

    constructor(){
       this.lastSearch = [];
       this.nodes = {};
    }

    neighborsUpdated(node){
        this.nodes[node.id] = node;
        // console.info(this.nodes);
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
    searchRelayed(id,nodeName){
        if (this.lastSearch.id !== id) {
            this.initSearchObj(id);
        }
        this.lastSearch.stats.push({action:'relay',name: nodeName});
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

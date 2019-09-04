class Stats {

    constructor(){
       this.searches = [];

    }

    searchStarted(id,sourceNodeId,query){
        if (this.__searchObjectFor(id))
            return ;
       let newSearch = {};
       newSearch.id= id;
       newSearch.sourceId = sourceNodeId;
       newSearch.query = query;
       newSearch.relays = 0;
       newSearch.revisits = 0 ;
       newSearch.responses = 0;
       newSearch.discarded = 0;
        this.searches.push(newSearch);
    }
    searchRelayed(id){
        let searchObj = this.__searchObjectFor(id);
        if (!searchObj){
            console.error("search object doesnt exist");
            return;
        }
        searchObj.relays++ ;
    }
    searchRevisited(id){

        let searchObj = this.__searchObjectFor(id);
        if (!searchObj){
            console.error("search object doesnt exist");
            return;
        }
        searchObj.revisits++ ;
    }
    searchResponded(id){

        let searchObj = this.__searchObjectFor(id);
        if (!searchObj){
            console.error("search object doesnt exist");
            return;
        }
        searchObj.responses++ ;
    }
    searchDiscarded(id){
        let searchObj = this.__searchObjectFor(id);
        if (!searchObj){
            console.error("search object doesnt exist");
            return;
        }
        searchObj.discarded++ ;
    }

    __searchObjectFor(id){
       for (let search of this.searches){
          if (search.id ===id){
              return search;
          }
        }
       return undefined;
    }

    printStats(){
        return JSON.stringify(this.searches);
    }
}

let stats = new Stats();

module.exports = stats;

var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

var roadGraph = buildGraph(roads);

var VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.pickedup = true;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  pickupChange() {
    this.pickedup = !this.pickedup
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      //console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    //console.log("action: ", action);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

var mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

function improvedGoalOrientedRobot(state, route) {
  let parcel;
  if (route.length == 0) {
    state.pickupChange();

    let min = 999999;

    if(!state.pickedup) {
      state.parcels.forEach(parc => {
        if(parc.place == state.place) {
          state.pickupChange();
          parcel = parc
          route = findRoute(roadGraph, state.place, parcel.address);
        } else {
          tempRoute = findRoute(roadGraph, state.place, parc.place);
          if(tempRoute.length < min) {
            min = tempRoute.length;
            route = tempRoute;
            parcel = parc
          }
        }
      });
    } else {
        route = findRoute(roadGraph, state.place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

function compareRobots(robot1, memory1, robot2, memory2) {
  // Your code here
  let turns2 = 0, turns1 = 0;
  for (let i = 0; i < 100; i++) {
    const villageState = VillageState.random();
    turns1 += runRobot(villageState, robot1, memory1);
    turns2 += runRobot(villageState, robot2, memory2);
  }
  console.log(`Robot 1: ${turns1/100} turns`);
  console.log(`Robot 2: ${turns2/100} turns`);
}

compareRobots(goalOrientedRobot, [], improvedGoalOrientedRobot, []);
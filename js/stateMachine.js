const stateUpdate = new Event("stateUpdate");
const STATES = {
  LIST: 0,
  INFO: 1,
  MENU: 2,
};

let state = {
    state: STATES.LIST,
    filter: [],
    prevState: 0,
    prevZoom: 0,
    prevCenter: 0,
    url: "",
    activeLocation: 0,
  }

let stateMachine = {
  go: () => {
    document.body.dispatchEvent(stateUpdate, state);
    switch (state.state) {
      case STATES.LIST:
        document.body.dataset.state = "list";
        break;
      case STATES.INFO:
        document.body.dataset.state = "info";
        break;
      case STATES.MENU:
        document.body.dataset.state = "menu";
        break;
      default:
        document.body.dataset.state = "list";
    }
  },
  setState: (newState) => {
    console.log(newState);
    state.state = newState;
    stateMachine.go();
  }
};

// function goToLocation() {
//   let params = new URL(document.location).searchParams;
//   let id = params.get("id");
//   if (id) {
//     showLocation(id, "pageLoad");
//   } else {
//     setState("list");
//   }
// }

// if(event !== "pageLoad" || event !== "reRender"){
//   const url = new URL(window.location);
//   // url.searchParams.set('id', id);
//   // window.history.pushState({}, '', url);
// }

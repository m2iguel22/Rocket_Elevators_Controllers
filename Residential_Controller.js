//RESIDENTIAL CONTROLLER JAVAS_SCRIPT//

// class init {
//     constructor(nbFloor, nbColumn, nbElevator){
//         this.nbFloor = nbFloor;
//         this.nbColumn = nbColumn;
//         this.nbElevator = nbElevator;

//                 init = new init (10, 1, 2);        
//     }

// }

class Elevator {
    constructor(nbOfFloor, nbOfElevator) {
        this.door = "Closed"
        this.currentFloor = 1
        this.status = "Idle"
        this.direction;
        this.floorList = []
        this.insideButtonList = []
        this.number = nbOfElevator
        for (let i = 1; i <= this.nbOfFloor; i++) {
            this.insideButtonList.push(new insideButton(i))
        }
    }

    requestFloor(nbOfFloor, elevator) {
        this.activateInsideButton(nbOfFloor);
        this.addFloorList(nbOfFloor);
        this.moveToRequestedFloor(elevator);
        // console.log("Elevator constructor");
    }

    moveToRequestedFloor() {
        let floorList = this.floorList
        let floorNumber = floorList.shift();

        if (this.currentFloor > floorNumber) {
            this.moveDown(floorNumber);
        } else if (this.currentFloor < floorNumber) {
            this.moveUp(floorNumber);
        } else {
            this.OpenDoor();
        }

    }


    moveDown() {


    }
}
class InsideButton {
    constructor(floor) {
        this.nbOfFloor = floor
        this.activateInsideButton = false;
    }

    toggleActive() {
        this.activateInsideButton = !this.activateInsideButton
    }


}
class Column {

    constructor(nbOfFloor, nbOfElevator) {
        this.state = "Active"
        this.elevatorList = this.initElevator(nbOfElevator)
        this.outsideButtonsList = this.initOutsideButtons(nbOfFloor)
        // this.initElevator();
        // this.nbOfFloor = nbOfFloor;
        // this.requestElevator = requestElevator;

    }


    initOutsideButtons(nbOfFloor) {
        let buttons = []
        let i = 1
        while (i <= nbOfFloor) {
            if (i != nbOfFloor) buttons.push({
                floor: i,
                direction: "UP",
                requestElevator: () => this.requestElevator(i, "UP"),
                active: false
            })
            if (i != 1) buttons.push({
                floor: i,
                direction: "DOWN",
                requestElevator: () => this.requestElevator(i, "DOWN"),
                active: false
            });
            i++
        }

        return buttons
    }

    requestElevator(requestedFloor, direction) {
        let bestElevator = this.findBestElevator(direction, requestedFloor)
        // this.activateOutsideButton(requestedFloor, direction)
        // this.addOutsideButtonList(requestedFloor)
        return 1
    }

    findBestElevator(direction, floor) {
        let elevator = this.BestElevator(direction, floor)
        return elevator
    }

    BestElevator(direction, floor) {
        let bestMovingElevator;
        let bestMovingTravel;
        let bestIdleElevator;
        let bestIdleTravel;
        let bestOtherElevator;
        let bestOtherTravel;

        for 

        return 0
    }

    initElevator(nbOfElevator) {
        let elevators = [];

        for (let i = 1; i < nbOfElevator; i++) {
            elevators.push(new Elevator(i))
        }

        return elevators
    }


    movingElevator(direction, floor) {

        let set1 = new set(elevator[moving]);
    }


}
console.log("test miguel");
let column = new Column(10, 2);
column.requestElevator(4, "UP");
console.log("Column", column);
console.log("Column.elevatorList", column.elevatorList);
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
    constructor(id, nbOfFloor) {
        this.nbOfFloor = nbOfFloor
        this.id = id
        this.door = "Closed"
        this.currentFloor = 1
        this.status = "Idle" //Idle, Moving, Stop
        this.direction; //UP, DOWN
        this.floorList = []
        this.insideButtonList = []
        // this.number = nbOfElevator
        for (let i = 1; i <= this.nbOfFloor; i++) {
            this.insideButtonList.push(new InsideButton(i))
        }

    }

    activateInsideButton(floor) {

        console.log("activateInsideButton", floor);

        let current_button = null;
        for (let button of this.insideButtonList) {
            if (floor == button.floor) {
                current_button = button;
            }
        }

        this.toggleActive(current_button)
        console.log("current_button", current_button);

    }


    toggleActive(button) {

        button.active = !button.active

    }


    addFloorToFloorList(floor) {
        console.log("requestFloor");
        // this.activateInsideButton(floor);
        this.floorList.push(floor);
        debugger
        this.moveToRequestedFloor();
        // console.log("OUF");
    }

    moveToRequestedFloor() {
        let floorList = this.floorList
        let floorNumber = floorList.shift();

        debugger

        if (this.currentFloor > floorNumber) {
            this.moveDown(floorNumber);
        } else if (this.currentFloor < floorNumber) {
            this.moveUp(floorNumber);
        } else {
            this.openDoor();
        }
    }


    
    //    addFloorList(floor){
        //        floorList = this.floorList.push(floor)
        //        console.log("addFloorList" , this.floorList)
        //    }
        moveDown(floorNumber) {
        while (floorNumber != this.currentFloor) {
            debugger
            console.log('the elevator number ' + this.id + ' is going down!')
            console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)
            debugger
            this.currentFloor = this.currentFloor - 1
        }
        console.log('the elevator number ' + this.id + ' is going down!')
        
        console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)
        console.log(this.currentFloor, "YEEEAAAHHHH");
        this.openDoor()
    }
    
    moveUp() {
        while (floorNumber != this.currentFloor) {
            debugger
            console.log('the elevator number ' + this.id + ' is going up!')
            console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)
            debugger
            this.currentFloor = this.currentFloor + 1
        }
        console.log('the elevator number ' + this.id + ' is going up!')
        
        console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)
        console.log(this.currentFloor, "YEEEAAAHHHH");
        this.openDoor()
    }


    openDoor() {
        this.door = "opened"
        console.log("open door")
        console.log("door state: " + this.door)
    }
}


class InsideButton {
    constructor(floor) {
        this.floor = floor
        this.active = false;
    }

    toggleActive() {
        this.active = !this.active
    }


}
class Column {

    constructor(nbOfFloor, nbOfElevator) {
        this.state = "Active"
        this.elevatorList = this.initElevator(nbOfElevator, nbOfFloor)
        this.outsideButtonsList = this.initOutsideButtons(nbOfFloor)
        // this.outSideDisplay() 
        // this.initElevator();
        // this.nbOfFloor = nbOfFloor;
        // this.requestElevator = requestElevator;

    }

    initElevator(nbOfElevator, nbOfFloor) {
        let elevator = [];

        for (let i = 1; i <= nbOfElevator; i++) {
            elevator.push(new Elevator(i, nbOfFloor))
        }

        return elevator
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


    outsideDisplay() {
        for (let i = 0; i < this.elevators; i++) {
            console.log(i.floor);
        }
    }


    requestElevator(requestedFloor, direction) {
        let bestElevator = this.findBestElevator(requestedFloor, direction)
        bestElevator.addFloorToFloorList(requestedfloor)
        debugger
        this.activateOutsideButton(requestedFloor, direction)
        //this.outsideButtonList(requestedFloor)

    }

    activateOutsideButton(requestedfloor, direction) {
        let currentButton =
            console.log("activate outside button")
    }

    findBestElevator(requestedFloor, direction) {
        console.log(requestedFloor, direction);
        let elevator = this.bestElevator(requestedFloor, direction)
        debugger
        return elevator
    }

    bestElevator(requestedFloor, direction) {
        debugger
        console.log(requestedFloor, direction);

        console.log("bestElevator");
        console.log("direction", direction)
        console.log("loor", requestedFloor)

        let bestMovingElevator = null;
        let bestMovingTravel = null;
        let bestIdleElevator = null;
        let bestIdleTravel = null;
        let bestOtherElevator = null;
        let bestOtherTravel = null;
        // let bestElevator = null;
        for (let elevator of this.elevatorList) {

            let travel = this.getTravel(elevator, requestedFloor);
            console.log("travel", travel);
            console.log("current elevator id", elevator.id);
            console.log("current elevator direction", elevator.direction);

            if ((elevator.status == "Moving" && bestMovingTravel == null) || (travel <= bestMovingTravel && elevator.direction == direction)) {
                console.log("1");
                bestMovingTravel = travel
                bestMovingElevator = elevator
            } else if (elevator.status == "Idle" && (bestIdleTravel == null || travel <= bestIdleTravel)) {
                console.log("2");
                bestIdleTravel = travel
                bestIdleElevator = elevator
            } else if (bestMovingTravel == null || travel <= bestMovingTravel) {
                console.log("3");
                bestOtherTravel = travel
                bestOtherElevator = elevator
            }

        }

        if (bestMovingElevator) {
            console.log("bestMOvingElevator", bestMovingElevator.id);
            bestMovingElevator.floorList.push(requestedFloor);
            bestMovingElevator.moveToRequestedFloor()

        } else if (bestIdleElevator) {
            bestIdleElevator.floorList.push(requestedFloor);
            console.log("bestIdleElevator", bestIdleElevator.id);
        } else if (bestOtherElevator) {
            bestOtherElevator.floorList.push(requestedFloor);
            console.log("bestOtherElevator", bestOtherElevator.id);
        }

        if (bestMovingElevator) {
            return bestMovingElevator
        } else if (bestIdleElevator) {
            return bestIdleElevator
        } else if (bestOtherElevator) {
            return bestOtherElevator
        }


    }

    getTravel(elevator, requestedfloor) {
        return Math.abs(elevator.currentFloor - requestedfloor)
    }

    movingElevator(requestedFloor, direction) {

        // let set1 = new set(elevator[moving]);
    }

} // fin 

function requestFloor(id, floor) {
    let elevatorItem;
    column.elevatorList.forEach(function (elevator) {
        if (elevator.id == id) elevator.addFloorToFloorList(floor)
    })
}



console.log("test miguel");
let column = new Column(10, 2);
//column.requestElevator(4, "UP");
//console.log("Column", column);
//console.log("Column.elevatorList", column.elevatorList);

column.elevatorList[0].currentFloor = 8;
column.elevatorList[0].status = "Idle"
column.elevatorList[1].currentFloor = 3;
column.elevatorList[1].status = "Moving"

let test_elevator = new Elevator(1, 10);
// requestFloor(test_elevator, 1);

//column.bestElevator("up", 2);
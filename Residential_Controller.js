class Elevator {
    constructor(id, nbOfFloor) {
        this.nbOfFloor = nbOfFloor
        this.id = id
        this.door = "Closed"
        this.currentFloor = 1
        this.status = "Idle" //Idle, Moving, Stop
        this.direction = null; //UP, DOWN
        this.floorList = []
        this.insideButtonList = []
        // this.number = nbOfElevator

        for (let i = 1; i <= this.nbOfFloor; i++) {
            this.insideButtonList.push(new InsideButton(i))
        }

    }

    activateInsideButton(floor) {

        // console.log("activateInsideButton", floor);

        let current_button = null;
        for (let button of this.insideButtonList) {

            if (floor == button.floor) {

            }
        }

        // console.log("current_button", current_button);

    }




    requestFloor(floor) {
        this.addFloorToFloorList(floor);
        this.activateInsideButton(floor)
        this.moveToRequestedFloor();
    }

    addFloorToFloorList(floor) {
        this.floorList.push(floor);
    }

    moveToRequestedFloor() {
        let floorList = this.floorList
        let floorNumber = floorList.shift();



        if (this.currentFloor > floorNumber) {
            this.moveDown(floorNumber);
        } else if (this.currentFloor < floorNumber) {
            this.moveUp(floorNumber);
        } else {
            this.openDoor();
        }

    }

    moveDown(floorNumber) {
        while (floorNumber != this.currentFloor) {
            this.currentFloor = this.currentFloor - 1
            console.log('the elevator number ' + this.id + ' is going down!')
            console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)

        }


        // console.log('the elevator number ' + this.id + ' is going down!')

        // console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)
        // console.log(this.currentFloor, "YEEEAAAHHHH");
        this.openDoor()
        this.closeDoor()
    }

    moveUp(floorNumber) {
        while (floorNumber != this.currentFloor) {

            console.log('the elevator number ' + this.id + ' is going up!')
            console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)

            this.currentFloor = this.currentFloor + 1
        }
        console.log('the elevator number ' + this.id + ' is going up!')

        console.log('the elevator number ' + this.id + ' is at floor number ' + this.currentFloor)
        // console.log(this.currentFloor, "YEEEAAAHHHH");
        this.openDoor()
        this.closeDoor()

    }


    openDoor() {
        this.door = "opened"
        console.log("open door")
        console.log("door state: " + this.door)

    }
    closeDoor() {
        this.door = "closed"
        console.log("close door")
        console.log("door state: " + this.door)

    }
}


class InsideButton {
    constructor(floor) {
        this.floor = floor
        this.active = false;
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
        bestElevator.addFloorToFloorList(requestedFloor)
        bestElevator.moveToRequestedFloor()
        this.activateOutsideButton(requestedFloor, direction)
        //this.outsideButtonList(requestedFloor)

        return bestElevator
    }

    activateOutsideButton(requestedFloor, direction) {
        // let currentButton = 
        // console.log("activate outside button")
    }

    findBestElevator(requestedFloor, direction) {
        console.log(requestedFloor, direction);
        let elevator = this.bestElevator(requestedFloor, direction)
        return elevator
    }

    bestElevator(requestedFloor, direction) {
        console.log(requestedFloor, direction);

        console.log("bestElevator");
        console.log("direction", direction)
        console.log("floor", requestedFloor)

        let bestMovingElevator = null;
        let bestMovingTravel = null;
        let bestIdleElevator = null;
        let bestIdleTravel = null;
        let bestOtherElevator = null;
        let bestOtherTravel = null;
        // let bestElevator = null;
        for (let elevator of this.elevatorList) {

            let travel = this.getTravel(elevator, requestedFloor);
            // console.log("travel", travel);
            console.log("current elevator id", elevator.id);
            console.log("current elevator direction", elevator.direction);

            if ((elevator.status == "moving" && bestMovingTravel == null) || (travel <= bestMovingTravel && elevator.direction == direction)) {

                if ((elevator.direction == "down" && elevator.currentFloor > requestedFloor) || (elevator.direction == "up" && elevator.currentFloor < requestedFloor)) {
                    // console.log("1");
                    bestMovingTravel = travel
                    bestMovingElevator = elevator
                } else if (bestOtherTravel == null || travel <= bestOtherTravel) {
                    // console.log("3");
                    bestOtherTravel = travel
                    bestOtherElevator = elevator
                }



            } else if (elevator.status == "Idle" && (bestIdleTravel == null || travel <= bestIdleTravel)) {
                // console.log("2");
                bestIdleTravel = travel
                bestIdleElevator = elevator
            }

        }

        if (bestMovingElevator) {
            return bestMovingElevator
        } else if (bestIdleElevator) {
            return bestIdleElevator
        } else if (bestOtherElevator) {
            return bestOtherElevator
        }


    }

    getTravel(elevator, requestedFloor) {
        return Math.abs(elevator.currentFloor - requestedFloor)
    }

} // fin 

function requestFloor(elevator, floor) {
    // let elevatorItem;
    // column.elevatorList.forEach(function (elevator) {
    //     if (elevator.id == id) elevator.addFloorToFloorList(floor)
    // })
    elevator.requestFloor(floor);
}



// console.log("test miguel");

let column_test_1 = new Column(10, 2);

column_test_1.elevatorList[0].currentFloor = 9;
column_test_1.elevatorList[0].status = "moving"
column_test_1.elevatorList[0].direction = "up"
column_test_1.elevatorList[1].currentFloor = 4;
column_test_1.elevatorList[1].status = "Idle"
column_test_1.elevatorList[1].direction = "down"

let chosen_elevator = column_test_1.requestElevator(8, "up")

// console.log("chosen_elevator", chosen_elevator);

// let column_test_2 = new Column(10, 2);

// column_test_2.elevatorList[0].currentFloor = 1;
// column_test_2.elevatorList[0].status = "Idle"
// column_test_2.elevatorList[0].direction = "up"
// column_test_2.elevatorList[1].currentFloor = 3;
// column_test_2.elevatorList[1].status = "Idle"
// column_test_2.elevatorList[1].direction = "down"

// let chosen_elevator2 = column_test_2.requestElevator(4, "down")
// console.log("chosen_elevator2", chosen_elevator2);

// let column_test_3 = new Column(10, 2);

// column_test_3.elevatorList[0].currentFloor = 4;
// column_test_3.elevatorList[0].status = "Idle"
// column_test_3.elevatorList[0].direction = "up"
// column_test_3.elevatorList[1].currentFloor = 5;
// column_test_3.elevatorList[1].status = "Idle"
// column_test_3.elevatorList[1].direction = "up"

// let chosen_elevator3 = column_test_3.requestElevator(2, "up")
// console.log("chosen_elevator3", chosen_elevator3);


console.log(" REQUEST FLOOR TEST****************************************");

//  let test_elevator = new Elevator()
// test_elevator.currentFloor = 5;
requestFloor(chosen_elevator, 1);
console.log("SERGE", chosen_elevator.currentFloor);
console.log(" END REQUEST FLOOR TEST****************************************");

// column.bestElevator("up", 2);


// console.log(" REQUEST FLOOR TEST1****************************************");
// let test1_elevator = new Elevator(1, 10);
// test1_elevator.currentFloor = 7;
// requestFloor(test1_elevator, 1);
// console.log(" END REQUEST FLOOR TEST1****************************************");


// console.log(" REQUEST FLOOR TEST2****************************************");
// let test2_elevator = new Elevator(1, 10);
// test2_elevator.currentFloor = 9;
// requestFloor(test2_elevator, 5);
// console.log(" END REQUEST FLOOR TEST2****************************************");
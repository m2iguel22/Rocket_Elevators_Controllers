package main

import (
	"fmt"
	"math"
	"sort"
	"strconv"
)

// "container/list"

func main() {
	b := newController(85, 4, 5).battery

	fmt.Println("begin")

	// e1 := b.columnList[0].elevatorList[0]
	b.columnList[2].elevatorList[0].currentFloor = 34
	b.columnList[2].elevatorList[0].status = "moving"
	b.columnList[2].elevatorList[0].direction = "down"
	b.columnList[2].elevatorList[0].requestFloorList = append(b.columnList[0].elevatorList[0].requestFloorList, 4)

	b.columnList[2].elevatorList[1].currentFloor = 50
	b.columnList[2].elevatorList[1].status = "moving"
	b.columnList[2].elevatorList[1].direction = "up"
	b.columnList[2].elevatorList[1].requestFloorList = append(b.columnList[0].elevatorList[1].requestFloorList, 54)

	b.columnList[2].elevatorList[2].currentFloor = 20
	b.columnList[2].elevatorList[2].status = "moving"
	b.columnList[2].elevatorList[2].direction = "up"
	b.columnList[2].elevatorList[2].requestFloorList = append(b.columnList[0].elevatorList[2].requestFloorList, 27)

	b.columnList[2].elevatorList[3].currentFloor = 1
	b.columnList[2].elevatorList[3].status = "moving"
	b.columnList[2].elevatorList[3].direction = "up"
	b.columnList[2].elevatorList[3].requestFloorList = append(b.columnList[0].elevatorList[3].requestFloorList, 54)

	b.columnList[2].elevatorList[4].currentFloor = 64
	b.columnList[2].elevatorList[4].status = "moving"
	b.columnList[2].elevatorList[4].direction = "down"
	b.columnList[2].elevatorList[4].requestFloorList = append(b.columnList[0].elevatorList[4].requestFloorList, 1)

	a := b.RequestElevator(54, "down", 54)
	a.moveToRequestedFloor(54)

	println("Best Elevator " + strconv.Itoa(a.id))

}

// Controller for all control //
type Controller struct {
	numberOfFloors, numberOfElevators, numberOfColumns int
	battery                                            Battery
}

func newController(numberOfFloors, numberOfColumns, numberOfElevators int) *Controller {
	c := new(Controller)
	c.numberOfFloors = numberOfFloors
	c.numberOfColumns = numberOfColumns
	c.numberOfElevators = numberOfElevators

	c.battery = *newBattery(numberOfColumns, numberOfElevators, numberOfFloors)

	return c

}

// Battery control all column //
type Battery struct {
	numberOfFloors, numberOfElevators, numberOfColumns int
	columnList                                         []Column
}

func newBattery(numberOfColumns, numberOfElevators, numberOfFloors int) *Battery {
	c := new(Battery)
	c.numberOfFloors = numberOfFloors
	c.numberOfElevators = numberOfElevators
	c.numberOfColumns = numberOfColumns

	for i := 1; i <= numberOfColumns; i++ {

		column := newColumn(i, 5, 85)
		c.columnList = append(c.columnList, column)
	}

	return c
}

// RequestElevator is Choosen in the column //
func (b *Battery) RequestElevator(requestedFloor int, direction string, target int) Elevator {

	bestColumn := b.findColumn(target)
	bestElevator := bestColumn.findBestElevator(requestedFloor, direction)

	bestElevator.moveToRequestedFloor(requestedFloor)

	return bestElevator
}

func (e *Elevator) moveToRequestedFloor(requestedFloor int) {
	e.requestFloorList = append(e.requestFloorList, requestedFloor)

	if e.direction == "up" {
		sort.Ints(e.requestFloorList)
	} else if e.direction == "down" {
		sort.Sort(sort.IntSlice(e.requestFloorList))
	}
	for len(e.requestFloorList) > 0 {
		if e.requestFloorList[0] == e.currentFloor {
			e.openDoor()
			e.requestFloorList = e.requestFloorList[1:]
		} else if e.requestFloorList[0] < e.currentFloor {
			e.moveDown()
		} else if e.requestFloorList[0] > e.currentFloor {
			e.moveUp()
		}
	}
}

func (b *Battery) findColumn(requestedFloor int) Column {

	if requestedFloor >= 2 && requestedFloor <= 22 {
		return b.columnList[0]
	} else if requestedFloor >= 23 && requestedFloor <= 43 {
		return b.columnList[1]
	} else if requestedFloor >= 43 && requestedFloor <= 64 {
		return b.columnList[2]
	} else {
		return b.columnList[3]
	}

}

// Column control Elevator //
type Column struct {
	id, numberOfElevator, numberOfFLoor int
	elevatorList                        []Elevator
	requestElevatorList                 []Button
}

func newColumn(aID, aNumberOfElevator, aNumberOfFloor int) Column {
	c := new(Column)
	c.numberOfFLoor = aNumberOfFloor
	c.id = aID
	c.numberOfElevator = aNumberOfElevator

	for i := 1; i <= aNumberOfElevator; i++ {

		elevator := newElevator(i, 85)
		c.elevatorList = append(c.elevatorList, *elevator)
	}

	return *c
}

func (e *Column) findBestElevator(requestedFloor int, direction string) Elevator {

	println("Best Elevator")
	println("Elevator " + direction)
	println("Elevator " + strconv.Itoa(requestedFloor))

	dummyElevator := new(Elevator)
	dummyElevator.currentFloor = -1

	bestMovingElevator := *dummyElevator
	bestMovingTravel := 10000
	bestIdleElevator := *dummyElevator
	bestIdleTravel := 10000
	bestOtherElevator := e.elevatorList[0]
	bestOtherTravel := 0

	for i := 0; i < len(e.elevatorList); i++ {

		travel := getTravel(e.elevatorList[i].currentFloor, requestedFloor)

		if (e.elevatorList[i].status == "moving" && travel <= bestMovingTravel) {
			if (e.elevatorList[i].direction == "down" && e.elevatorList[i].currentFloor > requestedFloor) || (e.elevatorList[i].direction == "up" && e.elevatorList[i].currentFloor <= requestedFloor) {
				bestMovingTravel = travel
				bestMovingElevator = e.elevatorList[i]
				fmt.Println("best elevator" + strconv.Itoa(bestMovingElevator.id))

			}
		} else if e.elevatorList[i].status == "idle" && travel <= bestIdleTravel {
			bestIdleTravel = travel
			bestIdleElevator = e.elevatorList[i]
			fmt.Println("best elevator" + strconv.Itoa(bestIdleElevator.id))
			// return bestIdleElevator
		} else if travel <= bestOtherTravel {
			bestOtherTravel = travel
			bestOtherElevator = e.elevatorList[i]
			fmt.Println("best elevator" + strconv.Itoa(bestOtherElevator.id))
			// return bestOtherElevator
		}
	}

	if bestMovingElevator.currentFloor != -1 {
		return bestMovingElevator

	} else if bestIdleElevator.currentFloor != -1 {
		return bestIdleElevator

	} else {

		return bestOtherElevator
	}

}

func getTravel(currentFloor, requestedFloor int) int {
	return int(math.Abs(float64(currentFloor) - float64(requestedFloor)))
}

// Elevator control floorList //
type Elevator struct {
	id, numberOfFloor, currentFloor int
	status, direction, door         string
	requestFloorList                []int
}

func newElevator(aID, aNumberOfFloor int) *Elevator {
	e := new(Elevator)
	e.numberOfFloor = aNumberOfFloor
	e.id = aID
	e.status = "idle"
	e.direction = "up"
	e.door = "close"
	e.currentFloor = 1

	e.requestFloorList = append(e.requestFloorList)

	return e

}

// Button init //
type Button struct {
	initIntsideButtons, initOutsideButtons int
}

func (e *Elevator) moveUp() {
	e.currentFloor = e.currentFloor + 1
	println("Elevator " + strconv.Itoa(e.id) + " is going up " + strconv.Itoa(e.currentFloor))
	println("Elevator " + strconv.Itoa(e.id) + " is at floor number" + strconv.Itoa(e.currentFloor))
}

func (e *Elevator) moveDown() {
	e.currentFloor = e.currentFloor - 1
	println("Elevator " + strconv.Itoa(e.id) + " is going down " + strconv.Itoa(e.currentFloor))
	println("Elevator " + strconv.Itoa(e.id) + " is at floor number" + strconv.Itoa(e.currentFloor))
}

func (e *Elevator) openDoor() {
	e.door = "opened"

	println("open door")
}
func (e *Elevator) closeDoor() {
	e.door = "closed"

	println("close door")

}

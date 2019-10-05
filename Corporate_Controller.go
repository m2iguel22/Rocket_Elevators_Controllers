package main

import (
	// "fmt"
	"math"
	"sort"
	"time"
)

// "container/list"

func main() {
	b := newController(85, 4, 5).battery

	// e1 := b.columnList[1].elevatorList[0]
	// e1.currentFloor = 22
	// e1.status = "moving";
	// e1.direction = "down";
	// e1.requestFloorList = append(e1.requestFloorList ,5);

	// e2 := b.columnList[1].elevatorList[1]
	// e2.currentFloor = 3
	// e2.status = "moving";
	// e2.direction = "up";
	// e2.requestFloorList = append(e2.requestFloorList ,15);

	// e3 := b.columnList[1].elevatorList[1]
	// e3.currentFloor = 13
	// e3.status = "moving";
	// e3.direction = "down";
	// e3.requestFloorList = append(e3.requestFloorList ,1);

	// e4 := b.columnList[1].elevatorList[1]
	// e4.currentFloor = 15
	// e4.status = "moving";
	// e4.direction = "down";
	// e4.requestFloorList = append(e1.requestFloorList ,2);

	// e5 := b.columnList[1].elevatorList[1]
	// e5.currentFloor = 6
	// e5.status = "moving";
	// e5.direction = "up";
	// e5.requestFloorList = append(e1.requestFloorList ,1);

	b.RequestElevator(1, "up")
	// .moveToRequestedFloor(20)
	
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
columnList                                                     []Column
}

func newBattery(numberOfColumns, numberOfElevators, numberOfFloors int) *Battery {
	c := new(Battery)
	c.numberOfFloors = numberOfFloors
	c.numberOfElevators = numberOfElevators
	c.numberOfColumns = numberOfColumns
	id := 1
	
	for i := 1; i < numberOfColumns; i++ {
		id++
		
		column := newColumn(id-1, 5, 85)
		c.columnList = append(c.columnList, column)
	}
	
	return c
}

// RequestElevator is Choosen in the column //
func (b *Battery) RequestElevator(numberOfFLoors int, direction string) Elevator  {

	bestColumn := b.findColumn(numberOfFLoors)
	bestElevator := bestColumn.findBestElevator(numberOfFLoors, direction)

	 bestElevator.moveToRequestedFloor(numberOfFLoors)

	 return bestElevator
}

func (e *Elevator) moveToRequestedFloor(requestedFloor int) {
	e.requestFloorList = append(e.requestFloorList, requestedFloor)
	time.Sleep(250)
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
				} else if requestedFloor >= 64 && requestedFloor <= 85 {
					return b.columnList[3]
				}
				return b.columnList[0]
			}
			
			// Column control Elevator //
			type Column struct {
				id, numberOfElevator, numberOfFLoor int
				elevatorList                                    []Elevator
				requestElevatorList                             []Button
			}
			
			func newColumn(aID, aNumberOfElevator, aNumberOfFloor int) Column {
				c := new(Column)
				c.numberOfFLoor = aNumberOfFloor
				c.id = aID
				id := 1
				
				for i := 1; i < aNumberOfElevator; i++ {
					id++
					
					elevator := newElevator(id-1, 85)
					c.elevatorList = append(c.elevatorList, *elevator)
				}
				
				
				return *c
			}
			
			func (e *Column) findBestElevator(requestedFloor int, direction string) Elevator {
				
				bestMovingElevator := e.elevatorList[0]
				bestMovingTravel := 10000
				bestIdleElevator := e.elevatorList[0]
				bestIdleTravel := 10000
				bestOtherElevator := e.elevatorList[0]
				bestOtherTravel := 0

	for i := 0; i < len(e.elevatorList); i++ {
		travel := getTravel(e.elevatorList[i].id, requestedFloor)
		if e.elevatorList[i].status == "moving" && travel <= bestMovingTravel && e.elevatorList[i].direction == direction {
			if e.elevatorList[i].direction == "down" && e.elevatorList[i].currentFloor > requestedFloor || e.elevatorList[i].direction == "up" && e.elevatorList[i].currentFloor <= requestedFloor {
				bestMovingTravel = travel
				bestMovingElevator = e.elevatorList[i]
				return bestMovingElevator
			} else if e.elevatorList[i].status == "idle" && travel <= bestIdleTravel {
				bestIdleTravel = travel
				bestIdleElevator = e.elevatorList[i]
				return bestIdleElevator
			} else if travel <= bestOtherTravel {
				bestOtherTravel = travel
				bestOtherElevator = e.elevatorList[i]
				return bestOtherElevator
			}
		}
	}
	
	return bestOtherElevator
}

func getTravel(Elevator, requestedFloor int) int {
	return int(math.Abs(float64(Elevator) - float64(requestedFloor)))
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

	e.requestFloorList = append(e.requestFloorList)
	
	return e

}

// Button init //
type Button struct {
	initIntsideButtons, initOutsideButtons int
}

func (e *Elevator) moveUp() {
	e.currentFloor = e.currentFloor + 1
}
func (e *Elevator) moveDown() {
	e.currentFloor = e.currentFloor - 1
}
func (e *Elevator) openDoor() {
	e.door = "opened"
}
func (e *Elevator) closeDoor() {
	e.door = "closed"
	
}

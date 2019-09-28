import time 



class Elevator():

    def __init__(self, elevatorName, nbOfFloor):
        self.elevatorName = elevatorName
        self.nbOfFloor = nbOfFloor
        self.door = "closed"
        self.currentFloor = 1 
        self.status = "idle"
        self.direction = None
        self.floorList = []
        self.insideButtonList = []

        for i in range (1,self.nbOfFloor):
            self.insideButtonList.append(InsideButton(i))


    def requestFloor(self, floor ):
        self.addFloorToFloorList(floor)       
        self.moveToRequestedFloor()
             

    def moveToRequestedFloor(self,):
        floorList = self.floorList
        floorNumber = floorList.append()

        if (self.currentFloor > floorNumber):
            self.moveDown(floorNumber)
        elif(self.currentFloor < floorNumber):
            self.moveUp(floorNumber)
        else:
            self.openDoor()
        print("hello")

    def moveDown(self,floorNumber):

        while floorNumber != self.currentFloor:
            self.currentFloor = self.currentFloor -1  
            print("the elevator number" + self.elevatorName + "is going down")  
            print("the elevator number" + self.elevatorName + "is at floor number" + self.currentFloor)  

    def moveUp(self, floorNumber):

        while floorNumber != self.currentFloor: 
            self.currentFloor = self.currentFloor + 1 

            print("the elevator number" + self.elevatorName + " is going up!")
            print("the elevator number " + self.elevatorName + ' is at floor number ' + self.currentFloor)
            print('the elevator number ' + self.elevatorName + ' is going up!')
            print('the elevator number ' + self.elevatorName + ' is at floor number ' + self.currentFloor)
            self.openDoor()
            self.closeDoor()
    def addFloorToFloorList(self, floor):
            self.floorList.append(floor)

    def openDoor(self):
            self.door = "opened"
            print("open door")
            print("door state: " + self.door)

    def closeDoor(self):
            self.door = "closed"
            print("close door")
            print("door state: " + self.door)

    

class InsideButton():

    def _init_(self, floor):
            self.floor = floor
            self.active = None

    def toggleActive(self):
            self.active = not self.active

class Column():

    def _init_(self, nbOfFloor, nbOfElevator):
            self.state = "Active"
            self.elevatorList = self.initElevator(nbOfElevator, nbOfFloor)
            self.outsideButtonsList = self.initOutsideButtons(nbOfFloor)

    def initElevator(self, nbOfElevator, nbOfFloor):
        elevator = []

        for i in range (1, nbOfElevator):
            elevator.append(nbOfFloor(i))

            return elevator
    def initOutsideButtons(self, nbOfFloor) :
        buttons = []
        i = 1
        while i <= nbOfFloor: 
            if i != nbOfFloor: 
                buttons.append({
                    "floor" :i,
                    "direction": "UP",
                    "requestElevator": self.requestElevator(i, "UP"),
                    "active": False
                })
            elif i != 1:
                buttons.append({
                    'floor': i,
                    'direction': "DOWN",
                    'requestElevator': self.requestElevator(i, "DOWN"),
                    'active': False
                })
            i = i + 1

        return buttons


    def requestElevator(self, requestedFloor, direction):
        bestElevator = self.findbestElevator(requestedFloor, direction)
        bestElevator.addFloorToFloorList(requestedFloor)
        bestElevator.moveToRequestedFloor()
       
        return bestElevator
     

    def findbestElevator(self, requestedFloor, direction):
        elevator = self.bestElevator(requestedFloor, direction)

        return elevator


    def bestElevator(self, requestedFloor, direction):
        print("bestElevator")
        print("direction", direction)
        print("floor", requestedFloor)

        bestMovingElevator = None
        bestMovingTravel = None
        bestIdleElevator = None
        bestIdleTravel = None
        bestOtherElevator = None
        bestOtherTravel = None


        for elevator in self.elevatorList:

            travel = self.getTravel(elevator, requestedFloor)
            print("current elevator id", elevator.id)
            print("current elevator direction", elevator.direction)

            if elevator.direction == "moving" and bestMovingTravel == None or travel <= bestMovingTravel and elevator.direction == direction : 
                if elevator.direction == "down" and elevator.currentFloor > requestedFloor or elevator.direction and elevator.currentFloor < requestedFloor : 
                    bestMovingTravel = travel 
                    bestMovingElevator = elevator 
                    if bestOtherTravel == None or travel <= bestOtherTravel:
                        bestOtherTravel = travel
                        bestOtherElevator = elevator 

                        if elevator.status == "idle" and bestIdleTravel == None or travel <= bestIdleTravel:
                           bestIdleTravel = travel  
                           bestIdleElevator = elevator

                           if bestMovingElevator:
                               return bestMovingElevator
                           elif bestIdleElevator:
                               return bestIdleElevator
                           elif bestOtherElevator:
                               return bestOtherElevator

       

    def getTravel(self, elevator, requestedFloor):

        return abs(elevator.currentFloor - requestedFloor)

    def requestFloor(self, elevator, floor):
        elevator.requestFloor(floor)
        
  
    def chosenElevator(self, chosenElevator):

        print("==============")
         

        column_test_1 = Column(10, 2)

        column_test_1.elevatorList[0].currentFloor = 9
        column_test_1.elevatorList[0].status = "moving"
        column_test_1.elevatorList[0].direction = "up"
        column_test_1.elevatorList[1].currentFloor = 4
        column_test_1.elevatorList[1].status = "Idle"
        column_test_1.elevatorList[1].direction = "down"

        chosenElevator = column_test_1.requestElevator(8, "up")
               

         

                
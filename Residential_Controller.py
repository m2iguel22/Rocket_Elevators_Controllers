class Elevator:
    
    def __init__(self, elevatorName, nbOfFloor):
        self.elevatorName = elevatorName
        self.nbOfFloor = nbOfFloor
        self.door = "closed"
        self.currentFloor = 1 
        self.status = "idle"
        self.direction = "up"
        self.floorList = []
        self.insideButtonList = []
        
        for i in range (0,self.nbOfFloor):
            self.insideButtonList.append(InsideButton(i))

    def requestFloor(self, floor):
        self.addFloorToFloorList(floor)    
        self.moveToRequestedFloor(floor)
            
    def addFloorToFloorList(self, floor):
        self.floorList.append(floor)
        # floorNumber = floorList.append()

    def moveToRequestedFloor(self, floor):
        floorList = self.floorList
        floorNumber = floorList.pop()
    # print("salut")
        if self.currentFloor == floorNumber:
            self.openDoor()
            self.closeDoor()
        elif self.currentFloor > floorNumber:
            self.moveDown(floorNumber)
            self.openDoor()
            self.closeDoor()
        elif self.currentFloor < floorNumber:
            self.moveUp(floorNumber)
            self.openDoor()
            self.closeDoor()

    
    def moveDown(self,floorNumber):  
        while floorNumber != self.currentFloor:
            self.currentFloor = self.currentFloor -1  
            print("the elevator number" + str(self.elevatorName) + " is going down")
            print("the elevator number" + str(self.elevatorName) + " is at floor number" + str(self.currentFloor))


    def moveUp(self, floorNumber):
    
        while floorNumber != self.currentFloor: 
            self.currentFloor = self.currentFloor + 1 

            print("the elevator number" + str(self.elevatorName) + " is going up!")
            print("the elevator number" + str(self.elevatorName) + ' is at floor number ' + str(self.currentFloor))

    def openDoor(self):
        self.door = "opened"
        print("open door")


    def closeDoor(self):
        self.door = "closed"
        print("close door")
        self.status = "idle"
        self.direction = None

      

    

class InsideButton:

    def __init__(self, floor):
        self.floor = floor
        self.active = False

    def toggleActive(self):
        self.active = not self.active






class Column:

    def __init__(self, nbOfFloor, nbOfElevator):
            self.state = "Active"
            self.elevatorList = self.initElevator(nbOfElevator, nbOfFloor)
            self.outsideButtonsList = self.initOutsideButtons(nbOfFloor)

    def initElevator(self, nbOfElevator, nbOfFloor):
        elevator = []
        for i in range (0, nbOfElevator):
            elevator.append(Elevator(i, nbOfFloor))

        return elevator

    def initOutsideButtons(self, nbOfFloor):
        buttons = []
        i = 1
        while i <= nbOfFloor: 
            if i != nbOfFloor: 
                buttons.append({
                    "floor" :i,
                    "direction": "up",
                    
                    "active": False
                })
            elif i != 1:
                buttons.append({
                    'floor': i,
                    'direction': "down",
                    
                    'active': False
                })
            i = i + 1

        return buttons

    def requestElevator(self, requestedFloor, direction):
        bestElevator = self.findbestElevator(requestedFloor, direction)        
        bestElevator.requestFloor(requestedFloor)
        return bestElevator

        
    def findbestElevator(self, requestedFloor, direction):
        elevator = self.bestElevator(requestedFloor, direction)
        return elevator

    def bestElevator(self, requestedFloor, direction):
        bestMovingElevator = None
        bestIdleElevator = None
        bestOtherElevator = None
        bestMovingTravel = 11111111
        bestOtherTravel = 11111111
        bestIdleTravel = 11111111


        for elevator in self.elevatorList:
            travel = self.getTravel(elevator, requestedFloor)
            
            if elevator.status == 'moving' and travel <= bestMovingTravel and elevator.direction == direction: 
               
                if (elevator.direction == 'down' and elevator.currentFloor > requestedFloor) or (elevator.direction == 'up' and elevator.currentFloor <= requestedFloor):  
                    bestMovingTravel = travel 
                    bestMovingElevator = elevator 

            
            elif elevator.status == 'idle' and travel <= bestIdleTravel:                           
                bestIdleTravel = travel  
                bestIdleElevator = elevator

            elif travel <= bestOtherTravel: 
                bestOtherTravel = travel
                bestOtherElevator = elevator 

        if bestMovingElevator != None:
            print("--------------------------1-------------------------------------")
            return bestMovingElevator
        elif bestIdleElevator != None:
            print("------------------------------------2---------------------------")
            return bestIdleElevator
        elif bestOtherElevator!= None:
            print("------------------------------------3---------------------------")
            return bestOtherElevator

    def getTravel(self, elevator, requestedFloor):
        # print(str(abs(elevator.currentFloor - requestedFloor)))
        return abs(elevator.currentFloor - requestedFloor)

    def requestFloor(self, elevator, floor):
        elevator.requestFloor(floor)

    def chosenElevator(self, chosenElevator):
        print("==============")


column_test_1 = Column(10, 2)

column_test_1.elevatorList[0].currentFloor = 10
column_test_1.elevatorList[0].status = "idle"
column_test_1.elevatorList[0].direction = None

column_test_1.elevatorList[1].currentFloor = 3
column_test_1.elevatorList[1].status = "moving"
column_test_1.elevatorList[1].direction = "up"

elevator1 = column_test_1.elevatorList[1]
print("elevator2 :" + str(elevator1.status))

elevator0 = column_test_1.requestElevator(3, "down")
elevator0.requestFloor(2)
print("elevator1 :" + str(elevator0.status))

elevator1.requestFloor(6)

elevator3 = column_test_1.requestElevator(10, "down")
elevator3.requestFloor(3)
print("elevator2 :" + str(elevator1.status))




# print("elevator 1 = " + str(column_test_1.elevatorList[0])) 


print("elevator 2 = " + str(column_test_1.elevatorList[1].currentFloor)) 

# chosenElevator = column_test_1.requestElevator(8, "up")

# requestFloor(chosenElevator, 1)        
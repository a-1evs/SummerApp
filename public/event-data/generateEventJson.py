import csv
import json
 
# src\json\csv_to_json.py
# Function to convert a CSV to JSON
# Takes the file paths as arguments
def make_json(csvFilePath, jsonFilePath):
    
    # Open CSV of Events
    csvf = open(csvFilePath, encoding='utf-8')
    rawCsv= csv.DictReader(csvf)    
    rawEventsList = [event for event in rawCsv]
    # Clean up data
    eventsList = []
    for rawEvent in rawEventsList:
        event = {}

        event["Day"] = rawEvent['\ufeff"Event Day"']
        event["Name"] = rawEvent["Event Name"]
        
        staff_list_raw =  rawEvent["Staff Names"].split('\n')
        staff_list = []
        for item in staff_list_raw:
            # removes ghost submissions
            if len(item) < len('First Name: , Last Name:'):
                continue
            name = item.split(': ')[1].split(',')[0] + ' ' + item.split(': ')[2]
            staff_list.append(name)
        event["Staff"] = staff_list
        event["Type"] = rawEvent["Event Type"]
        event["Location"] =  rawEvent["Location"]
        event["Description"] = rawEvent['Event Description']       

        if event["Name"] != '':
            eventsList.append(event)
    print(eventsList)
    
    # Add Time Blocks to for each day of the week
    jsonf = open('app/event-data/timeBlocks.json')
    dailyTimeBlockDict = json.load(jsonf)
    masterEventDict = {"Sunday": {}, "Monday":{}, "Tuesday":{}, "Wednesday":{}, "Thursday":{}, "Friday":{}, "Saturday":{},}
    for day in masterEventDict:
        if day in dailyTimeBlockDict.keys():
            timeBlocks = {timeBlock:[] for timeBlock in dailyTimeBlockDict[day]}
            masterEventDict[day] = timeBlocks
        else:
            timeBlocks = {timeBlock:[] for timeBlock in dailyTimeBlockDict['Default']}
            masterEventDict[day] = timeBlocks


   # Add each event from eventsList to its respective day/time slot:
    for event in eventsList:
        eventDay = event["Day"]
        timeBlocks = [*masterEventDict[eventDay]]
        eventNotInDict = True
        for i in range(len(timeBlocks)):
            timeBlock = timeBlocks[i]
            if len(masterEventDict[eventDay][timeBlock]) < 2:
                masterEventDict[eventDay][timeBlock].append(event)
                eventNotInDict = False
                break
        
        if eventNotInDict:
            raise Exception("Too Many Events!")


    print(masterEventDict)
       
           
       

        
    # Open a json writer, and use the json.dumps() 
    # function to dump data
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(masterEventDict, indent=4))
         
# Driver Code
 
# Decide the two file paths according to your 
# computer system

csvFilePath = f'app/event-data/events-raw.csv'
jsonFilePath = r'app/event-data/events-final.json'
 
# Call the make_json function
make_json(csvFilePath, jsonFilePath)
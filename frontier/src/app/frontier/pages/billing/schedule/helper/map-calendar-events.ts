export const mapCalendarEvents = (events) => {
    return events.map((iterateMockEvent) => {
        let parsedDate = new Date(iterateMockEvent.earliestStartTime)
        let mappedEvent = {
            ...iterateMockEvent,
            id: iterateMockEvent.scheduleId.toString(),
            start: parsedDate
        }
        return mappedEvent;
    })
}
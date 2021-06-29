export const mapCalendarEvents = (events) => {
    return events.map((mapEvent) => {
        let parsedDate = new Date(mapEvent.earliestStartTime)
        let mappedEvent = {
            ...mapEvent,
            id: mapEvent.scheduleId.toString(),
            start: parsedDate
        }
        return mappedEvent;
    })
}
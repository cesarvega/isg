import * as moment from 'moment';
export const mapCalendarEvents = (events) => {
    return events.map((mapEvent) => {
        let parsedDate = new Date(mapEvent.earliestStartTime)
        let latestStartTime = new Date(mapEvent.latestStartTime)
        let latestStartTitle = moment(mapEvent.latestStartTime).format('LT')
        let mappedEvent = {
            ...mapEvent,
            id: mapEvent.scheduleId.toString(),
            start: parsedDate,
            end: latestStartTime,
            title: latestStartTitle
        }
        return mappedEvent;
    })
}
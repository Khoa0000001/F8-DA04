/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';

function timeAgo(inputDate: any) {
    const now = moment();
    const date = moment(inputDate);
    const duration = moment.duration(now.diff(date));

    if (duration.asSeconds() < 60) {
        return 'Học cách đây vài giây trước';
    } else if (duration.asMinutes() < 60) {
        const minutes = Math.floor(duration.asMinutes());
        return `Học cách đây ${minutes} phút trước`;
    } else if (duration.asHours() < 24) {
        const hours = Math.floor(duration.asHours());
        return `Học cách đây ${hours} giờ trước`;
    } else if (duration.asDays() < 30) {
        const days = Math.floor(duration.asDays());
        return `Học cách đây ${days} ngày trước`;
    } else if (duration.asMonths() < 12) {
        const months = Math.floor(duration.asMonths());
        return `Học cách đây ${months} tháng trước`;
    } else {
        const years = Math.floor(duration.asYears());
        return `Học cách đây ${years} năm trước`;
    }
}

export default timeAgo;

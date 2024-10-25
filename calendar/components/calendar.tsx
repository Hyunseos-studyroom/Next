import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'; // moment 라이브러리 import

export default function BirthCalendar() {
    const [value, setValue] = useState<Date | null>(new Date());

    const handleChange = (newValue: Date | Date[] | null) => {
        setValue(newValue as Date | null); // Date | null로 강제 변환
    };

    return (
        <div>
            <Calendar onChange={handleChange} value={value} />
            <div className="text-gray-500 mt-4">
                {value ? moment(value).format("YYYY년 MM월 DD일") : "날짜를 선택하세요."}
            </div>
        </div>
    );
}

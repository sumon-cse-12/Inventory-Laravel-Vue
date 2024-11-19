const getYears = (startYear) => {
    let currentYear = new Date().getFullYear();
    let years = [];

    for (let index = startYear; index <= currentYear; index++) {
        years.push(startYear++);
    }
    return years;
}

const getMonths = () => {
    const months = Array.from({length: 12}, (item, i) =>{
        return new Date(0, i).toLocaleString('en-US', {month: 'long'})
    });
    return months;
}

export {
    getYears,
    getMonths
}

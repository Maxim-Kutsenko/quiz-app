export const options = {
    categorys: [
        { id: 10, value: 'Entertainment: Books' },
        { id: 11, value: 'Entertainment: Film' },
        { id: 12, value: 'Entertainment: Music' },
        { id: 13, value: 'Entertainment: Musicals &amp; Theatres' },
        { id: 14, value: 'Entertainment: Television' },
        { id: 15, value: 'Entertainment: Video Games' },
        { id: 16, value: 'Entertainment: Board Games' },
        { id: 17, value: 'Science &amp; Nature' },
        { id: 18, value: 'Science: Computers' },
        { id: 19, value: 'Science: Mathematics' },
        { id: 20, value: 'Mythology' },
        { id: 21, value: 'Sports' },
        { id: 22, value: 'Geography' },
        { id: 23, value: 'History' },
        { id: 24, value: 'Politics' },
        { id: 25, value: 'Art' },
        { id: 26, value: 'Celebrities' },
        { id: 27, value: 'Animals' },
        { id: 28, value: 'Vehicles' },
        { id: 29, value: 'Entertainment: Comics' },
        { id: 30, value: 'Science: Gadgets' },
    ],
    amout: [5, 10, 15, 20],
    difficulty: [
        { key: 'any', value: 'Any Difficulty' },
        { key: 'easy', value: 'Easy' },
        { key: 'medium', value: 'Medium' },
        { key: 'hard', value: 'Hard' },
    ]


}


export function findValue(value) {
    let result = null
    const temp = options.categorys.find((item, index) => {
        if (item.id === value) {
            result = item.value
        }
    })
    return result
}

const address = process.env.NODE_ENV === 'development' ? 'localhost:5151' : '71.12.154.75:5151';

module.exports = {
    leagues:  {
        ESL: {
            id: 'esl',
            name: 'Elite: Sim League (E:SL)',
            address,
        },
        LOCAL: {
            id: 'local',
            name: 'Local Test Database',
            address,
        }
    }
}
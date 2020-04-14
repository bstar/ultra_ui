const address = process.env.address || 'localhost:5151';

module.exports = {
    leagues:  {
        ESL: {
            id: 'esl',
            name: 'Elite: Sim League (E:SL)',
            address,
            // address: '71.12.154.75:5151',
        },
        LOCAL: {
            id: 'local',
            name: 'Local Test Database',
            address,
        }
    }
}
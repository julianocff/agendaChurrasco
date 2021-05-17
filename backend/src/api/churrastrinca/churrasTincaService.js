const ChurrasTrinca = require('./churrasTrinca')

ChurrasTrinca.methods(['get', 'post', 'put', 'delete'])
ChurrasTrinca.updateOptions({ new: true, runValidators: true })

module.exports = ChurrasTrinca
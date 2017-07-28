import bcrypt from 'bcryptjs'

const SALT_WORK_FACTOR = 10

export function encryption (_password, callback) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      console.log(err)
      return
    }
    bcrypt.hash(_password, salt, (err, hash) => {
      if (err) {
        console.log(err)
        return
      }
      callback(hash)
    })
  })
}

export function compareEncrypt (_password, hash, callback) {
  bcrypt.compare(_password, hash, (err, res) => {
    if (err) {
      console.log(err)
      return
    }
    callback(res)
  })
}

const moduleMock = jest.genMockFromModule('nodemailer')

export const sendMock = jest.fn().mockImplementation((options, callback) => {
  if (options.to === 'error') {
    callback(new Error('Send error'))
  } else {
    callback(null, { info: true })
  }
})

moduleMock['createTransport'].mockImplementation(() => {
  return {
    sendMail: sendMock
  }
})

export default moduleMock

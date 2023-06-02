import * as aws from '@aws-sdk/client-ses'
import nodemailer from 'nodemailer'

import { NodemailerEngine } from '../src'
import { sendMock } from './__mocks__/nodemailer'

describe('NodemailerEngine', (): void => {
  it('It uses smtp by default', async (): Promise<void> => {
    const engine = new NodemailerEngine({ options: { host: 'yes' } })

    expect(nodemailer.createTransport).toHaveBeenCalledWith({ host: 'yes' })
  })

  it('sends emails combining the extra send options', async (): Promise<void> => {
    const engine = new NodemailerEngine({ options: { host: 'yes' } })

    await engine.send({ to: 'me', extra: { attachments: [] } })

    expect(sendMock).toHaveBeenCalledWith({ attachments: [], to: 'me', extra: { attachments: [] } }, expect.any(Function))
  })

  it('throws if nodemailer callback returns an error', async (): Promise<void> => {
    const engine = new NodemailerEngine({ options: { host: 'yes' } })
    let error: Error

    try {
      await engine.send({ to: 'error', extra: { attachments: [] } })
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('Send error')
  })

  it('creates a special transporter for ses', async (): Promise<void> => {
    const engine = new NodemailerEngine({ transport: 'ses', options: { apiVersion: '2010-12-01', region: 'us-east-1' } })

    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({ SES: { ses: expect.any(aws.SES), aws } }))
  })
})

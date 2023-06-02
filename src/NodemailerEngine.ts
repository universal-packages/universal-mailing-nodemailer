import { EngineInterface, SendOptions } from '@universal-packages/mailing'
import nodemailer, { Transporter } from 'nodemailer'

import { NodemailerEngineOptions } from './NodemailerEngine.types'

export default class NodemailerEngine implements EngineInterface {
  public readonly options: NodemailerEngineOptions

  private transporter: Transporter

  public constructor(options?: NodemailerEngineOptions) {
    this.options = { transport: 'smtp', options: {}, ...options }

    if (this.options.transport === 'smtp') {
      this.transporter = nodemailer.createTransport(this.options.options)
    } else {
      const aws = require('@aws-sdk/client-ses')
      const { defaultProvider } = require('@aws-sdk/credential-provider-node')

      const ses = new aws.SES({
        apiVersion: this.options.options['apiVersion'],
        region: this.options.options['apiVersion'],
        credentialDefaultProvider: defaultProvider
      })

      this.transporter = nodemailer.createTransport({ SES: { ses, aws } })
    }
  }

  public async send(options: SendOptions): Promise<void> {
    return new Promise((resolve, reject): void => {
      const finalOptions = { ...options, ...options.extra }

      this.transporter.sendMail(finalOptions, (error, info) => {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    })
  }
}

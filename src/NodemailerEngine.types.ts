import SMTPTransport from 'nodemailer/lib/smtp-transport'

export interface NodemailerEngineOptions {
  transport?: 'smtp' | 'ses'
  options?: NodemailerEngineOptionsTransportOptions
}

export interface NodemailerEngineOptionsTransportOptions extends SMTPTransport.Options, Record<string, any> {}

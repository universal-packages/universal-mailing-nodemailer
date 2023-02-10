# Mailing Nodemailer

[![npm version](https://badge.fury.io/js/@universal-packages%2Fmailing-nodemailer.svg)](https://www.npmjs.com/package/@universal-packages/mailing-nodemailer)
[![Testing](https://github.com/universal-packages/universal-mailing-nodemailer/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-mailing-nodemailer/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-mailing-nodemailer/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-mailing-nodemailer)

Nodemailer engine for universal mailing-nodemailer.

## Install

```shell
npm install @universal-packages/mailing-nodemailer

# If using SES
npm install @aws-sdk/client-ses
npm install @aws-sdk/credential-provider-node
```

## NodemailerEngine

```js
import { Mailing } from '@universal-packages/mailing-nodemailer'
import { NodemailerEngine } from '@universal-packages/mailing-nodemailer'

const mailing = new Mailing( engine: 'nodemailer', engineOptions: { transport: 'smtp', options: { host: 'smtp.com'} })

await mailing.prepare()

mailing.send({ subject: 'Email', extra: { headers: { HEADER: 'header' }}, from: 'universal@dev.com', to: 'david@packages.com', template: 'templates/email', locals: { name: 'Omar' } })
```

### Options

- **`transport`** `smtp | ses` `default: smtp`
  Use `smtp` to all kind of configurations or `ses` to automatically set it up and just pass options rafted to ses.
- **`options`** `Object`
  All configurations available for [transports](https://nodemailer.com/smtp/).

  SES options:

  - **`apiVersion`** `String`
  - **`region`** `String`

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).

# Superfaktura NodeJS API client

[![npm](https://img.shields.io/npm/v/superfaktura)](https://img.shields.io/npm/v/superfaktura)
[![ci](https://github.com/m4x1m1l14n/superfaktura/actions/workflows/ci.yml/badge.svg)](https://github.com/m4x1m1l14n/superfaktura/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/m4x1m1l14n/superfaktura/branch/devel/graph/badge.svg?token=S8YX8SOKK1)](https://codecov.io/gh/m4x1m1l14n/superfaktura)
![GitHub issues](https://img.shields.io/github/issues/m4x1m1l14n/superfaktura)

Massive WiP

## Testing

**Run tests always against sand-boxed development environment instead of production!!!**

To successfully run tests, you need to add `.env` file into `test` folder and that file needs to contain environment variables to successfully authenticate to server.

Following environment variables are required

### SF_EMAIL

E-mail which is registered for your superfaktura account

### SF_API_URI

API URI you want to use for testing purposes. By default sandbox at `https://sandbox.superfaktura.sk` is used.

### SF_API_KEY

API key that was generated to access to API with your account.

### SF_COMPANY_ID

ID of company you want to use.

Resulting `.env` file should look like this

```
SF_EMAIL = john.doe@gmail.com
SF_API_URI = https://sandbox.superfaktura.sk
SF_API_KEY = xyZxyZxyZxyZxyZxyZxyZxyZxyZxyZxyZxyZ
SF_COMPANY_ID = 11

```

## Remarks

### Bank accounts
* When listing bank accounts and no bank account exists, server returns error instead of empty bank accounts set. Not best practice IMHO, because empty result should not be considered error.
* Missing API call to get bank account by its ID?
* Is it OK that server supports addition of same bank account multiple times?
* error flag in response to delete account is string instead of number
* Why BankAccount in response to bank account update is wrapped in "message" key?

[superfaktura](../docs.md) / Client

# Class: Client

## Table of contents

### Constructors

- [constructor](Client.md#constructor)

### Properties

- [httpClient](Client.md#httpclient)

### Methods

- [addBankAccount](Client.md#addbankaccount)
- [addBankAccounts](Client.md#addbankaccounts)
- [checkResponseDataThrowOnError](Client.md#checkresponsedatathrowonerror)
- [checkResponseThrowOnError](Client.md#checkresponsethrowonerror)
- [deleteAllBankAccounts](Client.md#deleteallbankaccounts)
- [deleteBankAccount](Client.md#deletebankaccount)
- [deleteBankAccounts](Client.md#deletebankaccounts)
- [getBankAccount](Client.md#getbankaccount)
- [getBankAccounts](Client.md#getbankaccounts)
- [updateBankAccount](Client.md#updatebankaccount)

## Constructors

### constructor

• **new Client**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ClientConfig`](../interfaces/ClientConfig.md) |

#### Defined in

[client.ts:21](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L21)

## Properties

### httpClient

• `Private` **httpClient**: `Axios`

#### Defined in

[client.ts:19](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L19)

## Methods

### addBankAccount

▸ **addBankAccount**(`bankAccount`): `Promise`<[`BankAccount`](../interfaces/BankAccount.md)\>

Add new bank account

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bankAccount` | `AddBankAccountRequestDto` | Bank account data to be added |

#### Returns

`Promise`<[`BankAccount`](../interfaces/BankAccount.md)\>

Created bank account object

#### Defined in

[client.ts:76](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L76)

___

### addBankAccounts

▸ **addBankAccounts**(`bankAccounts`): `Promise`<[`BankAccount`](../interfaces/BankAccount.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bankAccounts` | `AddBankAccountRequestDto`[] |

#### Returns

`Promise`<[`BankAccount`](../interfaces/BankAccount.md)[]\>

#### Defined in

[client.ts:102](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L102)

___

### checkResponseDataThrowOnError

▸ `Private` **checkResponseDataThrowOnError**(`data`): `void`

Gets detail of invoice by its ID

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[client.ts:226](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L226)

___

### checkResponseThrowOnError

▸ `Private` **checkResponseThrowOnError**(`response`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `AxiosResponse`<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[client.ts:243](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L243)

___

### deleteAllBankAccounts

▸ **deleteAllBankAccounts**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[client.ts:199](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L199)

___

### deleteBankAccount

▸ **deleteBankAccount**(`bankAccountID`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bankAccountID` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[client.ts:173](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L173)

___

### deleteBankAccounts

▸ **deleteBankAccounts**(`bankAccountIDs`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bankAccountIDs` | `number`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[client.ts:185](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L185)

___

### getBankAccount

▸ **getBankAccount**(`bankAccountID`): `Promise`<[`BankAccount`](../interfaces/BankAccount.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bankAccountID` | `number` |

#### Returns

`Promise`<[`BankAccount`](../interfaces/BankAccount.md)\>

#### Defined in

[client.ts:146](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L146)

___

### getBankAccounts

▸ **getBankAccounts**(): `Promise`<[`BankAccount`](../interfaces/BankAccount.md)[]\>

TODO Is it OK that BE returns error in case no bank account exists, instead of returning empty set?

#### Returns

`Promise`<[`BankAccount`](../interfaces/BankAccount.md)[]\>

#### Defined in

[client.ts:155](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L155)

___

### updateBankAccount

▸ **updateBankAccount**(`bankAccountID`, `bankAccount`): `Promise`<[`BankAccount`](../interfaces/BankAccount.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bankAccountID` | `number` |
| `bankAccount` | `AddBankAccountRequestDto` |

#### Returns

`Promise`<[`BankAccount`](../interfaces/BankAccount.md)\>

#### Defined in

[client.ts:118](https://github.com/m4x1m1l14n/superfaktura/blob/f4b1709/src/client.ts#L118)

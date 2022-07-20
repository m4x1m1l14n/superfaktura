import { Client } from '../src/index';

describe( 'Bank Accounts', () =>
{
	let client: Client;

	beforeAll( async () =>
	{
		client = new Client( {
			email: process.env.SF_EMAIL ?? '',
			apiUri: process.env.SF_API_URI ?? 'https://sandbox.superfaktura.sk',
			apiKey: process.env.SF_API_KEY ?? '',
			companyID: process.env.SF_COMPANY_ID ? parseInt( process.env.SF_COMPANY_ID ) : undefined
		} );

		await client.deleteAllBankAccounts();
	} );

	test( 'List empty bank accounts', async () =>
	{
		const promise = client.getBankAccounts();

		await expect( promise ).resolves.toStrictEqual( [] );
	} );

	test( 'Add bank account', async () =>
	{
		const name = 'MojaBanka';
		const iban = 'SK8975000000000012345671';
		const swift = 'GIBASKBX';

		const bankAccount = await client.addBankAccount( {
			'bank_name': name,
			iban,
			swift
		} );

		expect( bankAccount.bank_name ).toEqual( name );
		expect( bankAccount.iban ).toEqual( iban );
		expect( bankAccount.swift ).toEqual( swift );
	} );

	test( 'Update bank account', async () =>
	{
		const bankAccount = await client.addBankAccount( {
			'bank_name': 'MojaBanka2',
			iban: 'SK8975000000000012345672',
			swift: 'GIBASKBY'
		} );

		const name = 'NovaBanka';
		const iban = 'SK8975000000000012345673';
		const swift = 'GIBASKBZ';

		const updatedBankAccount = await client.updateBankAccount( bankAccount.id, {
			'bank_name': name,
			iban,
			swift
		} );

		expect( updatedBankAccount.bank_name ).toEqual( name );
		expect( updatedBankAccount.iban ).toEqual( iban );
		expect( updatedBankAccount.swift ).toEqual( swift );
	} );

	// test('Add existing bank account', async () =>
	// {
	// 	const promise = client.addBankAccount( {
	// 		bank_name: 'MojaBanka',
	// 		iban: 'SK8975000000000012345671',
	// 		swift: 'GIBASKBX'
	// 	} );

	// 	await expect( promise ).resolves.toThrow();
	// });

	test( 'Delete bank account', async () =>
	{
		const bankAccount = await client.addBankAccount( {
			'bank_name': 'BankaNaZmazanie',
			iban: 'SK8975000000000012345670',
			swift: 'GIBASKBA'
		} );

		const promise = client.deleteBankAccount( bankAccount.id );

		await expect( promise ).resolves.not.toThrow();
	} );

	test( 'Add bank account only with bank name', async () =>
	{
		const name = 'NajBanka';
		const account = await client.addBankAccount( {
			'bank_name': name
		} );

		expect( account.bank_name ).toEqual( name );
	} );

	test( 'Add bank account only with IBAN', async () =>
	{
		const iban = 'SK8975000000000012345672';
		const account = await client.addBankAccount( {
			iban
		} );

		expect( account.iban ).toEqual( iban );
	} );

	test( 'Add bank account only with SWIFT code', async () =>
	{
		const swift = 'GIBASKBX';
		const account = await client.addBankAccount( {
			swift
		} );

		expect( account.swift ).toEqual( swift );
	} );

	test( 'Add bank missing required fields', async () =>
	{
		const promise = client.addBankAccount( {} );

		await expect( promise ).rejects.toThrow();
	} );

	// test( 'Get bank account', () =>
	// {

	// } );

	test( 'Remove multiple bank accounts', async () =>
	{
		const bankAccounts = await client.addBankAccounts( [
			{
				'bank_name': 'Banka1'
			},
			{
				'bank_name': 'Banka2'
			},
			{
				'bank_name': 'Banka3'
			}
		] );

		const bankAccountIDs = bankAccounts.map( ( bankAccount ) => bankAccount.id );

		const promise = client.deleteBankAccounts( bankAccountIDs );

		await expect( promise ).resolves.not.toThrow();
	} );

	afterAll( async () =>
	{
		await client.deleteAllBankAccounts();
	} );
} );

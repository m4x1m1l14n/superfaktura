import axios, { Axios, AxiosResponse } from 'axios';

import { ClientConfig } from './models/ClientConfig';

import { BankAccount } from './models/BankAccount';

import { AddBankAccountRequestDto } from './dtos/BankAccounts/AddBankAccountRequestDto';
import { AddBankAccountResponseDto } from './dtos/BankAccounts/AddBankAccountResponseDto';

import * as String from './helpers/string';

import { GetBankAccountsResponseDto } from './dtos/BankAccounts/GetBankAccountsResponseDto';
import { DeleteBankAccountResponseDto } from './dtos/BankAccounts/DeleteBankAccountResponseDto';
import { UpdateBankAccountRequestDto } from './dtos/BankAccounts/UpdateBankAccountRequestDto';
import { UpdateBankAccountResponseDto } from './dtos/BankAccounts/UpdateBankAccountResponseDto';

export class Client
{
	private httpClient: Axios;

	constructor( private config : ClientConfig )
	{
		const { companyID, apiKey, apiUri, email } = config;

		const authorization: Record<string, string> =
		{
			email,
			apikey: apiKey,
			'company_id': companyID ? companyID.toString() : '',
			module: 'SuperfakturaJS'
		};

		const authorizationHeader = new URLSearchParams( authorization ).toString();

		const headers =
		{
			'Authorization': `SFAPI ${authorizationHeader}`,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		};

		this.httpClient = axios.create( {
			baseURL: apiUri,
			headers,
			validateStatus: ( /*status*/ ) =>
			{
				// Prevent axios from throwing exceptions on 400 error codes
				// as superfaktura BE returns error even when empty result is returned
				return true;
			}
		} );

		if ( config.debug )
		{
			this.httpClient.interceptors.request.use( ( request ) =>
			{
				console.log( 'Request', JSON.stringify( request, null, 2 ) );

				return request;
			} );

			this.httpClient.interceptors.response.use( ( response ) =>
			{
				console.log( 'Response', response );

				return response;
			} );
		}
	}

	public async addBankAccount( bankAccount: AddBankAccountRequestDto ): Promise<BankAccount>
	{
		if (
			String.isEmpty( bankAccount.bank_account )
			&& String.isEmpty( bankAccount.bank_name )
			&& String.isEmpty( bankAccount.iban )
			&& String.isEmpty( bankAccount.swift )
			&& String.isEmpty( bankAccount.bank_code )
		)
		{
			throw new Error( 'At least one of required properties must be set' );
		}

		const response = await this.httpClient.post<AddBankAccountResponseDto>(
			'/bank_accounts/add',
			`data=${JSON.stringify( bankAccount )}`
		);

		const { data } = response;

		this.checkResponseDataThrowOnError( data );
		this.checkResponseThrowOnError( response );

		return data.BankAccount;
	}

	public async addBankAccounts( bankAccounts: AddBankAccountRequestDto[] ): Promise<BankAccount[]>
	{
		const promises: Promise<BankAccount>[] = [];

		for ( const bankAccount of bankAccounts )
		{
			const promise = this.addBankAccount( bankAccount );

			promises.push( promise );
		}

		const result = await Promise.all( promises );

		return result;
	}

	public async updateBankAccount(
		bankAccountID: number,
		bankAccount: UpdateBankAccountRequestDto
	): Promise<BankAccount>
	{
		const response = await this.httpClient.post<UpdateBankAccountResponseDto>(
			`/bank_accounts/update/${bankAccountID}`,
			`data=${JSON.stringify( bankAccount )}`
		);

		const { data } = response;

		this.checkResponseDataThrowOnError( data );
		this.checkResponseThrowOnError( response );

		// NOTE
		//	This check if hack only because bank account update API returns bank account wrapped in 'message'
		//	field for unknown reasons for now
		const { message } = data;

		if ( typeof message === 'string' )
		{
			throw new Error( message );
		}

		return message.BankAccount;
	}

	public getBankAccount( bankAccountID: number ): Promise<BankAccount>
	{
		throw new Error( 'Not implemented yet' );
	}

	/**
	 * TODO Is it OK that BE returns error in case no bank account exists, instead of returning empty set?
	 * @returns 
	 */
	public async getBankAccounts(): Promise<BankAccount[]>
	{
		const response = await this.httpClient.get<GetBankAccountsResponseDto>( '/bank_accounts/index' );

		const { data } = response;

		//this.checkResponseDataThrowOnError( data );
		//this.checkResponseThrowOnError( response );

		const { BankAccounts } = data;

		const result: BankAccount[] = BankAccounts
			? BankAccounts.map( ( value ) => value.BankAccount )
			: [];

		return result;
	}

	public async deleteBankAccount( bankAccountID: number ): Promise<void>
	{
		const response = await this.httpClient.post<DeleteBankAccountResponseDto>(
			`/bank_accounts/delete/${bankAccountID}`
		);

		const { data } = response;

		this.checkResponseDataThrowOnError( data );
		this.checkResponseThrowOnError( response );
	}

	public async deleteBankAccounts( bankAccountIDs: number[] ): Promise<void>
	{
		const promises = [];

		for ( const bankAccountID of bankAccountIDs )
		{
			const promise = this.deleteBankAccount( bankAccountID );

			promises.push( promise );
		}

		await Promise.all( promises );
	}

	public async deleteAllBankAccounts(): Promise<void>
	{
		const bankAccounts = await this.getBankAccounts();

		const bankAccountIDs = [];
		for ( const bankAccount of bankAccounts )
		{
			bankAccountIDs.push( bankAccount.id );
		}

		await this.deleteBankAccounts( bankAccountIDs );
	}

	/**
	 * Gets detail of invoice by its ID
	 * 
	 * @param invoiceId ID of invoice
	 */
	// public async getInvoice( invoiceId : number ) : Promise<any>
	// {
	// 	const url = new URL( `/invoices/view/${invoiceId}.json`, this.config.apiUri );

	// 	const invoice = await this.requestAsync( url );

	// 	return invoice;
	// }

	private checkResponseDataThrowOnError( data: any ): void
	{
		const { error } = data;

		if ( error )
		{
			const isError = typeof data.error === 'string'
				? parseInt( data.error )
				: data.error;

			if ( isError )
			{
				throw new Error( data.error_message ?? data.message );
			}
		}
	}

	private checkResponseThrowOnError( response: AxiosResponse ): void
	{
		const { status } = response;

		if ( status >= 200 && status < 300 )
		{
			return;
		}

		const { statusText } = response;

		throw new Error( `HTTP request failed with status ${status} (${statusText})` );
	}
}

import { BankAccount } from '../../models/BankAccount';
import { DefaultResponseDto } from '../DefaultResponseDto';

export interface GetBankAccountsResponseDto
	extends DefaultResponseDto
{
	BankAccounts: {
		BankAccount: BankAccount;
	}[];
}

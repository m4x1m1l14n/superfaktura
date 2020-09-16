import { OutgoingHttpHeaders } from 'http';
import https from 'https';
import querystring from 'querystring';

const API_AUTH_KEYWORD = 'SFAPI';

export interface ClientConfig
{
	email: string,
	apiUri: string,
	apiKey: string,
	companyId: number
}

export class Client
{
	private additionalHeaders : OutgoingHttpHeaders;

	constructor( private config : ClientConfig )
	{
		this.additionalHeaders =
		{
			'Authorization': `${API_AUTH_KEYWORD} ${querystring.stringify( {
				email: this.config.email,
				apikey: this.config.apiKey,
				'company_id': this.config.companyId ?? '',
				module: 'SuperfakturaJS'
			} )}`
		};
	}

	private resolvePort( protocol: string ) : number
	{
		const ports = new Map<string, number>( [
			[ 'http', 80 ],
			[ 'https', 443 ]
		] );

		if ( !ports.has( protocol ) )
		{
			throw new Error( `Port for protocol '${protocol}' not found!` );
		}

		return ports.get( protocol );
	}

	private requestAsync( url: URL, data?: any ) : Promise<any>
	{
		return new Promise( ( resolve, reject ) =>
		{
			const options : https.RequestOptions =
			{
				hostname: url.hostname,
				path: url.pathname,
				port: url.port ?? this.resolvePort( url.protocol ),
				headers: this.additionalHeaders
			};

			const req = https.request( options, ( res ) =>
			{
				let data = '';

				res.on( 'error', ( error ) =>
				{
					reject( error );
				} );

				res.on( 'data', ( chunk ) =>
				{
					data += chunk;
				} );

				res.on( 'end', () =>
				{
					try
					{
						const json = JSON.parse( data );

						resolve( json );
					}
					catch ( error )
					{
						reject( error );
					}
				} );
			} );

			req.on( 'error', ( error ) =>
			{
				reject( error );
			} );

			if ( data )
			{
				req.write( `data=${JSON.stringify( data )}` );
			}

			req.end();
		} );
	}

	/**
	 * Gets detail of invoice by its ID
	 * 
	 * @param invoiceId ID of invoice
	 */
	public async getInvoice( invoiceId : number ) : Promise<any>
	{
		const url = new URL( `/invoices/view/${invoiceId}.json`, this.config.apiUri );

		const invoice = await this.requestAsync( url );

		return invoice;
	}
}

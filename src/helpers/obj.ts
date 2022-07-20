/**
 * Checks wether object has own peoperty or not
 * 
 * @param {Object} object Object to search for property 
 * @param {*} property Property name to search for
 */
export function hasProperty( object : any, property : string ) : boolean
{
	return Object.prototype.hasOwnProperty.call( object, property );
}

export function hasProperties( object: any, properties: string[] ): boolean
{
	return properties.every( ( property ) => hasProperty( object, property ) );
}

export function hasAtLeastNProperties( object: any, properties: string[], n: number ): boolean
{
	return properties.filter( ( property ) => hasProperty( object, property ) ).length === n;
}

export function hasAtLeastOneProperty( object: any, properties: string[] ): boolean
{
	return properties.some( ( property ) => hasProperty( object, property ) );
}

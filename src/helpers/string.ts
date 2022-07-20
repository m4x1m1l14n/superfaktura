/**
 * Returns wether string is empty
 * 
 * String is trimmed of whitespaces before check.
 * Null is also considered an empty string.
 * 
 * @param s String to check
 * 
 * @returns true when string empty, false otherwise
 */
export function isEmpty( s : string ) : boolean
{
	return ( typeof s === 'undefined' || s === null || s.trim().length === 0 );
}

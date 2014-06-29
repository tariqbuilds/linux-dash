<?php
namespace Modules;
class hostname extends \ld\Modules\Module
{
	protected $name = 'hostname';
	public function getData( $args = array( ) )
	{
		return php_uname( 'n' );
	}
}
?>

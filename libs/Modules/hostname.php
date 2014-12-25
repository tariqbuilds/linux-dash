<?php
namespace Modules;
class hostname extends \ld\Modules\Module
{
	protected $name = 'hostname';
	public function getData( $args = array( ) )
	{
		return array( 
			'Hostname' => php_uname( 'n' ) 
		);
	}
}
?>

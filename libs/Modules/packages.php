<?php
namespace Modules;
class packages extends \ld\Modules\Module
{
	protected $name = 'packages';
	public function getData( $args = array( ) )
	{
		$data = array();
		$out = array();
		$return_var = null;
		exec('/usr/bin/dpkg -l | grep ^ii | wc -l ', $out, $return_var);
		$data["installed"] = intval($out[0]);

		$out = array();
		$return_var = null;
		exec('/usr/bin/apt-get -s upgrade | grep ^Inst | wc -l', $out, $return_var);
		$data["upgradables"] = intval($out[0]);

		$out = array();
		$return_var = null;
		exec('grep -A 1 "^Upgrade:" /var/log/apt/history.log | tail -1', $out, $return_var);
		if (count($out) > 0)
		{
			$lastu = preg_split("/\s+/", $out[0]);
			$data["last"] = $lastu[1];
		} else {
			$data["last"] = "unknown";
		}


		return $data;
	}
}

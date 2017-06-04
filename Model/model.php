<?php
	class Connection
	{	
		protected $conn=null;

		function __construct()
		{
			$this -> $conn = oci_connect('Perfect', 'Place','localhost/XE');
	
			if(!$this->$conn)
		{
			$e = oci_error();
			trigger_error(htmlentities($e['message'],ENT_QUOTES),E_USER_ERROR);
		}		
		}
	
		function __destruct()
		{
			if($this->$conn)
				oci_close($conn);	
		}
	}

	$test = new Connection();
	
?>	
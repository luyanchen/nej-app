<?php
header("content-type:text/json;charset=utf-8");
$arr = array (
	'data'=> array(
		'code'=>'123456'
		),
	'code'=>200,
	'error'=>'系统繁忙中，请稍候重试'
); 
echo $_GET['callback']."(".json_encode($arr).")";


?>
<?php
// 报告详细的错误
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);

//从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
require_once 'mysql_connection_config.php';

//获取请求的数据 
$id = $_GET['id'];
$nick_name = $_GET['nick_name'];
$src = $_GET['src'];


// 连接数据库
$conn = mysqli_connect(host, user, password, database);
if(!$conn) {
    die("数据库连接失败!");
}

// 数据库连接成功
// mysqli_query($conn, "set names 'utf8'");
$sql = "select * from user where id = '{$id}'";

$res=mysqli_query($conn,$sql);

//如果查询结果的行数为 0 则，说明之前数据就不存在，需要把相关数据插入表中(初始 point为0）！
//echo mysqli_num_rows($res);
//echo $id;
if(mysqli_num_rows($res) == 0){
$sql = 'insert into user(id, nick_name, src, fan_num, role, timestamp)values(?,?,?,0,"-1",?)';
$stmt=mysqli_prepare($conn,$sql);
$time = time();
 mysqli_stmt_bind_param($stmt,'ssss', $id,$nick_name,$src,$time);

 mysqli_stmt_execute($stmt);

	if(mysqli_stmt_affected_rows($stmt)==1){
    	echo 0;
 	}else{
   	 echo -1;
 	}       
 }
   
//else {
//echo 'cunzai!!';
//}

//数据存在，不进行任何操作，关闭数据库的连接即可
mysqli_close($conn);

?>
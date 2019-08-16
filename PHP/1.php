<?php
// 报告详细的错误
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);

//从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
require_once 'mysql_connection_config.php';
$host = host;
$user =user;
$password = password;
$database = database;

//获取请求的数据 academic_id
$keyword = $_GET['keyword'];
    echo $keyword;

// 连接数据库
$conn = mysqli_connect($host, $user, $password, $database);
if(!$conn) {
    die("数据库连接失败!");
}

// 数据库连接成功
// mysqli_query($conn, "set names 'utf8'");
$sql = "select * from scenery where name like '%{$keyword}%'";
$res = mysqli_query($conn, $sql);
$arr = array();
if ( mysqli_num_rows($res) > 0) {
    while($row = mysqli_fetch_array($res)) {
        array_push($arr,$row); 	#多条记录就把它放入 数组中， “对象数组” 。
    }
}

//输出结果并关闭数据库的连接
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
mysqli_close($conn);
?>
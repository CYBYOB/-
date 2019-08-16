<?php

//报告详细的错误
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);

//载入 mysql 连接配置
require_once 'mysql_connection_config.php';

//获取前端传过来的参数 user_id
$keyword = $_GET['keyword'];
//    echo $keyword;
//echo json_encode(explode(',', $keyword), JSON_UNESCAPED_UNICODE);


//连接数据库
$conn = mysqli_connect(host, user, password, database);
if (!$conn) {
    die("数据库连接失败！");
}

//进行数据库的操作
//mysqli_query($conn, "set names 'utf8'");
$sql = "select * from scenery where name like '%{$keyword}%'";
$res = mysqli_query($conn, $sql);
$arr = array();
if (mysqli_num_rows($res) > 0) {
    while ($row = mysqli_fetch_array($res)) {
        array_push($arr, $row);
    }
}

//输出 操作mysql操作结果 并关闭 数据库的连接。
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
mysqli_close($conn);

?>
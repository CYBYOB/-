<?php
// 报告详细的错误
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);

//从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
require_once 'mysql_connection_config.php';

//获取请求的数据 
$id = $_GET['id'];
$role = $_GET['role'];
$tags = explode(',', $_GET['tags']) ;

//echo ($id.$role.$tags);
//echo json_encode($tags,JSON_UNESCAPED_UNICODE);;

// 连接数据库
$conn = mysqli_connect(host, user, password, database);
if(!$conn) {
    die("数据库连接失败!");
}

// 数据库连接成功
// mysqli_query($conn, "set names 'utf8'");
$sql = "update user set role='{$role}' where id='{$id}'";


if(mysqli_query($conn,$sql)){
    // 更新 role 成功，继续下面的操作
    // 清空之前存在的 所选标签
    if(!mysqli_query($conn, "delete from user_tag where user_id='{$id}'")){
        echo '清除历史tag失败！';
        return ;
    }
    foreach ($tags as $tag) {
        $sql = 'insert into user_tag(user_id, tag) value(?,?)';
        $stmt=mysqli_prepare($conn,$sql);
        mysqli_stmt_bind_param($stmt,'ss', $id,$tag);
        mysqli_stmt_execute($stmt);

        if(mysqli_stmt_affected_rows($stmt)!=1){
            echo '插入tag失败';
            return ;
        }
    }
}
else {
    echo '更新role失败';
}

// 全部操作成功！
echo 0;

// 关闭数据库连接
mysqli_close($conn);

?>
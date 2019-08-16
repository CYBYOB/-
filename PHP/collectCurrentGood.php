<?php
    // 报告详细的错误
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
    require_once 'mysql_connection_config.php';

    //获取请求的数据  user_id, good_id
    $user_id = $_GET['user_id'];
    $good_id = $_GET['good_id'];
    //echo  $user_id, $good_id;

    // 连接数据库
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("数据库连接失败!");
    }

    // 数据库连接成功,进行想要的操作并输出结果
    // mysqli_query($conn, "set names 'utf8'");
    $sql = "insert into collect(user_id, good_id, good_num) value('{$user_id}', 'good_id',1, 1)";

    if(!(mysqli_query($conn, $sql))) {    
    //数据插入不成功、也可能数据已经存在等
        echo -1;
    }   else {
        echo 0;
    }

    //关闭数据库的连接
    mysqli_close($conn);
?>
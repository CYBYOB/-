<?php
    // 报告详细的错误
    ini_set("display_errors", "On");
    error_reporting(E_ALL | E_STRICT);

    //从mysql连接配置文件中获取相关参数,方便后期维护，数据转移到别到服务器上
    require_once 'mysql_connection_config.php';

    //获取请求的数据 user_id
    $user_id = $_GET['user_id'];
    $type = $_GET['type'];
    $content = $_GET['content'];
    $phone = $_GET['phone'];
     
    //    echo $user_id;

    // 连接数据库
    $conn = mysqli_connect(host, user, password, database);
    if(!$conn) {
        die("数据库连接失败!");
    }

    // 数据库连接成功，预处理去插入，防止 sql注入 等安全问题！！
    // mysqli_query($conn, "set names 'utf8'");
    $sql = 'insert into feedback(user_id, type, content, phone, timestamp)values(?,?,?,?,?)';
    $stmt=mysqli_prepare($conn,$sql);          
    $time = time();
    mysqli_stmt_bind_param($stmt,'sssss', $user_id, $type, $content, $phone, $time);

    //执行插入的预处理 sql语句。
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt)==1){
        echo "insert success";
     }else{ 
         echo "insert fail";
     }      

    //关闭数据库的连接
    mysqli_close($conn);
?>
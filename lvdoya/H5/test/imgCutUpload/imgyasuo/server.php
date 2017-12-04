<?php
/**
 * @Author: mushu
 * @Date:   2016-06-02 14:27:13
 */

/*
参考代码
 */

$filename = $_POST['filename'];
$base64_content = $_POST['content'];
$filelen = $_POST['filelen'];
if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_content, $result)){
  $type = $result[2];
  $new_file = "./$filename.{$type}";
  if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_content)))){
     echo json_encode(array('status'=>1,'filename'=>$new_file));
  }else{
     echo json_encode(array('status'=>0));
  }
}else{
    echo json_encode(array('status'=>0));
}

<?php$mongo = new MongoClient();
$db=$mongo->local;
$collection=$db->help

if($_POST){
    $insert=array(
        "title"=>$_POST['anecName'],
        "descrition"=>$_POST['subject']
    );

if($collection->insert($insert))
{
    echo "data is inserted"
}
else{
    echo "some issue"
}
}
else{
    echo "no data to store"
}

?>

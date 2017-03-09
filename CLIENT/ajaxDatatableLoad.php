<?php

	$req_list = json_decode($_GET['req_list']);
	$url = $_GET['url'];
	$limit = isset($_GET['iDisplayLength']) ? $_GET['iDisplayLength'] : 20;
	$offest = isset($_GET['iDisplayStart']) ? $_GET['iDisplayStart'] : 0;
	$sort_col = isset($_GET['iSortCol_0']) ? $_GET['iSortCol_0'] : '';
	$sort_val = isset($_GET['sSortDir_0']) ? $_GET['sSortDir_0'] : 'asc';
	$id_link = isset($_GET['id_link']) ? $_GET['id_link'] : '';
	$sort_val = $sort_val == 'asc' ? 1 : -1;
	// $page = intval((intval($offest) * intval($limit)) / intval($limit)) == 0 ? 1 : intval((intval($offest) * intval($limit)) / intval($limit));
	$page = intval(intval($offest) / intval($limit)) + 1;

	$url .= '?limit=' . $limit . '&page=' . $page;

	if(!empty($sort_col)) {
		$url .= '&sort={"' . $req_list[$sort_col] . '":' . $sort_val .'}';
	}

	$ucfirst_arr = ['type'];

    $ch = curl_init();

    $header_arr = [];
    foreach ($request_header as $key => $header) {
        $header_arr[] = $key . ': ' . $header;
    }
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $url);

    // //POST vars
    // $post_data = [];
    // if (count($data) != 0) {
    //     $post_data = $data;
    //     if(gettype($data) == 'array') {

    //         foreach ($data as $key => $val) {
    //             $post_data[$key] = $val;
    //         }
    //     }
    // }

    // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 1);  //true to include header in output 
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header_arr);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //return data on success instead of true and false on failure of curl_exec
    //execute post
    $result = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $header = substr($result, 0, $header_size);
    $body = substr($result, $header_size);
    $headers = [];
    foreach (explode("\r\n", $header) as $i => $line) {
        $exploded_data = explode(': ', $line);

        if (isset($exploded_data[0]) && ($exploded_data[0] == 'accessToken' || $exploded_data[0] == 'access_token')) {
            $headers[$exploded_data[0]] = $exploded_data[1];
        }
    }
    curl_close($ch);
    $body = json_decode($body, true); 
    // echo $url;
    // exit;

    $aaData = [];
	$iTotalRecords = 0;
	$iTotalDisplayRecords = 0;
    if($body['status'] == 'success') {
    	$data_list = [];
    	foreach ($body['data'] as $data) {
    		$dt = [];
    		foreach ($req_list as $param) {
    			if($param == 'is_active') {
    				$dt[] = $data[$param] == 1 ? 'Active' : 'Inactive';
    			} else if(in_array($param, $ucfirst_arr)) {
    				$dt[] = ucfirst($data[$param]);
    			} else  if($param == 'unique_id') {
    				$link_dt = strtr($id_link, ['{id}' => $data[$param]]);
    				$dt[] = '<a href="' . $link_dt . '">' . $data[$param] . '</a>';
    			} else {
    				$dt[] = $data[$param];
    			}
    		}
    		$data_list[] = $dt;
    	}
		$aaData = $data_list;
		$iTotalRecords = $body['meta']['count'];
		$iTotalDisplayRecords = $body['meta']['count'];
    }
	echo json_encode([
        'aaData' => $aaData,
        "iTotalRecords" => $iTotalRecords,
        "iTotalDisplayRecords" => $iTotalRecords,
    ]);


    //close connection

?>
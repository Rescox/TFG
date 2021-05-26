<?php

function local_message_extend_navigation_course($navigation, $course, $coursecontext) {
    $url = new moodle_url('/admin/tool/devcourse/index.php');
    $devcoursenode = navigation_node::create('Development course', $url, navigation_node::TYPE_CUSTOM, 'Dev course', 'devcourse');
    $navigation->add_node($devcoursenode);
}

function local_message_before_footer() {
    global $DB, $USER, $COURSE;
    $sql = "SELECT lm.id, lm.messagetext, lm.messagetype 
            FROM {local_message} lm 
            left outer join {local_message_read} lmr ON lm.id = lmr.messageid 
            WHERE lmr.userid <> :userid 
            OR lmr.userid IS NULL";
    $params = [
        'userid' => $USER->id,
    ];

    /*$link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] 
         === 'on' ? "https" : "http") . "://" . 
        $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'];
        if($link == "http://localhost/moodle/course/view.php") { 
            $url = new moodle_url('/local/moophish/edit.php', array('id' => $USER->id, 'course' => $COURSE->id));
            echo "<h3><a href = " . $url;
            echo ">Phishing simulator</a></h3>";
        }*/
    $messages = $DB->get_records_sql($sql, $params);
    foreach ($messages as $message) {
        $type = \core\output\notification::NOTIFY_INFO;
        if ($message->messagetype === '0') {
            $type = \core\output\notification::NOTIFY_WARNING;
        }
        if ($message->messagetype === '1') {
            $type = \core\output\notification::NOTIFY_SUCCESS;
        }
        if ($message->messagetype === '2') {
            $type = \core\output\notification::NOTIFY_ERROR;
        }
        
        $readrecord = new stdClass();
        $readrecord->messageid = $message->id;
        $readrecord->userid = $USER->id;
        $readrecord->timeread = time();
        $DB->insert_record('local_moophish_read', $readrecord);
    }

}
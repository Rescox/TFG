<?php
// This file is part of Moodle Course Rollover Plugin
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.



require_once(__DIR__. '/../../config.php');
require_once($CFG->dirroot . '/local/moophish/classes/form/edit.php');


$PAGE->set_url(new moodle_url('/local/moophish/edit.php'));
$PAGE->set_context(\context_system::instance());
$PAGE->set_title('Edit');


//Aqui moostramos el formulario
$mform = new edit();

if ($mform->is_cancelled()) {
    redirect($CFG->wwwroot . '/local/moophish/manage.php', 'You cancelled the message form');
} else if ($fromform = $mform->get_data()) {

    //redirect($CFG->wwwroot . '/local/moophish/manage.php', 'You created a message with title ' . $fromform->campaignName);
    $campaignJson['name'] = $_REQUEST['campaignName'];
    $campaignJson['launchDate'] = $_REQUEST['launchDate']['year'] . "-" . $_REQUEST['launchDate']['month'] . "-" . $_REQUEST['launchDate']['day'];
    $campaignJson['endDate'] = $_REQUEST['endDate']['year'] . "-" . $_REQUEST['endDate']['month'] . "-" . $_REQUEST['endDate']['day'];
    $campaignJson['template'] = $_REQUEST['messagetype'];
    $campaignJson['creator'] = $USER->email;
    $campaignJson['state'] = "Created";

    $cont = 0;
    foreach($_REQUEST['users'] as $userid) {
        $user = $DB->get_record('user',array('id'=>$userid),'firstname,lastname,email');
        $userGroup["First Name"] = $user->firstname; 
        $userGroup["Last Name"] = $user->lastname; 
        $userGroup["Email"] = $user->email; 
        $campaignJson['group'][$cont] = $userGroup;
        
        $cont = $cont + 1;
    }


    $options = array(
        'http' => array(
          'method'  => 'POST',
          'content' => json_encode( $campaignJson ),
          'header'=>  "Content-Type: application/json\r\n" .
                      "Accept: application/json\r\n"
          )
      );
      
      $context  = stream_context_create( $options );
      $result = file_get_contents( "http://localhost:4000/campaign", false, $context );
      $response = json_decode( $result );
      $urltoreturn = $CFG->wwwroot.'/course/view.php?id='.$_REQUEST['courseId'];
      $id = $_GET['id'];
      redirect($urltoreturn, "Campaña creada con éxito, dirijase a MOOPHISH");
        
  
}

echo $OUTPUT->header();
echo("<H1>MOOPHISH</H1>");
$mform->display();

echo $OUTPUT->footer();
